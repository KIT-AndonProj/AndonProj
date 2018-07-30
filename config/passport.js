const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            if(jwt_payload.id == undefined){
                User.findOne({ username: jwt_payload.username })
                    .then(user => {
                        if(user){
                            return done(null, user)
                        }
                        return done(null, false)
                    })
                    .catch(err => console.log(err))
            } else {
                User.findById(jwt_payload.idz)
                    .then(user => {
                        if(user){
                            return done(null, user)
                        }
                        return done(null, false)
                    })
                    .catch(err => console.log(err))
            }
        })
    )
}
