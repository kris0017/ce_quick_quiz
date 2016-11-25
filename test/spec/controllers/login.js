'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('ceQuickQuizApp'));

  var LoginCtrl, scope, location, log, deferred, userFactory, fakeUserList, goodUser, badUser;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$location_, _$rootScope_, _userFactory_, _md5_, _$q_, _$log_) {
    scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    location = _$location_;
    log = _$log_;
    userFactory = _userFactory_;

    spyOn(userFactory, 'get').and.callFake(function () {
      return deferred.promise;
    });
    
    spyOn(location, 'path').and.callThrough();

    LoginCtrl = _$controller_('LoginCtrl', {
      $scope: scope,
      $location: location,
      $log: log,
      userFactory: userFactory
    });  

    createVariables(_md5_);   
  }));

  function createVariables(_md5_) {
    fakeUserList = [
      {
        email: 'email1@gmail.com',
        password: _md5_.createHash('fakepass1')
      },
      {
        email: 'email2@gmail.com',
        password: _md5_.createHash('fakepass2')
      }
    ];

    goodUser = {
      email: 'email1@gmail.com',
      password: 'fakepass1'
    };

    badUser = {
      email: 'email3@gmail.com',
      password: 'fakepass3'
    };
  }

  it('ctrl should be defined and variables should be initialized', function() {
    expect(LoginCtrl).toBeDefined();
    expect(scope.labels).toEqual({ btn: 'Login'});
    expect(scope.form).toEqual({ invalidEmail: false, invalidPassword: false, invalidUser: false });
    expect(scope.user).toEqual({ });
  });

  it('test for enterQuiz when user exist', function() {    
    scope.user = goodUser;
    
    scope.enterQuiz();

    expect(userFactory.get).toHaveBeenCalled();
    
    deferred.resolve(fakeUserList); 
    
    scope.$digest(); 
    expect(location.path).toHaveBeenCalled();
    expect(location.path).toHaveBeenCalledWith('/quiz');
  });

  it('test for enterQuiz when user does not exist', function() {    
    scope.user = badUser;
    
    scope.enterQuiz();

    expect(userFactory.get).toHaveBeenCalled();
    
    deferred.resolve(fakeUserList); 
    
    scope.$digest(); 
    expect(scope.form.invalidUser).toEqual(true);
    expect(log.error.logs).toContain(['User was not found! An error occurred!'])
  });

  it('test for enterQuiz when error occurred while getting user list', function() {    
    scope.user = badUser;
    
    scope.enterQuiz();

    expect(userFactory.get).toHaveBeenCalled();
    
    deferred.reject(); 
    
    scope.$digest(); 
    expect(log.error.logs).toContain(['User list was not loaded! An error occurred!']);
  });

});
