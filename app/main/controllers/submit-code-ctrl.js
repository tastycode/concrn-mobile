angular.module('main')
.controller('SubmitCodeModalCtrl', function ($ionicModal, $scope, UserService) {
  $scope.code = ''
  $scope.submitCode = function() {
    	UserService.submitVerificationCode(UserService.getUser(), $scope.code, function(response) {
    		if(response.status == 'sent') {
           $scope.$emit('closeSubmitCode');
    		} else {
           alert(response.reason);    		
    		}
    	});
  }

});
