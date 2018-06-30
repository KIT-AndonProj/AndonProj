const express = require('express');
const router = express.Router(); 
const { exec , execSync }  = require('child_process');
const fs = require('fs-extra');

router.post('/analyze', (req, res) => { 
    fs.remove(__dirname + '/code', (error) => {
        if (error) { throw error; }
        console.log('Clear');
        exec('cd routes/api && git clone https://github.com/'+ req.body.username +'/'+ req.body.repository+'.git code', (err,stdout,stderr) => { 
            console.log('Clone')
            if (err) { return res.json(err) }
            try {
                var result = execSync('cd routes/api/code && bugspots');
                return res.json(result.toString('utf8'))
            } catch (error){
                return res.json('Not found commits matching search criteria')
            }
        });
        
    })
})

module.exports = router;