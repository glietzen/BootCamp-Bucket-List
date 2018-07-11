const Validator = require('validator');
const isEmpty = require('./is-empty');
const emailValidate = require('email-validator');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';




    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!emailValidate.validate(data.email)) {
        errors.email = 'Email format is not valid'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}