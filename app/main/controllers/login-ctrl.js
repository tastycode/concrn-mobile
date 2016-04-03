angular.module('main')
.controller('LoginCtrl', function ($scope, $state, localStorage, ionicMaterialInk, $ionicHistory, ConcrnClient) {
  ionicMaterialInk.displayEffect();
  $scope.user = ConcrnClient.getUser();
  $scope.updateReporter = function() {
    localStorage.set('name', $scope.user.name);
    localStorage.set('phone', $scope.user.phone);
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
