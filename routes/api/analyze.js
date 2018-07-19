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
            return res.json({message:'Not found commits matching search criteria', overallHealth: 0 }) 
        }

        var arr = stdout.split('\n') 
        var idxHotspot = arr.length-1;
        var sumScore = 0;
        var message = []
        var score = []
        var resultObj = { 'numBug': arr[3].slice(6, arr[3].length-35), message, score}
        for(var i = 0 ; i < arr.length-1; i++){
            if (i > idxHotspot + 1 && arr[i] !== ''){
                score.push({score: parseFloat(arr[i].slice(6,10)).toFixed(2), file: arr[i].slice(13,arr[i].length), percentage: (parseFloat(arr[i].slice(6,10)) * 100).toFixed(2)})
                sumScore += parseFloat(arr[i].slice(6,10));
            } else if( i > 6 && i < idxHotspot && arr[i] !== 'Hotspots'  && arr[i] !== ''){
                message.push(arr[i].slice(7,arr[i].length))
            } else if (arr[i] == 'Hotspots'){
                idxHotspot = i
            }
        }
        overallHealth = Math.ceil(sumScore / resultObj.score.length * 10)
        if(overallHealth > 25){
            overallHealth = 25;
        }

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
                return res.json({message:'The jscpd found too many duplicates over threshold', overallHealth: 25.00}) 
            }
            const obj = fs.readJsonSync(__dirname + '/dup.json');
            obj.statistics.overallHealth = Math.ceil(obj.statistics.percentage / 4)
            console.log(obj.statistics)
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
      
        resultArr = stdout.split(/\n| /);
        for( i in resultArr){
            resultArr[i] = resultArr[i].slice(5,resultArr[i].length-5)
        }
        var resObj = []
       
        for(var i = 1; i < resultArr.length-1; i+=4){
            if(parseInt(resultArr[i+2]) > 1){
                resObj.push({file: resultArr[i], comp: parseFloat(resultArr[i+1]).toFixed(2), numCommit:resultArr[i+2], sloc:resultArr[i+3]})
            }
        }
        
        var result = {'overallHealth': Math.ceil(resObj.length / 30 * 25), resObj}
    
        console.log(result)
        return res.json(result)   
    });
        
})

router.get('/outdated', passport.authenticate('jwt', {session: false}), (req, res) => {
    fs.pathExists(__dirname + '/code/package.json', (err, exists) => {
        if(exists){
            npmCheck({cwd: __dirname + '/code'}).then(currentState => {
                resObj = currentState.get('packages')
                resultObj = []
                for(var i = 0; i< resObj.length; i++ ){
                    if(resObj[i].latest !== resObj[i].installed)
                        resultObj.push({moduleName: resObj[i].moduleName, homepage: resObj[i].homepage, latest: resObj[i].latest, installed: resObj[i].installed})
                }
                var result = {overallHealth: resultObj.length * 2, resultObj}
                return res.json(result)
            }).catch(err =>{
                return res.json({message:'A package.json was not found', overallHealth: 0})
            });
        } 
        else {
            return res.json({message:'A package.json was not found', overallHealth: 0})
        }
    })
    
})

module.exports = router;