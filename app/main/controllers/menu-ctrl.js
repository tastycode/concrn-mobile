'use strict';
angular.module('main')
.controller('MenuCtrl', function ($ionicModal, $scope) {
  $ionicModal.fromTemplateUrl('/main/templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.openLogin = function() {
    $scope.modal.show()
  }

  $scope.$on('closeLogin', function() {
    $scope.modal.hide();
  });

});
