'use strict';

describe('Service: Cache', function () {

  // load the service's module
  beforeEach(module('ceQuickQuizApp'));

  // instantiate service
  var Cache;
  beforeEach(inject(function (_Cache_) {
    Cache = _Cache_;
  }));

  it('should do something', function () {
    expect(!!Cache).toBe(true);
  });

});
