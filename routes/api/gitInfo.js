const express = require('express');
const router = express.Router(); 
const Request = require('request')
const User = require('../../models/User');

const options = {
    url: `https://api.github.com/users/`,
    headers: {
      'User-Agent': 'AndonProj'
    }
};

router.post('/info', (req, res) => {
    options.url = options.url + req.body.username
    const callback = (error, response, body) => {
        if(error){
            return res.json(error)
        }
        return res.json(body)
    }
       
    Request(options, callback);
});

router.post('/repolist', (req, res) => {
    options.url = options.url + req.body.username + '/repos'
    const callback = (error, response, body) => {
        if(error){
            return res.json(error)
        }
        return res.json(body)
    }
   
    Request(options, callback);
});

module.exports = router;
