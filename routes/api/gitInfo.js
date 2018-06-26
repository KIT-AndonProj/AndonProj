const express = require('express');
const router = express.Router(); 
const Request = require('request')
const User = require('../../models/User');

const options = {
    url: `https://api.github.com/`,
    headers: {
      'User-Agent': 'AndonProj'
    }
};

// router.get('/testA',(req, res) => {
//     options.url = options.url + 'repos/crsherbet/memonkeyproj/commits' 
//     const callback = (error, response, body) => {
//         if(error){ return res.json(error) }
//         const result = []
//         const bodyJson = JSON.parse(body)
//         var dateCheck = '';
//         for( i = bodyJson.length-1; i >= 0; i-- ){
//             if(dateCheck === '' || dateCheck !== bodyJson[i].commit.author.date.slice(0,10)){
//                 dateCheck = bodyJson[i].commit.author.date.slice(0,10)
//                 result.push({name: dateCheck, commit: 1})
//             } else { 
//                 dateCheck = bodyJson[i].commit.author.date.slice(0,10)
//                 result[result.length-1].commit += 1;
//             }
//         }
//         return res.json(result)
//     }
       
//     Request(options, callback);
// }) 

router.post('/commits', (req, res) => {
    options.url = options.url + 'repos/' + req.body.username + '/' + req.body.repository + '/commits' 
    var result = {};
    var bodyJson = {};
    const callback = (error, response, body) => {
        if(error){ return res.json(error) }
        bodyJson = JSON.parse(body)
        var dateCheck = '';
        for( i = bodyJson.length-1; i >= 0; i-- ){
            if(dateCheck === '' || dateCheck !== bodyJson[i].commit.author.date.slice(0,10)){
                dateCheck = bodyJson[i].commit.author.date.slice(0,10)
                result.push({name: dateCheck, commit: 1})
            } else { 
                dateCheck = bodyJson[i].commit.author.date.slice(0,10)
                result[result.length-1].commit += 1;
            }
        }
        return res.json(result)
    }
       
    Request(options, callback);
})
 
router.post('/repoinfo', (req, res) => {
    options.url = options.url + 'repos/' + req.body.username + '/' + req.body.repository
    var bodyJson = {};
    var result = {};
    const callback = (error, response, body) => {
        if(error){ return res.json(error) }
        bodyJson = JSON.parse(body);
        result = {
            username: bodyJson.owner.login,
            reponame: bodyJson.name,
            created_at: bodyJson.created_at,
            updated_at: bodyJson.updated_at,
            pushed_at: bodyJson.pushed_at,
            num_issue: bodyJson.open_issues,
            image_url: bodyJson.owner.avatar_url
        }
        return res.json(result)
    }
       
    Request(options, callback);
});

router.post('/info', (req, res) => {
    options.url = options.url + 'users/' + req.body.username
    const callback = (error, response, body) => {
        if(error){ return res.json(error) }
        return res.json(body)
    }
       
    Request(options, callback);
});

router.post('/repolist', (req, res) => {
    options.url = options.url + 'users/' + req.body.username + '/repos'
    const callback = (error, response, body) => {
        if(error){
            return res.json(error)
        }
        return res.json(body)
    }
   
    Request(options, callback);
});

module.exports = router;
