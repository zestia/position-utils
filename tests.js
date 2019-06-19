var assert = require('assert');
var pos = require('./index');
var positionBoundary = pos.positionBoundary;
var elementPosition = pos.elementPosition;
var positionCoords = pos.positionCoords;

describe('positionBoundary', function() {
  var element = {
    getBoundingClientRect() {
      return {
        height: 600,
        width: 800
      };
    }
  };

  it('splits the element into rows and columns and returns a boundary rect', function() {
    assert.deepEqual(positionBoundary(element, 1, 1), {
      left: 800,
      top: 600,
      right: 0,
      bottom: 0
    });

    assert.deepEqual(positionBoundary(element, 2, 2), {
      left: 400,
      top: 300,
      right: 400,
      bottom: 300
    });

    assert.deepEqual(positionBoundary(element, 3, 3), {
      left: 266,
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
    rect = { top: 179, left: 269, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'top left');

    rect = { top: 179, left: 270, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'top center');

    rect = { top: 180, left: 270, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'middle center');

    rect = { top: 180, left: 269, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'left middle');

    rect = { top: 179, left: 570, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'top center');

    rect = { top: 179, left: 571, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'top right');

    rect = { top: 180, left: 571, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'right middle');

    rect = { top: 180, left: 569, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'middle center');

    rect = { top: 380, left: 570, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'middle center');

    rect = { top: 380, left: 571, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'right middle');

    rect = { top: 381, left: 571, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'bottom right');

    rect = { top: 381, left: 569, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'bottom center');

    rect = { top: 380, left: 269, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'left middle');

    rect = { top: 380, left: 270, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'middle center');

    rect = { top: 381, left: 270, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'bottom center');

    rect = { top: 381, left: 269, width: 60, height: 40 };
    assert.equal(elementPosition(element, boundary), 'bottom left');
  });
});

describe('positionCoords', function() {
  var element = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 200
      };
    },
    ownerDocument: {
      scrollingElement: {
        scrollLeft: 50,
        scrollTop: 100
      }
    }
  };

  var reference = {
    getBoundingClientRect() {
      return {
        top: 400,
        left: 300,
        width: 60,
        height: 25
      };
    }
  };

  it('returns coords to position the element on the outside edge of the reference', function() {
    assert.deepEqual(positionCoords('top left', element, reference), [350, 300]);
    assert.deepEqual(positionCoords('top center', element, reference), [330, 300]);
    assert.deepEqual(positionCoords('top right', element, reference), [310, 300]);
    assert.deepEqual(positionCoords('right middle', element, reference), [410, 412]);
    assert.deepEqual(positionCoords('right top', element, reference), [410, 500]);
    assert.deepEqual(positionCoords('right bottom', element, reference), [410, 325]);
    assert.deepEqual(positionCoords('bottom right', element, reference), [310, 525]);
    assert.deepEqual(positionCoords('bottom center', element, reference), [330, 525]);
    assert.deepEqual(positionCoords('bottom left', element, reference), [350, 525]);
    assert.deepEqual(positionCoords('left middle', element, reference), [250, 412]);
    assert.deepEqual(positionCoords('left top', element, reference), [250, 500]);
    assert.deepEqual(positionCoords('left bottom', element, reference), [250, 325]);
  });
});
