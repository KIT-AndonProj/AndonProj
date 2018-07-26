const express = require('express')
const router = express.Router()
const axios = require('axios')
const passport = require('passport')
const fs = require('fs-extra')
const { exec } = require('child_process')

router.post('/commits', passport.authenticate('jwt', {session: false}), (req, res) => {
    var url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/commits'
    var result = []
   
    axios.get(url).then(response => {
        if (response.data.length === 0) {
            return res.json('There are no commits')
        }
        result.total = 0
        var dateCheck = ''
        for (var i = response.data.length - 1; i >= 0; i--) {
            if (dateCheck === '' || dateCheck !== response.data[i].commit.author.date.slice(0,10)){
                dateCheck = response.data[i].commit.author.date.slice(0, 10)
                result.push({name: dateCheck, commit: 1})
            } else { 
                dateCheck = response.data[i].commit.author.date.slice(0, 10)
                result[result.length - 1].commit += 1
            }
            result.total += 1
        }
        return res.json(result)
    }).catch(err => {
        if(err.response.data.message.slice(0,23) === 'API rate limit exceeded')
            return res.json('Github API rate limit exceeded')
        return res.json('Information not found')
    })
})

router.post('/pulls', passport.authenticate('jwt', {session: false}), (req, res) => {
    var url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/pulls'
    var result = []
    axios.get(url).then( response => {
        if(response.data.length === 0){
            return res.json('There are no pull requests')
        }
        for( i in response.data){
            result.push(
                {   title: response.data[i].title, body: response.data[i].body,
                    owner: response.data[i].user.login, date: Date(response.data[i].updated_at).toString().replace('T', ' at ').replace('Z', ''), 
                }
            )
        }
        return res.json(result)
    }).catch(err => {
        if(err.response.data.message.slice(0,23) === 'API rate limit exceeded')
            return res.json('Github API rate limit exceeded')
        return res.json('Information not found')
    })
})

router.post('/branches', passport.authenticate('jwt', {session: false}), (req, res) => {
    var url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/branches'
    var result = []
    var ops = []
    axios.get(url).then(response => {
        for(var i in response.data) {
            result.push(
                {name: response.data[i].name,
                 sha: response.data[i].commit.sha,
                 url: response.data[i].commit.url,
                 commited_by: '',
                 date: '',
                 lastcommit_url: 'https://github.com/' + req.body.username + '/' + req.body.repository + '/commit/' + response.data[i].commit.sha
                }
            )
        }
    }).then(
        (async () => {
            for (var i in result) {
                let op = axios.get(result[i].url)
                ops.push(op)
            }
            let repores = await axios.all(ops)
            for(var n in result) {
                result[n].commited_by = repores[n].data.commit.author.name
                result[n].date = repores[n].data.commit.author.date
            }
            return res.json(result)
        })
    ).catch(err => {
        if(err.response.data.message.slice(0,23) === 'API rate limit exceeded')
            return res.json('Github API rate limit exceeded')
        return res.json('Information not found')
    })
})


router.post('/clonerepo', passport.authenticate('jwt', {session: false}), (req, res) => {
    fs.remove(__dirname + '/code', (error) => {
        if (error) { throw error }
        console.log('Clear')
        var url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository
        axios.get(url).then(response => { 
            exec('cd routes/api && git clone https://github.com/' + req.body.username + '/' + req.body.repository + '.git code', (err, stdout, stderr) => {
            if (err) { return res.json(err) }
            console.log('Clone Finish')
            return res.json('Finish')
        })
        }).catch(err => {
            if(err.response.data.message.slice(0,23) === 'API rate limit exceeded')
                return res.json('Github API rate limit exceeded')
            return res.json('Information not found')
        })  
    })
})

router.post('/repoinfo', passport.authenticate('jwt', {session: false}), (req, res) => {
    var url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository
    axios.get(url).then(response => { 
        var result = {
            username: response.data.owner.login,
            reponame: response.data.name,
            created_at: response.data.created_at.replace('T', ' at ').replace('Z', ''),
            updated_at: response.data.updated_at.replace('T', ' at ').replace('Z', ''),
            pushed_at: response.data.pushed_at.replace('T', ' at ').replace('Z', ''),
            num_issue: response.data.open_issues,
            image_url: response.data.owner.avatar_url
        }
        return res.json(result)
    }).catch(err => {
        if(err.response.data.message.slice(0,23) === 'API rate limit exceeded')
            return res.json('Github API rate limit exceeded')
        return res.json('Information not found')
    })    
})

router.post('/issues', passport.authenticate('jwt', {session: false}), (req, res) => {
    url = 'https://api.github.com/repos/' + req.body.username + '/' + req.body.repository + '/issues'

    result = []
    axios.get(url).then(response => {
        if(response.data.length === 0){
            return res.json('There are no issues')
        }
        for(var i in response.data) {
            result.push({title: response.data[i].title,
                owner: response.data[i].user.login, 
                date: Date(response.data[i].updated_at).toString().replace('T', ' at ').replace('Z', ''), 
                body: response.data[i].body  
            })
        }
        return res.json(result)
    }).catch(err => {
        if(err.response.data.message.slice(0,23) === 'API rate limit exceeded')
            return res.json('Github API rate limit exceeded')
        return res.json('Information not found')
    })
})

router.post('/currrepo', passport.authenticate('jwt', {session: false}), (req, res) => {
    var url = 'https://api.github.com/users/' + req.body.username + '/repos'

    axios.get(url).then(response => {
        var date = new Date(response.data[0].updated_at)
        var result = ''
        for (var i in response.data) {
            var resDate = new Date(response.data[i].updated_at)
            if(resDate > date) {
                date = resDate
                result = response.data[i].name
            }
        }
        return res.json(result)
    }).catch(err => {
        if(err.response.data.message.slice(0,23) === 'API rate limit exceeded')
            return res.json('Github API rate limit exceeded')
        return res.json('Information not found')
    })
})

module.exports = router
