const express = require('express');
const router = express.Router(); 
const { exec , execSync }  = require('child_process');

router.post('/welcome', (req, res) => { 
    exec('PYTHONPATH=".:build/lib.linux-armv7l-2.7" python examples/strandtest.py', (err,stdout,stderr) => { 
        console.log('Welcome');
        if (err) { return res.json(err) }
    });
})


module.exports = router;
// try {
            //     var result = execSync('cd routes/api/code && bugspots');
            //     return res.json(result.toString('utf8'))
            // } catch (error){
            //     return res.json('Not found commits matching search criteria')
            // }