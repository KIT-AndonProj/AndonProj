const express = require('express');
const router = express.Router(); 
const { exec , execSync }  = require('child_process');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const npmCheck = require('npm-check');
const axios = require('axios')

router.get('/bugspot', passport.authenticate('jwt', {session: false}), (req, res) => { 
    exec('cd routes/api/code && bugspots', (err,stdout,stderr) => { 
        if (err) { 
            console.log(err)
            return res.json('Not found commits matching search criteria') 
        }

        var arr = stdout.split('\n') 
        var idxHotspot = arr.length-1;
        var sumScore = 0;
        var message = []
        var score = []
        var resultObj = { 'numBug': arr[3].slice(6, arr[3].length-35), message, score}
        for(var i = 0 ; i < arr.length-1; i++){
            if (i > idxHotspot + 1 && arr[i] !== ''){
                score.push({score: arr[i].slice(6,10), file: arr[i].slice(13,arr[i].length)})
                sumScore += parseFloat(arr[i].slice(6,10));
            } else if( i > 6 && i < idxHotspot && arr[i] !== 'Hotspots'  && arr[i] !== ''){
                message.push(arr[i].slice(7,arr[i].length))
            } else if (arr[i] == 'Hotspots'){
                idxHotspot = i
            }
        }
        overallHealth = sumScore / resultObj.score.length * 25
        resultObj.overallHealth = overallHealth
        return res.json(resultObj)
    })
});
        
router.get('/duplicate', passport.authenticate('jwt', {session: false}), (req, res) => { 
    fs.remove(__dirname + '/dup.json', (error) => {
        if (error) { throw error; }
        console.log('JsonClear');
        exec('jscpd -p routes/api/code -r json -o routes/api/dup.json', (err,stdout,stderr) => { 
            if (err) {
                console.log(err)
                return res.json('The jscpd found too many duplicates over threshold') 
            }
            var obj = require("../api/dup.json");
            obj.statistics.overallHealth = obj.statistics.percentage * 25
            return res.json(obj.statistics)
        });
    })
})

router.get('/complexity', passport.authenticate('jwt', {session: false}), (req, res) => { 
    var resultArr = [] 
      
    exec('code-complexity routes/api/code -c -s --sort commit -l 30', (err,stdout,stderr) => { 
        if (err) {
            console.log(err)
            return res.json(stderr) 
        }
        resultArr = stdout.split(/\n| /)
        var resObj = []
        for(var i = 1; i < resultArr.length-1; i+=4){
            if(resultArr[i+2] > 1){
                resObj.push({file: resultArr[i], comp:resultArr[i+1], numCommit:resultArr[i+2], sloc:resultArr[i+3]})
            }
        }

        function compare(a,b) {
            if (a.comp < b.comp) { return -1; }
            if (a.comp > b.comp) { return 1; }
            return 0;
        }
          
        resObj.sort(compare);
        var result = {'overallHealth': resObj.length / 30 * 25, resObj}
    
        console.log(result)
        return res.json(result)
    });
        
})

router.get('/outdated', passport.authenticate('jwt', {session: false}), (req, res) => {
    var options = {cwd: 'routes/api/code',debug:true}
    npmCheck(options).then(currentState => {
        resObj = currentState.get('packages')
        var result = {overallHealth: resObj.length, resObj}
        return res.json(result)
    }).catch(err =>{
        return res.json('A package.json was not found')
    });
})

module.exports = router;