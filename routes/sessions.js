var express = require('express');
var router = express.Router();
var sessions = require('../controllers/sessions.js');

//create a new session
router.post('/', function(req, res, next) {
	sessions.create(function(statusCode, result) {
		res.status(statusCode).json(result);
	});
});

//get or verify a session
router.get('/', function(req, res) {
	var token = req.query.token;
	sessions.verify(token, function (statusCode, result) {
		//do not return result(include user session data), status code is enough
		res.status(statusCode).end();
	});
});


//verify token in every req except creating session
router.verify = function () {
	return function (req, res, next) {
		if (req.path == '/api/sessions' && req.method == 'POST') {
			next();
		} else {
			sessions.verify(req.query.token, function (statusCode, result) {
				if (statusCode >= 400) {
					delete result.usrData;
					res.status(statusCode).json(result);
					return;
				} else {
					//save user session data in query
					req.query.usrData = result.usrData; 
					next();
				}
			});
		}
	};
};
module.exports = router;
