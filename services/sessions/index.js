'use strict';

var uuid = require('uuid');

var sessions = exports = module.exports = {
    datalist: {},//using uuid as session key

    //create a session object for storing session data and quering
    create: function() {
        let token = uuid.v4();
        let self = this;
        this.datalist[token] = {content:{}};
        //automatically delete session object when expired (1h idle)
        this.datalist[token].timeout = setTimeout(function(obj, token) {
            delete obj[token];
        }, 1000*60*60,  self, token);
        return uuid.v4()
    },
    //get session content object and refresh timeout
    getContent: function(token) {
        let session = this.datalist[token]; 
        if (!session) {
            return null;
        }
        if (!session.timeout) {
            delete this.datalist[token];
            return null;
        }
        session.timeout.refresh();
        return session.content;
    }
};