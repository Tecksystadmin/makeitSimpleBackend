const config = require('../config/config');
const jwt = require('jsonwebtoken');
const CONSTANT = require('../config/constant');
const { AdminModel } = require('../models');
var auth = require('basic-auth');

const basicAuth = () => async (req, res, next) => {
    var user = auth(req);
    console.log('check data===',user)
	if (user && user.name == config.username && user.pass == config.password) next();
	else return res.send({ code: CONSTANT.UNAUTHORIZED, message: CONSTANT.NO_TOKEN });
};

module.exports = basicAuth;