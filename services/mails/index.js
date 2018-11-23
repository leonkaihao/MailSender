'use strict';
// var config = require('../config').load('mails.json', function(err) {
//     if (err) {
//         console.error(err);
//         process.exit(1);
//     }
// }).data;
const sgMail = require('@sendgrid/mail');
const mailgun = require("mailgun-js");
const async = require('async');

var mails = exports = module.exports = {
    //send message through diffrent provider
    //invoke chain to each provider, succeed then jump
    send: function(obj, cb) {
        async.series([
            function(callback) {
                sendSG(obj, function(err, info){
                    if (!err) {
                        //no error then jump out
                        callback({message: "pass"}, "sendgrid");
                    } else {
                        //error then next
                        callback(null, "sendgrid");
                    }
                })
            },            
            function(callback) {
                sendMG(obj, function(err, info){
                    if (!err) {
                        //no error then jump out
                        callback({message: "pass"}, "mailgun");
                    } else {
                        //error then next
                        callback(null, "mailgun");
                    }
                })
            },
        ], function(err, results) {
            if (!err) {//actually, err == null means send failed in every step
                cb({message: "send failed"}, results);
            } else {//succeed in a step
                cb(null, results);
            }
        });
    },
    sendSG: function(obj, cb) {
        if (!obj.apiKey) {
            cb({message: "no apiKey found"}, null);
            return;
        }
        sgMail.setApiKey(obj.apiKey);
        let msg = {
            to: obj.to,
            from: obj.from,
            cc: obj.cc,
            bcc: obj.bcc,
            subject: obj.subject,
            text: obj.text,
            html: obj.html
        };
        sgMail
        .send(msg)
        .then(() => {
            cb(null, "pass");
        })
        .catch(error => {
            cb(error, null);
        });
    },
    sendMG: function(obj, cb) {        
        if (!obj.apiKey) {
            cb({message: "no apiKey found"});
            return;
        }       
        if (!obj.domain) {
            cb({message: "no domain found"});
            return;
        }
        let mg = mailgun({apiKey: obj.apiKey, domain: obj.domain});
        let data = {
            from: obj.from,
            to: obj.to,
            cc: obj.cc,
            bcc: obj.bcc,
            subject: obj.subject,
            text: obj.text,
            html: obj.html
        };
        mailgun.messages().send(data, function (error, body) {
            if (error) {
                cb({message: error}, null);
            } else {
                cb(null, "pass")
            }            
        });
    }
};