'use strict';

/**
 * @ngdoc function
 * @name ceQuickQuizApp.controller:LoginCtrl
 * @description To control user login.
 * # LoginCtrl
 * Controller of the ceQuickQuizApp
 */
quizApp.controller('LoginCtrl', ['$log', '$location', '$scope', 'Cache', 'md5', 'userFactory', function ($log, $location, $scope, Cache, md5, userFactory) {

 $scope.labels = {
    btn: 'Login'
  };

  $scope.form = {
    invalidEmail: false,
    invalidPassword: false,
    invalidUser: false
  };

  $scope.user = {};

  $scope.enterQuiz = function() {
    if ($scope.form.invalidEmail || $scope.form.invalidPassword) {
      return;
    }
   
    userFactory.get().then(
      function(userList) {
        var user,
            userPasword = md5.createHash($scope.user.password);
        for(var i = 0; i < userList.length; i++) {
          if (angular.equals(userList[i], $scope.user)) {
            user = userList[i];
            break;
          }
        }
        if (user) {
          Cache.setUser(user);
          $location.path('/quiz');
          $log.info('User was successfully found');
        } else {
          $scope.form.invalidUser = true;
          $log.error('User was not found! An error occurred!');
        }        
      },
      function() {
        $log.error('User list was not loaded! An error occurred!');
      });
  };

}]);
