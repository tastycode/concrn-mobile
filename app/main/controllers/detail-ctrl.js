'use strict';
angular.module('main')
.controller('DetailCtrl', function ($scope, $state, $stateParams, ConcrnClient) {
  $scope.report = {
    id: $stateParams.id,
    photo: null
  };

  $scope.finishReport = function () {
    ConcrnClient.updateReport($scope.report.id, {
      report: {
        image: $scope.report.photo
      }
    }).then(function() {
      $state.go('main.map');
    });
  };
});
