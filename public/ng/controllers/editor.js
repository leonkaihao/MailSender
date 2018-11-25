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
		ApiService.post("/api/mails", obj, function(result) {
			let msg = $scope.mailData.from;
			if (result.data) {
				msg += ("" + String(result.data));
			}

			$scope.history.push(msg);
		}, function (err){
			let msg = $scope.mailData.from + " " + err.message;
			if (err.data) {
				msg += ("" + String(err.data));
			}
			$scope.history.push(msg);
		});
	};
}]);