// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
  .service('searchQuery', function () {
    var adultGuests = 1;
    var childGuests = 0;
    this.getChildGuests = function () {
      return childGuests;
    };
    this.setChildGuests = function (guests) {
      childGuests = guests;
    };
    this.getAdultGuests = function () {
      return adultGuests;
    };
    this.setAdultGuests = function (guests) {
      adultGuests = guests;
    };
  })
  .service('bookInfo', function () {
    var user;
    var room;
    var basics;

    this.getUser = function () {
      return user;
    };

    this.getRoom = function () {
      return room;
    };

    this.setUser = function (givenName, surname, email, phone) {
      user = {
        name: giveName + " " + surname,
        email: email,
        phone: phone
      };
    };

    this.setRoom = function (roomID) {
      room = roomID;
    };

    this.setBasics = function (inDate, outDate, adults, children) {
      basics = {
        checkin: inDate,
        checkout: outDate,
        adultGuests: adults,
        childGuests: children
      };
    };

  })

  .controller('roomCtrl', function ($scope, $http, $state, searchQuery, bookInfo) {
    $http.get('json/rooms.json').success(function (data) {

      $scope.rooms = data;
      $scope.whichRoom = $state.params.roomId;


    })

    /* search for rooms */

    $scope.getAdultGuests = function () {
      return searchQuery.getAdultGuests();
    }

    $scope.setAdultGuests = function (guests) {
      searchQuery.setAdultGuests(guests);
      $scope.adultGuests = searchQuery.getAdultGuests();
    }
    $scope.getChildGuests = function () {
      return searchQuery.getChildGuests();
    }

    $scope.setChildGuests = function (guests) {
      if (guests)
        searchQuery.setChildGuests(guests);
      else
        searchQuery.setChildGuests(0);
      $scope.adultGuests = searchQuery.getChildGuests();
    }

    $scope.getTotalGuests = function () {
      return searchQuery.getAdultGuests() + searchQuery.getChildGuests();
    }

    /* Book room */
    $scope.getBookedRoom = function () {
      return bookInfo.getRoom();
    };

    $scope.setBookedRoom= function (room) {
      bookInfo.setRoom(room);
    }

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
