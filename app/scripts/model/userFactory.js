'use strict';

/**
 * @ngdoc function
 * @name ceQuickQuizApp.factory:userFactory
 * @description This factory persists and retrieves users from localStorage.
 * # userFactory
 * Factory of the ceQuickQuizApp
 */
quizApp.factory('userFactory', ['$q', function ($q) {

    // key to get user list from local storage
    var USER_LIST = 'user-list';

    var storage = {
        userList: JSON.parse(localStorage.getItem(USER_LIST) || '[]'),

        _getFromLocalStorage: function () {
            return JSON.parse(localStorage.getItem(USER_LIST) || '[]');
        },

        _saveToLocalStorage: function (userList) {
            localStorage.setItem(USER_LIST, JSON.stringify(userList));
        },

        get: function () {
            var deferred = $q.defer();

            angular.copy(storage._getFromLocalStorage(), storage.userList);
            deferred.resolve(storage.userList);

            return deferred.promise;
        },

        add: function (user) {
            var deferred = $q.defer();
         
            // save user to array with users
            storage.userList.push(user);

            storage._saveToLocalStorage(storage.userList);
            deferred.resolve(storage.userList);

            return deferred.promise;
        },
    };

    return storage;
    
  }]);