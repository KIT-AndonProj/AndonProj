const express = require('express');
const router = express.Router(); 
const { exec } = require('child_process');
// const Git = require('nodegit')
// const scanner = require('@berries/acai');
// const fs = require('fs-extra');

router.post('/analyze', (req, res) => { 

    exec('git clone https://github.com/'+ req.body.username +'/'+ req.body.repository+'.git srccode', (err,stdout,stderr) => {
        if (err) { return res.json(err) }
        console.log('gitclone')
        exec('cd srccode' + req.body.repository ,(err1, stdout1, stderr1) => {
            if (err1) { return res.json(err1) }
            console.log(stderr1)
            exec('bugspots' ,(err2, stdout2, stderr2) => {
                if (err2) { return res.json(err2) }
                return res.json(stdout2) 
            });
        });
    });
})

module.exports = router;