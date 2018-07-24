const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const axios = require('axios')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const User = require('../../models/User')

//register new user
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
  
    if(!isValid) {
        return res.json(errors)
    }
    
    axios.get('https://api.github.com/users/' + req.body.gitName).then(resp => {
        User.findOne({ username: req.body.username.toLowerCase() }).then(user => {
            if(user) {
                errors.username = 'This username already exists'
                return res.json(errors)
            } else {
                User.findOne({ gitName: req.body.gitName.toLowerCase() }).then(git => {
                    if(git) {
                        errors.gitName = 'This github username already exists'
                        return res.json(errors)
                    } else {
                        const newUser = new User({
                            username: req.body.username.toLowerCase(),
                            password: req.body.password,
                            gitName: req.body.gitName.toLowerCase(),
                            imgURL: req.body.imgURL
                        })
            
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err,hash) => {
                                if(err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => res.json(user))
                                    .catch(err => console.log(err))
                            })
                        })
                    }
                })
            }} 
        )})
        .catch(erraxios => {
            errors.gitName = 'Github username not found'
            return res.json(errors)
        }
    )
})


//Login
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if(!isValid) {
        return res.json(errors)
    }

    const username = req.body.username.toLowerCase()
    const password = req.body.password

    User.findOne({ username })
        .then(user1 => {
            if(!user1) {
                errors.username = 'Username not found'
                return res.json(errors)
            } else {
                User.findOne({ username, status: true })
                .then(user => {
                    if(!user) {
                        errors.username = 'The service is unavailable'
                        return res.json(errors)
                    } else { 
                        bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if(isMatch) {
                                const payload = {id: user.id, username: user.username, gitName: user.gitName, imgURL: user.imgURL }
                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        payload,
                                        success: true,
                                        token: 'Bearer ' + token 
                                    })
                                })
                            } else {
                                errors.password = 'Password incorrect'
                                return res.json(errors)
                            }
                        })
                    }
                })
        }
    })
})

router.get('/openCam', (req, res) => {
    User.findOne({ status: true })
    .then(user => {
        if(user) {
            return res.json('The service is unavailable')
        } else {
            exec('python andonrec', (err,stdout,stderr) => { 
                if (err) { return res.json(stderr) }
                return res.json(stdout)
            });  
        }
    })
});

router.post('/updateDB', (req, res) => {
    const username = req.body.username
    User.findOneAndUpdate({ username }, {status: true}).then(user => {
        if(user)
            return res.json(user)
        else
            return res.json('Update database fail')
    })
})

router.post('/clearDB', (req, res) => {
    User.findOne({ username: 'adminandon' }).then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    User.update({ status: true }, { status: false })
                    .then(response => { return res.json('Database Reset') })
                    .catch(err => { return res.json(err) })
                } else {
                    return res.json('Password incorrect')
                }
            })
        }
    })
})

router.post('/logout', (req, res) => {
    const username = req.body.username.toLowerCase()
    User.findOneAndUpdate({ username }, { status: false })
        .then(user => {
            if(user){
                return res.json('Updated') 
            }
            return res.json('User not found') })
        .catch(err => { return res.json(err) })
})

module.exports = router
