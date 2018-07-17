const express = require('express');
const router = express.Router(); 
const { exec , execSync }  = require('child_process');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');

router.post('/:command', (req, res) => { 

    // User.update({status: true}, {status: false}).then(
    //     User.findOneAndUpdate({user_id: req.body.user_id}, {status: true}).then(response =>{
    //         return res.json(response)
    //     })
    // ).catch(err => {return res.json(err)})
    var option = ''
    if(req.body.value < 1){
        req.body.value = 1;
    }
    if(req.params.command == 'welcome'){
        option = '-wel'
    } else if (req.params.command == 'overall') {
        option = '-ol ' + Math.ceil(req.body.value)
    } else if (req.params.command == 'bugspot') {
        option = '-bug ' + Math.ceil(req.body.value)
    } else if (req.params.command == 'duplication') {
        option = '-dup ' + Math.ceil(req.body.value)
    } else if (req.params.command == 'complexity') {
        option = '-comp ' + Math.ceil(req.body.value)
    } else if (req.params.command == 'outdated') {
        if(req.body.value >= 12){
            option = '-od ' + 25
        } else {
            option = '-od ' + (req.body.value * 2)
        }
    } else if (req.params.command == 'frequency') {
        var oneDay = 24*60*60*1000; 
        req.body.value = [
            {
                "name": "2018-07-01",
                "commit": 4
            },
            {
                "name": "2018-07-02",
                "commit": 4
            },
            {
                "name": "2018-07-03",
                "commit": 3
            },
            {
                "name": "2018-07-04",
                "commit": 1
            },
            {
                "name": "2018-07-07",
                "commit": 3
            },
            {
                "name": "2018-07-08",
                "commit": 2
            },
            {
                "name": "2018-07-09",
                "commit": 2
            },
            {
                "name": "2018-07-11",
                "commit": 1
            },
            {
                "name": "2018-07-12",
                "commit": 8
            },
            {
                "name": "2018-07-13",
                "commit": 1
            },
            {
                "name": "2018-07-17",
                "commit": 1
            }
        ]
        var firstDate = new Date(req.body.value[0].name);
        var secondDate = new Date(req.body.value[req.body.value.length-1].name);
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        var numCommit = 0;
        for(i in req.body.value){
            numCommit += req.body.value[i].commit
        }
       
        var avgCommit =  Math.ceil(10000/(numCommit/diffDays*120))
        option = '-fq ' + avgCommit;
    
    }
    console.log(option)
    exec('sudo PYTHONPATH=".:build/lib.linux-armv7l-2.7" python pythonScript/script.py -c ' + option, (err,stdout,stderr) => { 
        if (err) { return res.json(stderr) }
        return res.json(req.params.command)
    });  
})


module.exports = router;
