const express = require('express');
const router = express.Router(); 
const Request = require('request')
const User = require('../../models/User');
const axios = require('axios');

router.post('/commits', (req, res) => {
    url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/commits' 
    var result = [];
   
    axios.get(url).then(response => { 
        var dateCheck = '';
        for( i = response.data.length-1; i >= 0; i-- ){
            if(dateCheck === '' || dateCheck !== response.data[i].commit.author.date.slice(0,10)){
                dateCheck = response.data[i].commit.author.date.slice(0,10)
                result.push({name: dateCheck, commit: 1})
            } else { 
                dateCheck = response.data[i].commit.author.date.slice(0,10)
                result[result.length-1].commit += 1;
            }
        }
        return res.json(result)
    }).catch(err => console.log(err))
})

router.post('/branches', (req, res) => {
    url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/branches' 
    var result = [];

    axios.get(url).then( response => {
        for( i in response.data){
            result.push(
                {   name: response.data[i].name, sha: response.data[i].commit.sha,
                    lastcommit_url: 'https://github.com/' + req.body.username + '/' + req.body.repository + '/commit/' + response.data[i].commit.sha
                }
            );
        } return res.json(result)
    }).catch(err => console.log(err))
})

router.post('/repoinfo', (req, res) => {
    url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository  
   
    axios.get(url).then(response => { 
        result = {
            username: response.data.owner.login,
            reponame: response.data.name,
            created_at: response.data.created_at,
            updated_at: response.data.updated_at,
            pushed_at: response.data.pushed_at,
            num_issue: response.data.open_issues,
            image_url: response.data.owner.avatar_url
        }
        return res.json(result)
    }).catch(err => console.log(err))
});

router.post('/info', (req, res) => {
    url = 'https://api.github.com/users/' + req.body.username

    axios.get(url).then(response => { 
        return res.json(response.data)
    }).catch(err => console.log(err))
});

router.post('/repolist', (req, res) => {
    url = 'https://api.github.com/users/' + req.body.username + '/repos'

    axios.get(url).then(response => {
        return res.json(response.data)
    }).catch(err => console.log(err))
});

module.exports = router;
