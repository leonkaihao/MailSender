'use strict';
var mails = require("../services/mails");
exports.postMails = function(mailObj, cb) {
    mails.send(mailObj, function(err, results) {
        let result = {source: "webui"};
        let statusCode = 200;
        if (err) {
            statusCode = 400;
            result.message = err.message;
            result.details = results;
        }        
        cb(statusCode, result);
    });
};