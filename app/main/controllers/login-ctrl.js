angular.module('main')
.controller('LoginCtrl', function ($scope, $state, localStorage, ionicMaterialInk, $ionicHistory, UserService) {
  ionicMaterialInk.displayEffect();
  $scope.user = UserService.getUser();
  $scope.updateReporter = function() {
    UserService.updateUser($scope.user);
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
