'use strict';

const base64 = require('base-64');
const Users = require('../models/user-model');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return next('Invalid Login');
    }
    let encoded = req.header.authorization.split(' ').pop();
    let [userName, password] = base64.decode(encoded).split(':');

    try {
        req.user = await Users.authenticateBasic(userName, password)
        next();
    } catch (error) {
        next('Invalid Lgin')
    }
}