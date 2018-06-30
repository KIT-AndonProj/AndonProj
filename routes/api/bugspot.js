const express = require('express');
const router = express.Router(); 
// const Git = require('nodegit')
// const scanner = require('@berries/acai');
const fs = require('fs-extra');

router.post('/analyze', (req, res) => { 
    // const result = '';      
    // Git.Clone('https://github.com/' + req.body.username +'/' + req.body.repository +'.git', __dirname + '/srccode')
    // .then( 
    //     (async () => {
    //         const result = await scanner( __dirname + '/srccode');
    //         fs.remove(__dirname + '/srccode', function(error) {
    //             if (error) { throw error; }
    //             console.log('Deleted');
    //         })
    //         return res.json(result);
    //     })
    // )
})

module.exports = router;