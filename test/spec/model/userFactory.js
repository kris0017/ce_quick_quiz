'use strict';

describe('Factory: userFactory', function () {

  // load the service's module
  beforeEach(module('ceQuickQuizApp'));
 
  var scope, userFactory,
      testUser = {email: 'factoryTestEmail', password: 'factoryTestPassword'}; ;
 
  beforeEach(inject(function(_$rootScope_, _userFactory_){
    // Generate a new scope
    scope = _$rootScope_.$new();
    // Expose the factory to the tests
    userFactory = _userFactory_;
  }));

  it('can get an instance of the factory', inject(function(userFactory) {
    expect(userFactory).toBeDefined();
  }));

  it('getting saved object with users after adding new user', function() {    
    userFactory
      .add(testUser)
      .then(function(res) {
        console.log(res);
        expect(res).toEqual(jasmine.objectContaining(testUser));
        done();
      });
  });

  it('getting saved object with users', function() {    
    userFactory
      .get()
      .then(function(res) {
        console.log(res);
        expect(res).toEqual(jasmine.objectContaining(testUser));
        done();
      });     
  });


});
