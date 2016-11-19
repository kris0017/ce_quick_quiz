'use strict';

/**
 * @ngdoc function
 * @name ceQuickQuizApp.controller:RegistrationCtrl
 * @description To control user registration.
 * # RegistrationCtrl
 * Controller of the ceQuickQuizApp
 */
quizApp.controller('RegistrationCtrl', ['$log', '$location', '$scope', 'Cache', 'md5', 'userFactory', function ($log, $location, $scope, Cache, md5, userFactory) {
  $scope.labels = {
    btn: 'Registration'
  };

  $scope.form = {
    invalidEmail: false,
    invalidPassword: false
  };

  $scope.user = {};

  $scope.enterQuiz = function() {
    if ($scope.form.invalidEmail || $scope.form.invalidPassword) {
      return;
    }
    $scope.user.password = md5.createHash($scope.user.password);
    userFactory.add($scope.user).then(
      function(userList) {
        Cache.setUser($scope.user);
        $location.path('/quiz');
        $log.info('User was successfully created');
      },
      function() {
        $log.error('User was not created! An error occurred!');
      });
  };

}]);
