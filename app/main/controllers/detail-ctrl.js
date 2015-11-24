'use strict';
angular.module('main')
.controller('DetailCtrl', function ($scope, $state) {
  $scope.finishReport = function () {
    $state.go('main.map');
  };
});
