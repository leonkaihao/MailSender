'use strict';

/**
 * @ngdoc function
 * @name myApp.service:ApiService
 * @description
 * # ApiService
 * Service of the myApp
 */
angular.module('myApp').factory('ApiService', ['$http', 'MsgService', function ($http, MsgService) {
    let cfgData = {}; //its a collection of CRUD operations

    //make a single arg to string, arg could be of type object or string, 
    //other types are not suitable so return empty strings.
    let makeArg = function (arg) {
        let paramStr = '';
        switch (typeof arg) {
        case 'object':
            let i = 0;
            for (let elem in arg) {
                if (i !== 0) {
                    paramStr += '&';//first item has no '&' ahead.
                }
                paramStr += (elem + '=' + arg[elem]);
                ++i;
            }
            return paramStr;
        case 'undefined':
        case 'function':
            return '';
        case 'string':
            return arg;
        default:
            return ''; 
        }
    };

    //make a complete url
    //urlStr is the path, followed with ambitious number of objects, strings or numbers
    //sample: http://domain/path?arg1=num1&arg2=num2
    let makeUrl = function (urlStr, ...args) {
        let argLen = args.length;
        if (argLen == 0) {
            return urlStr;
        }
        urlStr = urlStr + '?' + makeArg(args[0]);
        for (let i = 1; i < argLen; ++i) {
            urlStr = urlStr + '&' + makeArg(args[1]);
        }
        return urlStr;
    };

    cfgData.get = function(url, obj, successcb, failcb) {
        if (obj.params) {
            url = makeUrl(url, obj.params);
            delete obj.params;
        }
        obj.timeout = (1000*30);
        return $http.get(url)
        .then(function (resp) {
            successcb(resp.data);
        }, function (resp) {
            failcb(resp.data);
        });
    };
    cfgData.post = function(url, obj, successcb, failcb) {
        if (obj.params) {
            url = makeUrl(url, obj.params);
            delete obj.params;
        }
        obj.timeout = (1000*30);
        return $http.post(url, obj)
        .then(function (resp) {
            successcb(resp.data);
        }, function (resp) {
            failcb(resp.data);
        });
    };
    return cfgData;
}]);