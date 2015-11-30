angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'leaflet-directive',
  'ionic-material'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {
  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/map');
  $stateProvider
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
      .state('main.map', {
        url: '/map',
        views: {
          pageContent: {
            templateUrl: 'main/templates/map.html',
            controller: 'MapCtrl as map'
          }
        }
      })
      .state('main.detail', {
        url: '/detail?id',
        views: {
          pageContent: {
            templateUrl: 'main/templates/detail.html',
            controller: 'DetailCtrl as detail'
          }
        }

      })
      .state('main.login', {
        url: '/login',
        views: {
          pageContent: {
            templateUrl: 'main/templates/login.html',
            controller: 'LoginCtrl as long'
          }
        }
      })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
}).run(function($rootScope, responderState, $window) {
  $rootScope.updatingLocation = false;
  $rootScope.$watch(function() {
    return responderState.getIsResponder();
  }, function(isResponder) {
    if (!isResponder || $rootScope.updatingLocation) {
      return;
    }

    $rootScope.updatingLocation = true;
    $window.navigator.geolocation.watchPosition(function(position) {
      //send update to server
    });
  });

});
