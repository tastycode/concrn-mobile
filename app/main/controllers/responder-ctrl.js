angular.module('main')
.controller('ResponderCtrl', function ($scope, localStorage, responderState) {
  $scope.isResponder = localStorage.get('isResponder', false);
  $scope.$watch('isResponder', function() {
    responderState.setIsResponder($scope.isResponder);
  });
});
