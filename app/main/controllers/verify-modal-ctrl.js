angular.module('main')
.controller('VerifyModalCtrl', function ($ionicModal, $scope, UserService) {

  $ionicModal.fromTemplateUrl('main/templates/submit-code-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.submitCodeModal = modal;
  });
  
  $scope.$on('closeSubmitCode', function() {
    $scope.submitCodeModal.hide();
  });
  
  $scope.textVerificationCode = function() {
    	UserService.textVerificationCode(UserService.getUser(), function(response) {
    		if(response.status == 'sent') {
           $scope.$emit('closeVerify');
           $scope.submitCodeModal.show();
    		} else {
           alert(response.reason);    		
    		}
    	});
  }

});
