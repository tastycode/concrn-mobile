angular.module('main')
.controller('LoginCtrl', function ($scope, $state, localStorage, ionicMaterialInk) {
  ionicMaterialInk.displayEffect();
  $scope.responder = {
    name: localStorage.get('name', ''),
    phone: localStorage.get('phone', '')
  };
  $scope.updateReporter = function() {
    localStorage.set('name', $scope.responder.name);
    localStorage.set('phone', $scope.responder.phone);
    $scope.$emit('closeLogin');
  };
});
