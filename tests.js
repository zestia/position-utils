var assert = require('assert');
var pos = require('./index');

var center    = { N: false, E: false, S: false, W: false };
var north     = { N: true,  E: false, S: false, W: false };
var northEast = { N: true,  E: true,  S: false, W: false };
var east      = { N: false, E: true,  S: false, W: false };
var southEast = { N: false, E: true,  S: true,  W: false };
var south     = { N: false, E: false, S: true,  W: false };
var southWest = { N: false, E: false, S: true,  W: true };
var west      = { N: false, E: false, S: false, W: true };
var northWest = { N: true,  E: false, S: false, W: true };

describe('positionToString', function() {
  it('converts a position object into a position string', function() {
    assert.equal(pos.positionToString(center), '');
    assert.equal(pos.positionToString(north), 'N');
    assert.equal(pos.positionToString(northEast), 'NE');
    assert.equal(pos.positionToString(east), 'E');
    assert.equal(pos.positionToString(southEast), 'SE');
    assert.equal(pos.positionToString(south), 'S');
    assert.equal(pos.positionToString(southWest), 'SW');
    assert.equal(pos.positionToString(west), 'W');
    assert.equal(pos.positionToString(northWest), 'NW');
  });
});

describe('stringToPosition', function() {
  it('converts a position string into a position object', function() {
    assert.deepEqual(pos.stringToPosition('C'), center);
    assert.deepEqual(pos.stringToPosition('X'), center);
    assert.deepEqual(pos.stringToPosition('N'), north);
    assert.deepEqual(pos.stringToPosition('NE'), northEast);
    assert.deepEqual(pos.stringToPosition('E'), east);
    assert.deepEqual(pos.stringToPosition('SE'), southEast);
    assert.deepEqual(pos.stringToPosition('S'), south);
    assert.deepEqual(pos.stringToPosition('SW'), southWest);
    assert.deepEqual(pos.stringToPosition('W'), west);
    assert.deepEqual(pos.stringToPosition('NW'), northWest);
  });
});

describe('hasDirection', function() {
  it('returns whether or not the position has a direction', function() {
    assert.equal(pos.hasDirection(center), false);
    assert.equal(pos.hasDirection(north), true);
    assert.equal(pos.hasDirection(northEast), true);
    assert.equal(pos.hasDirection(east), true);
    assert.equal(pos.hasDirection(southEast), true);
    assert.equal(pos.hasDirection(south), true);
    assert.equal(pos.hasDirection(southWest), true);
    assert.equal(pos.hasDirection(west), true);
    assert.equal(pos.hasDirection(northWest), true);
  });
});

describe('positionBoundary', function() {
  var element = {
    getBoundingClientRect() {
      return {
        width: 800,
        height: 600
      };
    }
  };

  it('splits the element into rows and columns and returns a boundary rect', function() {
    assert.deepEqual(pos.positionBoundary(element, 1, 1), { left: 800, top: 600, right: 0, bottom: 0 });
    assert.deepEqual(pos.positionBoundary(element, 2, 2), { left: 400, top: 300, right: 400, bottom: 300 });
    assert.deepEqual(pos.positionBoundary(element, 3, 3), { left: 267, top: 200, right: 533, bottom: 400 });
    assert.deepEqual(pos.positionBoundary(element, 4, 2), { left: 200, top: 300, right: 600, bottom: 300 });
  });
});

describe('elementPosition', function() {
  var rect;

  var boundary = {
    left: 300,
    top: 200,
    right: 600,
    bottom: 400
  };

  var element = {
    getBoundingClientRect() {
      return rect;
    }
  };

  it('assumes no position', function() {
    rect = {};
    assert.deepEqual(pos.elementPosition(element, boundary), center);

    rect = { top: 200 };
    assert.deepEqual(pos.elementPosition(element, boundary), center);

    rect = { right: 600 };
    assert.deepEqual(pos.elementPosition(element, boundary), center);

    rect = { bottom: 400 };
    assert.deepEqual(pos.elementPosition(element, boundary), center);

    rect = { left: 300 };
    assert.deepEqual(pos.elementPosition(element, boundary), center);

    rect = { left: 300, top: 200, right: 600, bottom: 400 };
    assert.deepEqual(pos.elementPosition(element, boundary), center);
  });

  it('determines the position of the element based on the boundary', function() {
    rect = { top: 199 };
    assert.deepEqual(pos.elementPosition(element, boundary), north);

    rect = { top: 199, right: 601 };
    assert.deepEqual(pos.elementPosition(element, boundary), northEast);

    rect = { top: 199, left: 299 };
    assert.deepEqual(pos.elementPosition(element, boundary), northWest);

    rect = { right: 601 };
    assert.deepEqual(pos.elementPosition(element, boundary), east);

    rect = { bottom: 401 };
    assert.deepEqual(pos.elementPosition(element, boundary), south);

    rect = { bottom: 401, right: 601 };
    assert.deepEqual(pos.elementPosition(element, boundary), southEast);

    rect = { bottom: 401, left: 299 };
    assert.deepEqual(pos.elementPosition(element, boundary), southWest);

    rect = { left: 299 };
    assert.deepEqual(pos.elementPosition(element, boundary), west);
  });

  it('is biased towards the position the element is most within', function() {
    rect = { top: 199, bottom: 401 };
    assert.deepEqual(pos.elementPosition(element, boundary), north);

    rect = { top: 198, bottom: 401 };
    assert.deepEqual(pos.elementPosition(element, boundary), north);

    rect = { top: 199, bottom: 402 };
    assert.deepEqual(pos.elementPosition(element, boundary), south);

    rect = { left: 299, right: 601 };
    assert.deepEqual(pos.elementPosition(element, boundary), west);

    rect = { left: 298, right: 601 };
    assert.deepEqual(pos.elementPosition(element, boundary), west);

    rect = { left: 299, right: 602 };
    assert.deepEqual(pos.elementPosition(element, boundary), east);

    rect = { left: 299, top: 199, right: 601, bottom: 401 };
    assert.deepEqual(pos.elementPosition(element, boundary), northWest);
  });
});

describe('positionCoords', function() {
  var element = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 200
      };
    }
  };

  var reference = {
    getBoundingClientRect() {
      return {
        left: 300,
        top: 400,
        width: 60,
        height: 25
      };
    }
  };

  var window = {
    pageXOffset: 50,
    pageYOffset: 100
  };

  it('returns coords to position the element on the outside edge of the reference', function() {
    assert.deepEqual(pos.positionCoords('C', element, reference, window), []);
    assert.deepEqual(pos.positionCoords('X', element, reference, window), []);
    assert.deepEqual(pos.positionCoords('N',  element, reference, window), [330, 300]);
    assert.deepEqual(pos.positionCoords('NE', element, reference, window), [410, 300]);
    assert.deepEqual(pos.positionCoords('E',  element, reference, window), [410, 413]);
    assert.deepEqual(pos.positionCoords('SE', element, reference, window), [410, 525]);
    assert.deepEqual(pos.positionCoords('S',  element, reference, window), [330, 525]);
    assert.deepEqual(pos.positionCoords('SW', element, reference, window), [250, 525]);
    assert.deepEqual(pos.positionCoords('W',  element, reference, window), [250, 413]);
    assert.deepEqual(pos.positionCoords('NW', element, reference, window), [250, 300]);
  });
});