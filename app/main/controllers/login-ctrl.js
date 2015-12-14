angular.module('main')
.controller('LoginCtrl', function ($scope, $state, localStorage, ionicMaterialInk, $ionicHistory) {
  ionicMaterialInk.displayEffect();
  $scope.responder = {
    name: localStorage.get('name', ''),
    phone: localStorage.get('phone', '')
  };
  $scope.updateReporter = function() {
    localStorage.set('name', $scope.responder.name);
    localStorage.set('phone', $scope.responder.phone);
    if ($state.current.name === 'main.login') {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('main.map');
    } else {
      $scope.$emit('closeLogin');
    }
  };
});
