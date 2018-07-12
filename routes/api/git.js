const express = require('express');
const router = express.Router(); 
const User = require('../../models/User');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const fs = require('fs-extra');
const { exec , execSync }  = require('child_process');

router.post('/commits', passport.authenticate('jwt', {session: false}), (req, res) => {
    url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/commits' 
    var result = [];
   
    axios.get(url).then(response => { 
        if(response.data.length === 0){
            return res.json('There are no commits')
        }
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
    }).catch(err => {
        return res.json('Information not found')
    })
});

router.post('/pulls', passport.authenticate('jwt', {session: false}),(req, res) => {
    url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/pulls' 
    var result = [];
    axios.get(url).then( response => {
        if(response.data.length === 0){
            return res.json('There are no pull requests')
        }
        for( i in response.data){
            result.push(
                {   title: response.data[i].title, body: response.data[i].body,
                    owner: response.data[i].user.login, date: Date(response.data[i].updated_at).toString() 
                }
            );
        }
        return res.json(result)
    }).catch(err => {
        return res.json('Information not found')
    })
});

router.post('/branches', passport.authenticate('jwt', {session: false}), (req, res) => {
    url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/branches' 
    var result = [];
    var ops = [];
    axios.get(url).then( response => {
        for( i in response.data){
            result.push(
                {   name: response.data[i].name, sha: response.data[i].commit.sha, url: response.data[i].commit.url, commited_by: '', date: '',
                    lastcommit_url: 'https://github.com/' + req.body.username + '/' + req.body.repository + '/commit/' + response.data[i].commit.sha
                }
            );
        }
    }).then(
        (async () => {
            for (i in result) {
                let op = axios.get(result[i].url);
                ops.push(op);
            }
            let repores = await axios.all(ops);
            for(n in result){
                result[n].commited_by = repores[n].data.commit.author.name
                result[n].date = repores[n].data.commit.author.date
            }
            return res.json(result)
        })
    ).catch(err => {
        return res.json('Information not found')
    })
});


router.post('/clonerepo', passport.authenticate('jwt', {session: false}), (req, res) => {
    fs.remove(__dirname + '/code', (error) => {
        if (error) { throw error; }
        console.log('Clear');
        exec('cd routes/api && git clone https://github.com/'+ req.body.username +'/'+ req.body.repository+'.git code', (err,stdout,stderr) => { 
            if (err) { return res.json(err) }
            console.log('Clone Finish')
            return res.json('Finish')
        })
    })
})

router.post('/repoinfo', passport.authenticate('jwt', {session: false}), (req, res) => {
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
    }).catch(err => {
        console.log(req)
        return res.json('Information not found')
    })

    
});

router.post('/issues', passport.authenticate('jwt', {session: false}), (req, res) => {
    url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/issues'

    result = [];
    axios.get(url).then(response => {
        if(response.data.length === 0 ){
            return res.json('There are no issues')
        }
        for( i in response.data){
            result.push({title: response.data[i].title,
                owner: response.data[i].user.login, 
                date: Date(response.data[i].updated_at).toString(), 
                body: response.data[i].body  
            })
        }
        return res.json(result)
    }).catch(err => {
        return res.json('Information not found')
    })
});

router.post('/currrepo', passport.authenticate('jwt', {session: false}),(req, res) => {
    url = 'https://api.github.com/users/' + req.body.username + '/repos'

    axios.get(url).then(response => {
        var date = new Date(response.data[0].updated_at);
        var result = '';
        for( i in response.data){
            resDate = new Date(response.data[i].updated_at)
            if(resDate > date){
                date = resDate
                result = response.data[i].name
            }
        }
        return res.json(result)
    }).catch(err => {
        return res.json('Information not found')
    })
});


// router.post('/repolist', passport.authenticate('jwt', {session: false}), (req, res) => {
//     url = 'https://api.github.com/users/' + req.body.username + '/repos'

//     axios.get(url).then(response => {
//         return res.json(response.data)
//     }).catch(err => {
//         return res.json('Information not found')
//     })
// });

module.exports = router;
