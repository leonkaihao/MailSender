'use strict';

/**
 * @ngdoc function
 * @name myApp.service:SessionsService
 * @description
 * # SessionsService
 * Service of the myApp
 */
angular.module('myApp').factory('SessionsService', ['$rootScope', 'MsgService', 'ApiService', function ($rootScope, MsgService, ApiService) {
    var cfgData = {};

    cfgData.createSession = function(successcb, failcb) {
        ApiService.post('/api/sessions', {}, function (data){
            if (!$rootScope.session) {                    
                $rootScope.session = {
                    token: ''
                };
            }
            $rootScope.session.token = data.token;
            successcb(data);
        }, failcb);
    };

    cfgData.verifyToken = function(token, successcb, failcb) {
        var obj = {
            params : {
                token: token
            }
        };
        ApiService.get('/api/sessions', obj, successcb, failcb);
    };

    return cfgData;
}]);