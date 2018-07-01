const express = require('express');
const router = express.Router(); 
const { exec , execSync }  = require('child_process');

router.post('/welcome', (req, res) => { 
    exec('sudo PYTHONPATH=".:build/lib.linux-armv7l-2.7" python pythonScript/rpi_ws281x/python/examples/strandtest.py -c', (err,stdout,stderr) => { 
        console.log('Welcome');
        
        if (err) { return res.json(err) }
    });
})


module.exports = router;
