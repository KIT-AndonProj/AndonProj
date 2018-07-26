const express = require('express');
const router = express.Router(); 
const { exec , execSync }  = require('child_process');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');

router.post('/:command', passport.authenticate('jwt', {session: false}), (req, res) => {

    var light = 'sudo PYTHONPATH=".:build/lib.linux-armv7l-2.7" python pythonScript/script.py -c '
    var option = ''
    var monitor = ''
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
        var firstDate = new Date(req.body.value[0].name);
        var secondDate = new Date(req.body.value[req.body.value.length-1].name);
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        var numCommit = 0;
        for(i in req.body.value){
            numCommit += req.body.value[i].commit
        }
       
        var avgCommit =  Math.ceil(380/(numCommit/diffDays))
        option = '-fq ' + avgCommit;
    
    }

    exec(light + option + ' ' + monitor, (err,stdout,stderr) => { 
        if (err) { return res.json(stderr) }
        return res.json('Finish')
    });  
})


module.exports = router;