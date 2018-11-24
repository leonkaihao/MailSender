var express = require('express');
var router = express.Router();
var mails = require("../controllers/mails");

router.post('/', function(req, res, next) {
	mails.postMails(req.query.usrData, function(statusCode, result) {
		res.status(statusCode).json(result);
	});
});

router.get('/', function(req, res) {
	var token = req.query.token;
	sessions.verify(token, function (statusCode, result) {
		res.status(statusCode).end();
	});
});

module.exports = router;