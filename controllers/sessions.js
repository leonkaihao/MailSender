
'use strict';
var sessions = require('../services/sessions');
//create session token
exports.create = function (cb) {
    let token = sessions.create();
    let result = {source: "webui"};
    
    var statusCode = 200;
    result.token = token;
    cb(statusCode, result);
};

//get and verify session token
exports.verify = function(token, cb) {
    let data = sessions.getContent(token);
    let result = {source: "webui"};
    let statusCode = 200;
    if (!data)
    {
        statusCode = 404;
        result.code = 'e0004',
        result.message = "Invalid session";
    }
    result.usrData = data; //return back user session data
    cb(statusCode, result);
};
