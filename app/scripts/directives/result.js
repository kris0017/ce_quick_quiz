'use strict';

/**
 * @ngdoc directive
 * @name ceQuickQuizApp.directive:result
 * @description
 * # result
 */
angular.module('ceQuickQuizApp')
  .directive('result', function () {
    return {
      templateUrl: '../views/partial/result.html',
      restrict: 'E',
      transclude: true,
      link: function postLink(scope, element, attrs) {
      scope.$watch(attrs.answer, function() { 
        if (attrs.answer) {
          scope.answer = JSON.parse(attrs.answer);
        }        
      });
      }
    };
  });
