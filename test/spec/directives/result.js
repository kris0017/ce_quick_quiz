'use strict';

describe('Directive: result', function () {

  // load the directive's module
  beforeEach(module('ceQuickQuizApp'));

  var element, compile, scope, variable;

  beforeEach(inject(function (_$compile_, _$rootScope_, $httpBackend, $injector) {
    $httpBackend =  $injector.get('$httpBackend');
    $httpBackend.whenGET('../views/partial/result.html').respond(200, '');

    scope = _$rootScope_.$new();
    compile = _$compile_;

    variable = '10';

    element = compile('<result answer="' + variable + '"></result>')(scope);
    scope.$digest();
  }));

  it('should parse and update answer', inject(function ($compile) {
    expect(element).toBeDefined();
    inject(function ($injector) {
        expect(element.attr('answer')).toEqual(variable);
    });
  }));
});
