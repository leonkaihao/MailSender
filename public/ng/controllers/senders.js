'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:SenderCtrl
 * @description
 * # SenderCtrl
 * Controller of myApp
 */
angular.module('myApp').controller(
'SendersCtrl',['$scope', '$rootScope', 'ApiService',
function ($scope, $rootScope, ApiService) {
    $scope.newSender = {
        name: '',
        apiKey: '',
        domain: ''
    };
    $scope.providers = ["SendGrid", "MailGun"];
    $scope.senders = [];
    $scope.Add = function () {
        $scope.senders.push({
            name: $scope.newSender.name, 
            apiKey: $scope.newSender.apiKey,
            domain: $scope.newSender.domain
        });
        $scope.UpdateSenders();
    };
    $scope.Delete = function(index) {
        $scope.senders.splice(index, 1);
        $scope.UpdateSenders();
    };
    $scope.UpdateSenders = function() {
        let obj = {
            params:{
                token: $rootScope.session.token
            },
            data: {
                senders: $scope.senders
            }
        }
        ApiService.post('/api/mails/senders', obj, function(data) {
        }, function(err) {
            alert(err.message);
        });
    }
}]);