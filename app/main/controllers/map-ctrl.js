angular.module('main')
.controller('MapCtrl', function ($scope, leafletData, $state, ionicMaterialInk, ConcrnClient, ReverseGeocoder) {
  ionicMaterialInk.displayEffect();
  $scope.center = {
    autoDiscover: true
  };
  $scope.tiles = {
    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };
  //get center
  function setCenterMarker () {
    if (!$scope.map.getCenter) {
      return;
    }
    var center = $scope.map.getCenter();
    $scope.markers.mainMarker = {
      lat: center.lat,
      lng: center.lng,
      draggable: false,
      icon: {
        iconUrl: 'main/assets/images/pin.png', iconSize: [32, 56], iconAnchor: [15, 50]
      }
    };
    _.debounce(updateAddressFromCenter, 1000)();
  }

  leafletData.getMap().then(function (map) {
    $scope.map = map;
    setCenterMarker();
  });


  $scope.$on('leafletDirectiveMap.move', function () {
    $scope.map && setCenterMarker();
  });

  $scope.$on('leafletDirectiveMap.dragend', function () {
    $scope.map && setCenterMarker();
  });

  angular.extend($scope, {
    markers: {}
  });

  function updateAddressFromCenter() {
    return  ReverseGeocoder($scope.center.lat, $scope.center.lng).then(function(address) {
      $scope.address = address;
    });
  }

  $scope.submitReport = function () {
    ConcrnClient.reportCrisis({
      lat: $scope.center.lat,
      lng: $scope.center.lng,
      address: $scope.address
    }).then(function(report) {
      $state.go('main.detail', {id: report.id});
    });
  };

});
