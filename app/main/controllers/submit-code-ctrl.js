angular.module('main')
.controller('SubmitCodeModalCtrl', function ($ionicModal, $scope, UserService) {
  $scope.data = {};
  $scope.data.code = '';
  $scope.submitCode = function() {
    	UserService.submitVerificationCode(UserService.getUser(), $scope.data.code, function(response) {
    		if(response.verified == true) {
           $scope.$emit('closeSubmitCode');
           var user = UserService.getUser();
           user.isVerified = true;
           UserService.startResponderShift(user);
     	     user.isOnDuty = true;
           UserService.updateUser(user);
           alert('You are now in responder mode!');
    		} else {
           alert(response.reason);    		
    		}
    	});
  }

});
