/*
 * angular.js file
 */
'use strict';
// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngResource']);
myApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;// Don't strip trailing slashes from calculated URLs
}]);

myApp.run(['SessionsService', function (SessionsService) {
    SessionsService.createSession(function(data){
    }, function(err){
        alert(err.message);
    });
}]);