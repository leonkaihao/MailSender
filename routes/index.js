var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mail Sender' });
});

// router.get('/:spec', function(req, res) {
// 	res.render('index', { title: 'Mail Sender' });
// });

//for angular partial page service
router.get('/partial/:spec', function(req, res) {
	res.render(req.params.spec, { title: 'Mail Sender' });
});

module.exports = router;
