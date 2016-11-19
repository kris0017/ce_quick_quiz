'use strict';

/**
 * @ngdoc overview
 * @name ceQuickQuizApp
 * @description
 * # ceQuickQuizApp
 *
 * Main module of the application.
 */
var quizApp = angular
  .module('ceQuickQuizApp', [
    'ngRoute',
    'angular-md5'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationCtrl'
      })
      .when('/quiz', {
        templateUrl: 'views/quiz.html',
        controller: 'QuizCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
