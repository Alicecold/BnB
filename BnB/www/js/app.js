// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
  .service('userInfo', function () {
    var adultGuests = 1;
    this.getAdultGuest = function () {
      return adultGuests;
    }
    this.setAdultGuest = function (guests) {
      adultGuests = guests;
    }
  })

  .controller('roomCtrl', function ($scope, $http, $state, userInfo) {
    $http.get('json/rooms.json').success(function (data) {

      $scope.rooms = data;
      $scope.whichRoom = $state.params.roomId;


    })

    $scope.adultGuests = userInfo.getAdultGuest();

    $scope.getAdultGuest = function () {
      return userInfo.getAdultGuest();
    }

    $scope.setAdultGuest = function (guests) {
      userInfo.setAdultGuest(guests);
     $scope.adultGuests = userInfo.getAdultGuest();
    }
    console.log($scope.adultGuests);

  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tabs.rooms', {
        url: '/rooms',
        views: {
          'rooms-tab': {
            templateUrl: 'templates/rooms.html',
            controller: 'roomCtrl'
          }
        }
      })

      .state('tabs.home', {
        url: '/home',
        views: {
          'home-tab': {
            templateUrl: 'templates/home.html'
          }
        }
      })

      .state('tabs.search', {
        url: '/search',
        views: {
          'search-tab': {
            templateUrl: 'templates/search.html',
            controller: 'roomCtrl'
          }
        }
      })
      .state('tabs.confirm', {
        url: '/confirm',
        views: {
          'confirm-tab': {
            templateUrl: 'templates/confirm.html',
            controller: 'roomCtrl'
          }
        }
      })
      .state('tabs.detail', {
        url: '/rooms/:roomId',
        views: {
          'rooms-tab': {
            templateUrl: 'templates/room.html',
            controller: 'roomCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/tab/home');
  })
