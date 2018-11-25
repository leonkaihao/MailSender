'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:EditorCtrl
 * @description
 * # EditorCtrl
 * Controller of myApp
 */
angular.module('myApp').controller(
'EditorCtrl', ['$scope', '$rootScope', 'ApiService',
function ($scope, $rootScope, ApiService) {
	$scope.mailData = {
		from: "",
		to: "",
		cc: "",
		bcc: "",
		subject: "",
		text: ""
	};
	$scope.history = [];
	$scope.Send = function() {
		let obj = {
			params: {
				token: $rootScope.session.token
			},
			data: {
				mail: $scope.mailData
			}
		}
		ApiService.post("/api/mails", obj, function(data) {
			$scope.history.push($scope.mailData.from + " " + String(data.info));
		}, function (err){
			alert(err);
			$scope.history.push($scope.mailData.from + " " + err.message + " " + String(err.info));
		});
	};
}]);