'use strict';

/**
 * @ngdoc function
 * @name ceQuickQuizApp.controller:QuizCtrl
 * @description To control quiz.
 * # QuizCtrl
 * Controller of the ceQuickQuizApp
 */
quizApp.controller('QuizCtrl', ['$log', '$location', '$scope', 'Cache', function ($log, $location, $scope, Cache) {
  $scope.user = Cache.getUser();

  if (!$scope.user) {
    $location.path('/login');
  }

  $scope.question = { 
    number: 1,
    showAll: false
  };

  $scope.correctAnswers = {
    first: 'c',
    second: 'c',
    third: 'b',
    fourth: {
      a: 'menu',
      b: 'menuitem'
    },
    fifth: 'b',
    sixth: 'c'
  };

  $scope.userAnswers = {
    fourth: {},
    score: 100
  };

  $scope.logout = function() {
    Cache.setUser(undefined);
  }; 

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }  

  function updateScore() {
    $scope.userAnswers.score -= 15;
  }

  function getResultObj(questionNumberStr) {
    var userAnswer = $scope.userAnswers[questionNumberStr] ? document.getElementById(questionNumberStr + '-' + $scope.userAnswers[questionNumberStr]).innerHTML : '';
    var isCorrect = angular.equals($scope.correctAnswers[questionNumberStr], $scope.userAnswers[questionNumberStr]);
    if (!isCorrect) {
      updateScore();
    }
    return {
      isCorrect: isCorrect,
      correctAnswer: decodeHtml(document.getElementById(questionNumberStr + '-' + $scope.correctAnswers[questionNumberStr]).innerHTML),
      userAnswer: decodeHtml(userAnswer)
    };
  }

  function isFourthCorrect() {
    var isCorrect = false;
    if (angular.equals($scope.userAnswers.fourth.a, $scope.correctAnswers.fourth.a) || 
        angular.equals($scope.userAnswers.fourth.a, $scope.correctAnswers.fourth.b) || 
        angular.equals($scope.userAnswers.fourth.b, $scope.correctAnswers.fourth.a) || 
        angular.equals($scope.userAnswers.fourth.b, $scope.correctAnswers.fourth.b)) {
      isCorrect = true;
    }
    if (!isCorrect) {
      updateScore();
    }
    return {
      isCorrect: isCorrect,
      correctAnswer: $scope.correctAnswers.fourth.a + ' ' + $scope.correctAnswers.fourth.b,
      userAnswer:$scope.userAnswers.fourth.a + ' ' + $scope.userAnswers.fourth.b
    };
  }  

  $scope.countResult = function() {
    $scope.result = {
      first: getResultObj('first'),
      second: getResultObj('second'),
      third: getResultObj('third'),
      fourth: isFourthCorrect(),
      fifth: getResultObj('fifth'),
      sixth: getResultObj('sixth'),
    };
    $scope.question.showAll = true;
  };

}]);

