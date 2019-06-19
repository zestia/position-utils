var assert = require('assert');
var pos = require('./index');
var elementPosition = pos.elementPosition;
var positionCoords = pos.positionCoords;

describe('elementPosition', function() {
  var rect;

  var element = {
    getBoundingClientRect() {
      return rect;
    }
  };

  var container = {
    getBoundingClientRect() {
      return {
        width: 180,
        height: 90
      };
    }
  };

  it('determines the position of the element in the container based on the bounding box', function() {
    rect = { top: 14, left: 29, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'top left');

    rect = { top: 14, left: 60, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'top center');

    rect = { top: 14, left: 91, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'top right');

    rect = { top: 30, left: 29, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'left middle');

    rect = { top: 30, left: 60, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'middle center');

    rect = { top: 30, left: 91, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'right middle');

    rect = { top: 46, left: 29, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'bottom left');

    rect = { top: 46, left: 60, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'bottom center');

    rect = { top: 46, left: 91, width: 60, height: 30 };
    assert.equal(elementPosition(element, container, 3, 3), 'bottom right');
  });
});

describe('positionCoords', function() {
  var element = {
    getBoundingClientRect() {
      return {
        width: 20,
        height: 10
      };
    },
    ownerDocument: {
      scrollingElement: {
        scrollLeft: 10,
        scrollTop: 5
      }
    }
  };

  var reference = {
    getBoundingClientRect() {
      return {
        top: 20,
        left: 50,
        width: 60,
        height: 30
      };
    }
  };

  it('returns coords to position the element on the outside edge of the reference', function() {
    assert.deepEqual(positionCoords('top left', element, reference), [60, 15]);
    assert.deepEqual(positionCoords('top center', element, reference), [80, 15]);
    assert.deepEqual(positionCoords('top right', element, reference), [100, 15]);
    assert.deepEqual(positionCoords('right middle', element, reference), [120, 35]);
    assert.deepEqual(positionCoords('right top', element, reference), [120, 25]);
    assert.deepEqual(positionCoords('right bottom', element, reference), [120, 45]);
    assert.deepEqual(positionCoords('bottom right', element, reference), [100, 55]);
    assert.deepEqual(positionCoords('bottom center', element, reference), [80, 55]);
    assert.deepEqual(positionCoords('bottom left', element, reference), [60, 55]);
    assert.deepEqual(positionCoords('left middle', element, reference), [40, 35]);
    assert.deepEqual(positionCoords('left top', element, reference), [40, 25]);
    assert.deepEqual(positionCoords('left bottom', element, reference), [40, 45]);
  });
});
