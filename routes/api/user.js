const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const axios = require('axios')
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');


//register new user
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if(!isValid){
        return res.json(errors);
    }
    
    axios.get('https://api.github.com/users/' + req.body.gitName ).then(resp => {
       
        User.findOne
        ({ username: req.body.username }).then(user => {
            if(user){
                errors.username = 'This username already exists';
                return res.json(errors);
            } else {
                User.findOne({ gitName: req.body.gitName }).then(git => {
                    if(git){
                        errors.gitName = 'This github username already exists';
                        return res.json(errors);
                    } else {
                        const newUser = new User({
                            username: req.body.username,
                            password: req.body.password,
                            gitName: req.body.gitName,
                            imgURL: req.body.imgURL
                        });
            
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
        )}
        ).catch(erraxios => {
            errors.gitName = 'Github username not found';
            return res.json(errors)
        }
    );
});


//Login
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username })
        .then(user1 => {
            if(!user1) {
                errors.username = 'Username not found'
                return res.json(errors);
            } else {
                User.findOne({ username , status: true })
                .then(user => {
                    if(!user) {
                        errors.username = 'The service is unavailable'
                        return res.json(errors);
                    } else { 
                        bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if(isMatch){
                                const payload = {id: user.id, username: user.username, gitName: user.gitName, imgURL: user.imgURL }
                                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        payload,
                                        success: true,
                                        token: 'Bearer ' + token 
                                    });
                                });
                            } else {
                                errors.password = 'Password incorrect'
                                return res.json(errors);
                            }
                        })
                    }
                })
        }

    });
});

//Check current user
// router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
//     console.log(req.body)
//     return res.json({
//         id: req.user.id,
//         username: req.user.username,
//         gitName: req.user.gitName,
//         data2: req.body
//     });
// });

// router.get('/test', (req, res) => {
//     config = { method: 'GET',
//     url: 'localhost:5000/api/users/current',
//     headers: {
//       Authorization : req.body.Authorization
//     }
// }
//     axios(config).then(resp => {
//         console.log('gi')
//         return res.json(resp.data)
//     }).catch(err => {
//         console.log(err)
//         return res.json(err)
//     })
// })


module.exports = router;
