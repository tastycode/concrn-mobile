angular.module('main')
.controller('MenuCtrl', function ($ionicModal, $scope, UserService) {
  
  $scope.getToggleState = function() {
    return UserService.getUser().isOnDuty;
  };

  $ionicModal.fromTemplateUrl('main/templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  $ionicModal.fromTemplateUrl('main/templates/verify-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.verifyModal = modal;
  });

  $scope.openLogin = function() {
    $scope.loginModal.show();
  };

  $scope.$on('closeLogin', function() {
    $scope.loginModal.hide();
  });
  
  $scope.$on('closeVerify', function() {
    $scope.verifyModal.hide();
  });

  $scope.toggleResponderMode = function() {
  	  var user = UserService.getUser();
     if(user.isResponder) {
     	 if(user.isVerified) {
     	   if(user.isOnDuty) {
     	     UserService.endResponderShift(user);
     	     user.isOnDuty = false;
     	   } else {
     	     UserService.startResponderShift(user);
     	     user.isOnDuty = true;
     	   }
     	   UserService.updateUser(user);
       } else {
         $scope.verifyModal.show();
       }
     } else {
       window.open('https://docs.google.com/a/minerva.kgi.edu/forms/d/1aIkySaLiWBZ3-blVcNPP56l33fcq0_NAJaoCznGuFis/viewform', '_system', 'location=yes');
     }
  };

});
