const express = require('express');
const router = express.Router(); 
const { exec , execSync }  = require('child_process');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const CurrUser = require('../../models/CurrUser');

router.post('/welcome', (req, res) => { 
    CurrUser.update({status: true}, {status: false}).then(
        CurrUser.findOneAndUpdate({user_id: req.body.user_id}, {status: true}).then(response =>{
            return res.json(response)
        })
    ).catch(err => {return res.json(err)})
            
    exec('sudo PYTHONPATH=".:build/lib.linux-armv7l-2.7" python pythonScript/welcomeBlink.py -c', (err,stdout,stderr) => { 
        console.log('Welcome');
        if (err) { return res.json(stderr) }
    });

    
})


module.exports = router;
