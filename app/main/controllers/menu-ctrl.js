angular.module('main')
.controller('MenuCtrl', function ($ionicModal, $scope, UserService) {
  
  $scope.getToggleState = function() {
    return UserService.getUser().isOnDuty;
  }

  $ionicModal.fromTemplateUrl('main/templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openLogin = function() {
    $scope.modal.show();
  };

  $scope.$on('closeLogin', function() {
    $scope.modal.hide();
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
         //TODO 
       }
     } else {
       //TODO display modal to open application form
       console.log("Not a respoder");
     }
  };

});
