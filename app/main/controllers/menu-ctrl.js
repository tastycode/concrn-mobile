angular.module('main')
.controller('MenuCtrl', function ($ionicModal, $scope, ConcrnClient) {

  var updateUser = function() {
    $scope.user = ConcrnClient.getUser();
  }
  updateUser();
  
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
    updateUser();
  });

  $scope.toggleResponderMode = function() {
     if($scope.user.isResponder) {
     	 if($scope.user.isOnDuty) {
     	   ConcrnClient.endResponderShift($scope.user.phone);
     	   $scope.user.isOnDuty = false;
     	 } else {
     	   ConcrnClient.startResponderShift($scope.user.phone);
     	   $scope.user.isOnDuty = true;
     	 }
     } else {
       //TODO display modal to open application form
       console.log("Not a respoder");
     }
  };

});
