'use strict';

describe('Controller: QuizCtrl', function () {

  // load the controller's module
  beforeEach(module('ceQuickQuizApp'));

  var QuizCtrl, scope, location, Cache, fakeUser, fakeAnswers, alreadyCalled = false;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$location_, _$rootScope_, _Cache_) {
    createVariables(); 

    scope = _$rootScope_.$new();
    Cache =_Cache_;
    location = _$location_;
      
    spyOn(Cache, 'getUser').and.callFake(function() {
      if (alreadyCalled) return fakeUser;
      alreadyCalled = true;
      return undefined;
    });

    spyOn(Cache, 'setUser').and.callThrough();

    spyOn(location, 'path').and.callThrough();

    QuizCtrl = _$controller_('QuizCtrl', {
      $scope: scope,
      $location: location,
      Cache: Cache
    });  

    createVariables();       
  }));

  function createVariables() {
    fakeUser = {
      email: 'email@gmail.com',
      password: 'fakepass'
    };
  }

  it('ctrl should be defined, user = undefined -> user should be redirected', function() {
    expect(QuizCtrl).toBeDefined();

    expect(Cache.getUser).toHaveBeenCalled();    
    expect(scope.user).toEqual(undefined);
    expect(location.path).toHaveBeenCalled();
    expect(location.path).toHaveBeenCalledWith('/login');
  });


  it('user exists -> variables should be initialized', function() {
    expect(scope.user).toEqual(fakeUser);
    expect(scope.question).toEqual({ number: 1, showAll: false });
    expect(scope.correctAnswers).toEqual({ first: 'c', second: 'c', third: 'b', fourth: { a: 'menu', b: 'menuitem' }, fifth: 'b', sixth: 'c' });
    expect(scope.userAnswers).toEqual({ fourth: {}, score: 100 });
  });

  it('logout the user', function() {
    scope.logout();
    expect(Cache.setUser).toHaveBeenCalled();
  });

  it('decoding the html', function() {
    var string = '3&nbsp;&gt;&nbsp;1&nbsp;&nbsp;&nbsp;1&nbsp;&lt;&nbsp;3'
    var newStr = scope.decodeHtml(string);
    expect(newStr).toEqual('3 > 1   1 < 3');
  });

  it('updating score', function() {
    scope.userAnswers.score = 15;
    scope.updateScore();
    expect(scope.userAnswers.score).toEqual(0);
  });

  it('check object of correct user answer', function() {
    scope.userAnswers.first = 'c';
    scope.userAnswers.score = 100;

    var dummyElement = document.createElement('span');
    dummyElement.innerHTML = 'C. Private properties and methods';
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);


    var obj = scope.getResultObj('first');
    var resultObject = {
      isCorrect: true,
      correctAnswer: 'C. Private properties and methods',
      userAnswer: 'C. Private properties and methods'
    }

    expect(obj).toEqual(resultObject);
    expect(scope.userAnswers.score).toEqual(100);
  });

  it('check object of incorrect user answer', function() {
    scope.userAnswers.first = 'b';
    scope.userAnswers.score = 100;

    var dummyElement = document.createElement('span');
    
    document.getElementById = jasmine.createSpy('HTML Element').and.callFake(function(id) {
      if (id == 'first-b') {
        dummyElement.innerHTML = 'B. Encapsulation';
      } else {
        dummyElement.innerHTML = 'C. Private properties and methods';
      }      
      return dummyElement;
    });

    var obj = scope.getResultObj('first');
    var resultObject = {
      isCorrect: false,
      correctAnswer: 'C. Private properties and methods',
      userAnswer: 'B. Encapsulation'
    }

    expect(obj).toEqual(resultObject);
    expect(scope.userAnswers.score).toEqual(85);
  });

  it('check object of empty user answer', function() {
    scope.userAnswers.first = undefined;
    scope.userAnswers.score = 100;

    var dummyElement = document.createElement('span');
    
    document.getElementById = jasmine.createSpy('HTML Element').and.callFake(function(id) {
      if (id == 'first-b') {
        dummyElement.innerHTML = 'B. Encapsulation';
      } else {
        dummyElement.innerHTML = 'C. Private properties and methods';
      }      
      return dummyElement;
    });

    var obj = scope.getResultObj('first');
    var resultObject = {
      isCorrect: false,
      correctAnswer: 'C. Private properties and methods',
      userAnswer: ''
    }

    expect(obj).toEqual(resultObject);
    expect(scope.userAnswers.score).toEqual(85);
  });

  it('check object of correct user answer for question # 4', function() {
    scope.userAnswers.fourth = {
      a: 'menu',
      b: 'menuitem'
    };
    scope.userAnswers.score = 100;

    var obj = scope.isFourthCorrect();
    var resultObject = {
      isCorrect: true,
      correctAnswer: 'menu menuitem',
      userAnswer: 'menu menuitem'
    }

    expect(obj).toEqual(resultObject);
    expect(scope.userAnswers.score).toEqual(100);
  });


  it('check object of incorrect user answer for question # 4', function() {
    scope.userAnswers.fourth = {
      a: 'input',
      b: 'output'
    };
    scope.userAnswers.score = 100;

    var obj = scope.isFourthCorrect();
    var resultObject = {
      isCorrect: false,
      correctAnswer: 'menu menuitem',
      userAnswer: 'input output'
    }

    expect(obj).toEqual(resultObject);
    expect(scope.userAnswers.score).toEqual(85);
  });

  it('check object of empty user answer for question # 4', function() {
    scope.userAnswers.fourth = {
      a: '',
      b: ''
    };
    scope.userAnswers.score = 100;

    var obj = scope.isFourthCorrect();
    var resultObject = {
      isCorrect: false,
      correctAnswer: 'menu menuitem',
      userAnswer: ' '
    }

    expect(obj).toEqual(resultObject);
    expect(scope.userAnswers.score).toEqual(85);
  });

  it('check result object after user finished quiz and gave all correct answers', function() {
    scope.userAnswers = {
      first: 'c',
      second: 'c',
      third: 'b',
      fourth: {
        a: 'menu',
        b: 'menuitem'
      },
      fifth: 'b',
      sixth: 'c',
      score: 100
    };

    scope.countResult();
    expect(scope.userAnswers.score).toEqual(100);
    expect(scope.question.showAll).toEqual(true);
  });

  it('check result object after user finished quiz and gave all incorrect answers', function() {
    scope.userAnswers = {
      first: 'a',
      second: 'a',
      third: 'a',
      fourth: {
        a: 'a',
        b: 'a'
      },
      fifth: 'a',
      sixth: 'a',
      score: 100
    };

    scope.countResult();
    expect(scope.userAnswers.score).toEqual(10);
    expect(scope.question.showAll).toEqual(true);
  });


});
