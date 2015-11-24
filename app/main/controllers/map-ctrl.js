'use strict';
angular.module('main')
.controller('MapCtrl', function ($scope, leafletData, $state, ionicMaterialInk) {
  ionicMaterialInk.displayEffect();
  $scope.center = {
    autoDiscover: true
  };
  //get center
  function setCenterMarker () {
    var center = $scope.map.getCenter();
    $scope.markers.mainMarker = {
      lat: center.lat,
      lng: center.lng,
      draggable: false,
      icon: {
        iconUrl: '/images/pin.png', iconSize: [32, 50], iconAnchor: [15, 45]
      }
    };
  }

  leafletData.getMap().then(function (map) {
    $scope.map = map;
    setCenterMarker();
  });


  $scope.$on('leafletDirectiveMap.move', function () {
    $scope.map && setCenterMarker();
  });

  angular.extend($scope, {
    markers: {}
  });

  $scope.submitReport = function () {
    $state.go('main.detail');
  };

});
