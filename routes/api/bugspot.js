const express = require('express');
const router = express.Router(); 
const { exec , execSync }  = require('child_process');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.post('/analyze',passport.authenticate('jwt', {session: false}), (req, res) => { 
    fs.remove(__dirname + '/code', (error) => {
        if (error) { throw error; }
        console.log('Clear');
        exec('cd routes/api && git clone https://github.com/'+ req.body.username +'/'+ req.body.repository+'.git code', (err,stdout,stderr) => { 
            console.log('Clone')
            if (err) { return res.json(err) }
            try {
                var result = execSync('cd routes/api/code && bugspots');
                var arr = result.toString('utf8').split('\n') 
                var idxHotspot = arr.length-1;
                var message = []
                var score = []
                var resultObj = { 'numBug': arr[3].slice(6, arr[3].length-35), message, score}
                for(var i = 0 ; i < arr.length-1; i++){
                    if (i > idxHotspot + 1 && arr[i] !== ''){
                        score.push({score: arr[i].slice(6,10), file: arr[i].slice(13,arr[i].length)})
                    } else if( i > 6 && i < idxHotspot && arr[i] !== 'Hotspots'  && arr[i] !== ''){
                        message.push(arr[i].slice(7,arr[i].length))
                    } else if (arr[i] == 'Hotspots'){
                        idxHotspot = i
                    }
                }
                return res.json(resultObj)
            } catch (error){
                console.log(error)
                return res.json('Not found commits matching search criteria')
            }
        });
        
    })
})

module.exports = router;