'use strict';

describe('Service: Cache', function () {

  // load the service's module
  beforeEach(module('ceQuickQuizApp'));

  // instantiate service
  var Cache, 
      user = {
        email: 'serviceTestEmail',
        password: 'serviceTestPassword'
      };

  beforeEach(inject(function (_Cache_) {
    Cache = _Cache_;
  }));

  it('should contain a Cache Service',
     inject(function(Cache) {
          expect(Cache).not.toEqual(null);
  }));

  it('should save and get user', function () {
    Cache.setUser(user);
    expect(Cache.getUser()).toEqual(user);
  });

});
