'use strict';

describe('Controller: RegistrationCtrl', function () {

  // load the controller's module
  beforeEach(module('ceQuickQuizApp'));

  var RegistrationCtrl, scope, location, log, deferred, userFactory, fakeUser;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$location_, _$rootScope_, _userFactory_, _$q_, _$log_) {
    scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    location = _$location_;
    log = _$log_;
    userFactory = _userFactory_;

    spyOn(userFactory, 'add').and.callFake(function () {
      return deferred.promise;
    });
    
    spyOn(location, 'path').and.callThrough();

    RegistrationCtrl = _$controller_('RegistrationCtrl', {
      $scope: scope,
      $location: location,
      $log: log,
      userFactory: userFactory
    });  

    createVariables();   
  }));

  function createVariables() {
    fakeUser = {
      email: 'email@gmail.com',
      password: 'fakepass'
    };
  }

  it('ctrl should be defined and variables should be initialized', function() {
    expect(RegistrationCtrl).toBeDefined();
    expect(scope.labels).toEqual({ btn: 'Registration'});
    expect(scope.form).toEqual({ invalidEmail: false, invalidPassword: false });
    expect(scope.user).toEqual({ });
  });

  it('test for enterQuiz when user created', function() {    
    scope.user = fakeUser;
    
    scope.enterQuiz();

    expect(userFactory.add).toHaveBeenCalled();
    
    deferred.resolve(); 
    
    scope.$digest(); 
    expect(location.path).toHaveBeenCalled();
    expect(location.path).toHaveBeenCalledWith('/quiz');
    expect(log.info.logs).toContain(['User was successfully created']);
  });

  it('test for enterQuiz when error occurred while saving new user', function() {    
    scope.user = fakeUser;
    
    scope.enterQuiz();

    expect(userFactory.add).toHaveBeenCalled();
    
    deferred.reject(); 
    
    scope.$digest(); 
    expect(log.error.logs).toContain(['User was not created! An error occurred!']);
  });

});
