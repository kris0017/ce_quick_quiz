'use strict';

/**
 * @ngdoc service
 * @name ceQuickQuizApp.Cache
 * @description This service is for storing and getting data
 * # Cache
 * Service in the ceQuickQuizApp.
 */
angular.module('ceQuickQuizApp')
  .service('Cache', function () {
    var user;
    
    this.setUser = function(loggedUser) {
      user = loggedUser;
    };

    this.getUser = function() {
      return user;
    };

  });
