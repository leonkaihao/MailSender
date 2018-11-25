var express = require('express');
var router = express.Router();
var mails = require("../controllers/mails");
//post an email
router.post('/', function(req, res, next) {
	mails.postMails(req.query.token, req.body.data.mail, function(statusCode, result) {
		res.status(statusCode).json(result);
	});
});

router.get('/providers', function(req, res) {
	mails.getProviders(req.query.token, function(statusCode, result) {
		res.status(statusCode).json(result);
	});
});

//create or update senders
router.post('/senders', function(req, res) {
	mails.updateSenders(req.query.token, req.body.data.senders, function(statusCode, result) {
		res.status(statusCode).json(result);
	});
});

module.exports = router;
