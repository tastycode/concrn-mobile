'use strict';
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
        url: '/detail',
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
});
