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
        if(req.body.value >= 10)
            option = '-od ' + 10
    } else if (req.params.command == 'frequency') {
        option = '-fq ' + req.body.value
    }

    exec('sudo PYTHONPATH=".:build/lib.linux-armv7l-2.7" python pythonScript/script.py -c ' + option, (err,stdout,stderr) => { 
        if (err) { return res.json(stderr) }
        return res.json(req.params.command)
    });  
})


module.exports = router;
