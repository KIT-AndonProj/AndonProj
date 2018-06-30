const express = require('express');
const router = express.Router(); 
const { exec } = require('child_process');
const fs = require('fs-extra');

router.post('/analyze', (req, res) => { 
    fs.remove(__dirname + '/code', (error) => {
        if (error) { throw error; }
        console.log('Clear');
        exec('cd routes/api && git clone https://github.com/'+ req.body.username +'/'+ req.body.repository+'.git code', (err,stdout,stderr) => { 
            console.log('Clone')
            console.log(err)
            console.log(stdout)
            console.log(stderr)
            if (err) { return res.json(err) }
            exec('cd routes/api/code && bugspots' ,(err2, stdout2, stderr2) => {
                console.log('bug')
                if (err2) { return res.json(stdout2.slice(0,stdout2.length-1)) }
                return res.json(stdout2)
            });
        });
    })
})

module.exports = router;