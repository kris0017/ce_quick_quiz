'use strict';

describe('Directive: result', function () {

  // load the directive's module
  beforeEach(module('ceQuickQuizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  /*it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<result></result>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the result directive');
  }));*/
});
