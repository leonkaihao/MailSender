'use strict';

/**
 * @ngdoc function
 * @name myApp.service:MsgService
 * @description This module is used for reporting return msg that includes error, 
 *              warning or log info to the debug window.
 * # MsgService
 * Service of the myApp
 */
angular.module('myApp').factory('MsgService', function () {
    var serviceData = {
        lang: 'en-us',
        msgTab: {
            //web server error
            "e0001": {"name": "CreateFail",    "en-us": "Failed to create" },
            "e0002": {"name": "UpdateFail",    "en-us": "Failed to update" },
            "e0003": {"name": "DeleteFail",    "en-us": "Failed to delete" },
            "e0004": {"name": "NotFound",      "en-us": "Failed to get" },
    
            //Unknown Error
            "e99999": {"name": "UnKnown", "en-us": "Unknown error, please see errinfo in debug window."}
        }
    };
    
    serviceData.setLang = function (lan) {
        this.lang = lan;
    };

    serviceData.getMsg = function (code) {
        let self = this;
        let msgItem = self.msgTab[code];
        if (!msgItem) {
            msgItem = self.msgTab['e99999'];
        }
        let msg = {
            code: code,
            name: msgItem.name,
            message: msgItem[self.lang]
        };
        msg.alert = function () {
            alert (msg.message);
        };
        msg.debug = function() {
            switch (msg.code[0]) {
            case 'e':
                console.error(this.message);
                break;
            case 'w':
                console.warning(this.message);
                break;
            default:
                console.log(this.message);
                break;
            }
        };
        return msg;
	};

    return serviceData;
});