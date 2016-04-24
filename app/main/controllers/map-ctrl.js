angular.module('main')
.controller('MapCtrl', function ($scope, leafletData, $state, ionicMaterialInk, ConcrnClient, ReverseGeocoder, localStorage, $ionicModal) {
  function verifyLogin() {
    var responderName = localStorage.get('name', null);
    if (!responderName) {
      $ionicModal.fromTemplateUrl('main/templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up',
        hardwareBackButtonClose: false,
        backdropClickToClose: false
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
      $scope.$on('closeLogin', function() {
        $scope.modal.hide();
      });
    }
  }
  verifyLogin();
  ionicMaterialInk.displayEffect();
  $scope.center = {
    autoDiscover: true
  };
  $scope.tiles = {
    url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
    options: {
      subdomains: '1234'
    }
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
    mixpanel.track('Report Submitted');
    $state.go('main.detail', {lat: $scope.center.lat, lng: $scope.center.lng, address: $scope.address});
  };

});
