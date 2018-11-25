'use strict';
var mails = require("../services/mails");
var sessions = require("../services/sessions");

exports.getProviders = function(token, cb) {
    mails.getProviders(function(err, results) {
        let result = {source: "webui"};
        let statusCode = 200;
        if (err) {
            statusCode = 404;
            result.code = 'e0004',
            result.message = "Can not find providers";
        } else {
            result.data = results;
        }
        cb(statusCode, result);
    });
};

exports.updateSenders = function(token, senders, cb) {
    let obj = sessions.getContent(token);
    obj.senders = [];
    for (let sender of senders) {
        obj.senders.push({name: sender.name, apiKey: sender.apiKey, domain: sender.domain})
    }
    let result = {source: "webui"};
    let statusCode = 200;
    cb(statusCode, result);
};

exports.postMails = function(token, mailObj, cb) {
    mails.send(mailObj, function(err, results) {
        let result = {source: "webui"};
        let statusCode = 200;
        if (err) {
            statusCode = 400;
            result.code = 'e0001',
            result.message = err.message;
        }        
        result.data = results;
        cb(statusCode, result);
    });
};
