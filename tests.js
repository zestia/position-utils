var assert = require('assert');
var pos = require('./index');
var positionBoundary = pos.positionBoundary;
var elementPosition = pos.elementPosition;
var positionCoords = pos.positionCoords;
var autoPosition = pos.autoPosition;

describe('positionBoundary', function() {
  var element = {
    getBoundingClientRect() {
      return {
        top: 100,
        left: 200,
        bottom: 700,
        right: 1000
      };
    }
  };

  it('splits the element into rows and columns and returns a boundary rect', function() {
    assert.deepEqual(positionBoundary(element, 1, 1), { left: 800, top: 600, right: 0, bottom: 0 });

    assert.deepEqual(positionBoundary(element, 2, 2), {
      left: 400,
      top: 300,
      right: 400,
      bottom: 300
    });

    assert.deepEqual(positionBoundary(element, 3, 3), {
      left: 267,
      top: 200,
      right: 533,
      bottom: 400
    });

    assert.deepEqual(positionBoundary(element, 4, 2), {
      left: 200,
      top: 300,
      right: 600,
      bottom: 300
    });
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

  it('determines the position of the element based on the boundary', function() {
    rect = { top: 179, bottom: 219, left: 269, right: 329 };
    assert.equal(elementPosition(element, boundary), 'top left');

    rect = { top: 179, bottom: 219, left: 270, right: 330 };
    assert.equal(elementPosition(element, boundary), 'top center');

    rect = { top: 180, bottom: 220, left: 270, right: 330 };
    assert.equal(elementPosition(element, boundary), 'middle center');

    rect = { top: 180, bottom: 220, left: 269, right: 329 };
    assert.equal(elementPosition(element, boundary), 'left middle');

    rect = { top: 179, bottom: 219, left: 570, right: 630 };
    assert.equal(elementPosition(element, boundary), 'top center');

    rect = { top: 179, bottom: 219, left: 571, right: 631 };
    assert.equal(elementPosition(element, boundary), 'top right');

    rect = { top: 180, bottom: 220, left: 571, right: 631 };
    assert.equal(elementPosition(element, boundary), 'right middle');

    rect = { top: 180, bottom: 220, left: 569, right: 629 };
    assert.equal(elementPosition(element, boundary), 'middle center');

    rect = { top: 380, bottom: 420, left: 570, right: 630 };
    assert.equal(elementPosition(element, boundary), 'middle center');

    rect = { top: 380, bottom: 420, left: 571, right: 631 };
    assert.equal(elementPosition(element, boundary), 'right middle');

    rect = { top: 381, bottom: 421, left: 571, right: 631 };
    assert.equal(elementPosition(element, boundary), 'bottom right');

    rect = { top: 381, bottom: 421, left: 569, right: 629 };
    assert.equal(elementPosition(element, boundary), 'bottom center');

    rect = { top: 380, bottom: 420, left: 269, right: 329 };
    assert.equal(elementPosition(element, boundary), 'left middle');

    rect = { top: 380, bottom: 420, left: 270, right: 330 };
    assert.equal(elementPosition(element, boundary), 'middle center');

    rect = { top: 381, bottom: 421, left: 270, right: 330 };
    assert.equal(elementPosition(element, boundary), 'bottom center');

    rect = { top: 381, bottom: 421, left: 269, right: 329 };
    assert.equal(elementPosition(element, boundary), 'bottom left');
  });
});

describe('positionCoords', function() {
  var element = {
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        right: 100,
        bottom: 200
      };
    }
  };

  var reference = {
    getBoundingClientRect() {
      return {
        left: 300,
        top: 400,
        right: 360,
        bottom: 425
      };
    }
  };

  var window = {
    pageXOffset: 50,
    pageYOffset: 100
  };

  it('returns coords to position the element on the outside edge of the reference', function() {
    assert.deepEqual(positionCoords('top left', element, reference, window), [350, 300]);
    assert.deepEqual(positionCoords('top center', element, reference, window), [330, 300]);
    assert.deepEqual(positionCoords('top right', element, reference, window), [310, 300]);
    assert.deepEqual(positionCoords('right middle', element, reference, window), [410, 413]);
    assert.deepEqual(positionCoords('right top', element, reference, window), [410, 500]);
    assert.deepEqual(positionCoords('right bottom', element, reference, window), [410, 325]);
    assert.deepEqual(positionCoords('bottom right', element, reference, window), [310, 525]);
    assert.deepEqual(positionCoords('bottom center', element, reference, window), [330, 525]);
    assert.deepEqual(positionCoords('bottom left', element, reference, window), [350, 525]);
    assert.deepEqual(positionCoords('left middle', element, reference, window), [250, 413]);
    assert.deepEqual(positionCoords('left top', element, reference, window), [250, 500]);
    assert.deepEqual(positionCoords('left bottom', element, reference, window), [250, 325]);
  });
});

describe('autoPosition', function() {
  it('returns the opposite position', function() {
    assert.equal(autoPosition('middle center'), 'bottom center');
    assert.equal(autoPosition('top center'), 'bottom center');
    assert.equal(autoPosition('top left'), 'bottom left');
    assert.equal(autoPosition('top right'), 'bottom right');
    assert.equal(autoPosition('bottom center'), 'top center');
    assert.equal(autoPosition('bottom left'), 'top left');
    assert.equal(autoPosition('bottom right'), 'top right');
    assert.equal(autoPosition('left middle'), 'right middle');
    assert.equal(autoPosition('right middle'), 'left middle');
  });
});
