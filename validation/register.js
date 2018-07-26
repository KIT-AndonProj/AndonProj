const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateRgisterInput(data){
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username: '';
    data.password = !isEmpty(data.password) ? data.password: '';
    data.password2 = !isEmpty(data.password2) ? data.password2: '';
    data.gitName = !isEmpty(data.gitName) ? data.gitName: '';
   
    if(!Validator.isLength(data.username, { min: 6, max: 30 })){
        errors.username = 'Name must be between 6 and 30 characters';
    }

    if(Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if(Validator.isEmpty(data.gitName)) {
        errors.gitName= 'Git Username field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 characters';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password not match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};