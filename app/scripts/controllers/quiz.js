'use strict';

/**
 * @ngdoc function
 * @name ceQuickQuizApp.controller:QuizCtrl
 * @description To control quiz.
 * # QuizCtrl
 * Controller of the ceQuickQuizApp
 */
quizApp.controller('QuizCtrl', ['$location', '$scope', 'Cache', function ($location, $scope, Cache) {
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

  $scope.decodeHtml = function(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }  

  $scope.updateScore = function() {
    $scope.userAnswers.score -= 15;
  }

  $scope.getResultObj = function(questionNumberStr) {
    var userAnswer = $scope.userAnswers[questionNumberStr] ? document.getElementById(questionNumberStr + '-' + $scope.userAnswers[questionNumberStr]).innerHTML : '';
    var isCorrect = angular.equals($scope.correctAnswers[questionNumberStr], $scope.userAnswers[questionNumberStr]);
    if (!isCorrect) {
      $scope.updateScore();
    }
    return {
      isCorrect: isCorrect,
      correctAnswer: $scope.decodeHtml(document.getElementById(questionNumberStr + '-' + $scope.correctAnswers[questionNumberStr]).innerHTML),
      userAnswer: $scope.decodeHtml(userAnswer)
    };
  }

  $scope.isFourthCorrect = function() {
    var isCorrect = false;
    if (angular.equals($scope.userAnswers.fourth.a, $scope.correctAnswers.fourth.a) || 
        angular.equals($scope.userAnswers.fourth.a, $scope.correctAnswers.fourth.b) || 
        angular.equals($scope.userAnswers.fourth.b, $scope.correctAnswers.fourth.a) || 
        angular.equals($scope.userAnswers.fourth.b, $scope.correctAnswers.fourth.b)) {
      isCorrect = true;
    }
    if (!isCorrect) {
      $scope.updateScore();
    }
    return {
      isCorrect: isCorrect,
      correctAnswer: $scope.correctAnswers.fourth.a + ' ' + $scope.correctAnswers.fourth.b,
      userAnswer:$scope.userAnswers.fourth.a + ' ' + $scope.userAnswers.fourth.b
    };
  }  

  $scope.countResult = function() {
    $scope.result = {
      first: $scope.getResultObj('first'),
      second: $scope.getResultObj('second'),
      third: $scope.getResultObj('third'),
      fourth: $scope.isFourthCorrect(),
      fifth: $scope.getResultObj('fifth'),
      sixth: $scope.getResultObj('sixth'),
    };
    $scope.question.showAll = true;
  };

}]);

