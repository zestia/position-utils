const test = require('ava');
const { getPosition, getCoords } = require('./index');

class Node {
  constructor(rect) {
    this.rect = rect;
  }

  getBoundingClientRect() {
    return this.rect;
  }
}

class Window {
  constructor(options) {
    Object.assign(this, options);
  }
}

class Document {
  constructor(rect) {
    this.documentElement = new Node(rect);
  }
}

global.Window = Window;
global.Document = Document;

test('getPosition', t => {
  const container = new Node({
    top: -10,
    bottom: 330,
    left: -20,
    right: 580,
    width: 300,
    height: 150
  });

  let element;

  element = new Node({
    top: 37,
    left: 79,
    bottom: 62,
    right: 119,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'top left', 'top left');

  element = new Node({
    top: 37,
    left: 80,
    bottom: 62,
    right: 120,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'top center', 'top center');

  element = new Node({
    top: 37,
    left: 181,
    bottom: 62,
    right: 221,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'top right', 'top right');

  element = new Node({
    top: 38,
    left: 79,
    bottom: 63,
    right: 119,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'middle left');

  element = new Node({
    top: 38,
    left: 80,
    bottom: 63,
    right: 120,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'middle center', 'middle center');

  element = new Node({
    top: 38,
    left: 181,
    bottom: 63,
    right: 221,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'middle right', 'middle right');

  element = new Node({
    top: 88,
    left: 79,
    bottom: 113,
    right: 119,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'bottom left', 'bottom left');

  element = new Node({
    top: 88,
    left: 80,
    bottom: 113,
    right: 120,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'bottom center', 'bottom center');

  element = new Node({
    top: 88,
    left: 181,
    bottom: 113,
    right: 221,
    width: 40,
    height: 25
  });

  t.is(getPosition(element, container, 3, 3), 'bottom right', 'bottom right');
});

test('getCoords', t => {
  const container = new Node({
    top: -5,
    bottom: 65,
    left: -10,
    right: 90,
    width: 100,
    height: 70
  });

  const reference = new Node({
    top: 25,
    bottom: 35,
    left: 30,
    right: 50,
    width: 20,
    height: 10
  });

  const element = new Node({
    width: 40,
    height: 30
  });

  t.deepEqual(
    getCoords('top left', element, reference, container),
    {
      left: 40,
      top: 0,
      position: 'top left'
    },
    'top left'
  );

  t.deepEqual(
    getCoords('top center', element, reference, container),
    {
      left: 30,
      top: 0,
      position: 'top center'
    },
    'top center'
  );

  t.deepEqual(
    getCoords('top right', element, reference, container),
    {
      left: 20,
      top: 0,
      position: 'top right'
    },
    'top right'
  );

  t.deepEqual(
    getCoords('right top', element, reference, container),
    {
      left: 60,
      top: 30,
      position: 'right top'
    },
    'right top'
  );

  t.deepEqual(
    getCoords('right middle', element, reference, container),
    {
      left: 60,
      top: 20,
      position: 'right middle'
    },
    'right middle'
  );

  t.deepEqual(
    getCoords('right bottom', element, reference, container),
    {
      left: 60,
      top: 10,
      position: 'right bottom'
    },
    'right bottom'
  );

  t.deepEqual(
    getCoords('bottom left', element, reference, container),
    {
      left: 40,
      top: 40,
      position: 'bottom left'
    },
    'bottom left'
  );

  t.deepEqual(
    getCoords('bottom center', element, reference, container),
    {
      left: 30,
      top: 40,
      position: 'bottom center'
    },
    'bottom center'
  );

  t.deepEqual(
    getCoords('bottom right', element, reference, container),
    {
      left: 20,
      top: 40,
      position: 'bottom right'
    },
    'bottom right'
  );

  t.deepEqual(
    getCoords('left top', element, reference, container),
    {
      left: 0,
      top: 30,
      position: 'left top'
    },
    'left top'
  );

  t.deepEqual(
    getCoords('left middle', element, reference, container),
    {
      left: 0,
      top: 20,
      position: 'left middle'
    },
    'left middle'
  );

  t.deepEqual(
    getCoords('left bottom', element, reference, container),
    {
      left: 0,
      top: 10,
      position: 'left bottom'
    },
    'left bottom'
  );
});

test('getCoords with container as boundary', t => {
  const container = new Document({
    top: -5,
    bottom: 65,
    left: -10,
    right: 90,
    width: 100,
    height: 70
  });

  const bounds = container;

  const element = new Node({
    width: 40,
    height: 30
  });

  let reference;

  reference = new Node({
    top: 24,
    bottom: 34,
    left: -10,
    right: 10,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top left', element, reference, container, bounds),
    {
      left: 0,
      top: 39,
      position: 'bottom left'
    },
    'top left, overflowing top'
  );

  reference = new Node({
    top: 25,
    bottom: 35,
    left: 51,
    right: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top left', element, reference, container, bounds),
    {
      left: 41,
      top: 0,
      position: 'top right'
    },
    'top left, overflowing right'
  );

  reference = new Node({
    top: 24,
    bottom: 34,
    left: 51,
    right: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top left', element, reference, container, bounds),
    {
      left: 41,
      top: 39,
      position: 'bottom right'
    },
    'top left, overflowing top right'
  );

  reference = new Node({
    top: 24,
    bottom: 34,
    left: 0,
    right: 20,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top center', element, reference, container, bounds),
    {
      left: 0,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top'
  );

  reference = new Node({
    top: 25,
    bottom: 35,
    left: -1,
    right: 19,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top center', element, reference, container, bounds),
    {
      left: -1,
      top: 0,
      position: 'top center'
    },
    'top center, overflowing left'
  );

  reference = new Node({
    top: 25,
    bottom: 35,
    left: 51,
    right: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top center', element, reference, container, bounds),
    {
      left: 51,
      top: 0,
      position: 'top center'
    },
    'top center, overflowing right'
  );

  reference = new Node({
    top: 24,
    bottom: 34,
    left: -1,
    right: 19,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top center', element, reference, container, bounds),
    {
      left: -1,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top left'
  );

  reference = new Node({
    top: 24,
    bottom: 34,
    left: 61,
    right: 81,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top center', element, reference, container, bounds),
    {
      left: 61,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top right'
  );

  reference = new Node({
    top: 24,
    bottom: 34,
    left: 10,
    right: 30,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top right', element, reference, container, bounds),
    {
      left: 0,
      top: 39,
      position: 'bottom right'
    },
    'top right, overflowing top'
  );

  reference = new Node({
    top: 25,
    bottom: 35,
    left: 9,
    right: 29,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top right', element, reference, container, bounds),
    {
      left: 19,
      top: 0,
      position: 'top left'
    },
    'top right, overflowing left'
  );

  reference = new Node({
    top: 24,
    bottom: 34,
    left: 9,
    right: 29,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('top right', element, reference, container, bounds),
    {
      left: 19,
      top: 39,
      position: 'bottom left'
    },
    'top right, overflowing top left'
  );

  reference = new Node({
    top: -5,
    bottom: 5,
    left: 31,
    right: 51,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right top', element, reference, container, bounds),
    {
      left: 1,
      top: 0,
      position: 'left top'
    },
    'right top, overflowing right'
  );

  reference = new Node({
    top: 36,
    bottom: 46,
    left: 30,
    right: 50,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right top', element, reference, container, bounds),
    {
      left: 60,
      top: 21,
      position: 'right bottom'
    },
    'right top, overflowing bottom'
  );

  reference = new Node({
    top: 36,
    bottom: 46,
    left: 31,
    right: 51,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right top', element, reference, container, bounds),
    {
      left: 1,
      top: 21,
      position: 'left bottom'
    },
    'right top, overflowing bottom right'
  );

  reference = new Node({
    top: 5,
    bottom: 15,
    left: 31,
    right: 51,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right middle', element, reference, container, bounds),
    {
      left: 1,
      top: 0,
      position: 'left middle'
    },
    'right middle, overflowing right'
  );

  reference = new Node({
    top: 4,
    bottom: 14,
    left: 31,
    right: 51,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right middle', element, reference, container, bounds),
    {
      left: 1,
      top: -1,
      position: 'left middle'
    },
    'right middle, overflowing top right'
  );

  reference = new Node({
    top: 46,
    bottom: 56,
    left: 31,
    right: 51,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right middle', element, reference, container, bounds),
    {
      left: 1,
      top: 41,
      position: 'left middle'
    },
    'right middle, overflowing bottom right'
  );

  reference = new Node({
    top: 15,
    bottom: 25,
    left: 31,
    right: 51,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right bottom', element, reference, container, bounds),
    {
      left: 1,
      top: 0,
      position: 'left bottom'
    },
    'right bottom, overflowing right'
  );

  reference = new Node({
    top: 14,
    bottom: 24,
    left: 30,
    right: 50,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right bottom', element, reference, container, bounds),
    {
      left: 60,
      top: 19,
      position: 'right top'
    },
    'right bottom, overflowing top'
  );

  reference = new Node({
    top: 14,
    bottom: 24,
    left: 31,
    right: 51,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('right bottom', element, reference, container, bounds),
    {
      left: 1,
      top: 19,
      position: 'left top'
    },
    'right bottom, overflowing top right'
  );

  reference = new Node({
    top: 26,
    bottom: 36,
    left: -10,
    right: 10,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('bottom left', element, reference, container, bounds),
    {
      left: 0,
      top: 1,
      position: 'top left'
    },
    'bottom left, overflowing bottom'
  );

  reference = new Node({
    top: 25,
    bottom: 35,
    left: 51,
    right: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('bottom left', element, reference, container, bounds),
    {
      left: 41,
      top: 40,
      position: 'bottom right'
    },
    'bottom left, overflowing right'
  );

  reference = new Node({
    top: 26,
    bottom: 36,
    left: 51,
    right: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('bottom left', element, reference, container, bounds),
    {
      left: 41,
      top: 1,
      position: 'top right'
    },
    'bottom left overflowing bottom right'
  );

  reference = new Node({
    top: 26,
    bottom: 36,
    left: 0,
    right: 20,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('bottom center', element, reference, container, bounds),
    {
      left: 0,
      top: 1,
      position: 'top center'
    },
    'bottom center, overflowing bottom'
  );

  reference = new Node({
    top: 25,
    bottom: 35,
    left: -1,
    right: 20,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('bottom center', element, reference, container, bounds),
    {
      left: -1,
      top: 40,
      position: 'bottom center'
    },
    'bottom center, overflowing left'
  );

  reference = new Node({
    top: 25,
    bottom: 35,
    left: 61,
    right: 81,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('bottom center', element, reference, container, bounds),
    {
      left: 61,
      top: 40,
      position: 'bottom center'
    },
    'bottom center, overflowing right'
  );

  reference = new Node({
    top: 26,
    bottom: 36,
    left: -1,
    right: 19,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('bottom center', element, reference, container, bounds),
    {
      left: -1,
      top: 1,
      position: 'top center'
    },
    'bottom center, overflowing bottom left'
  );

  reference = new Node({
    top: 26,
    bottom: 36,
    left: 61,
    right: 81,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('bottom center', element, reference, container, bounds),
    {
      left: 61,
      top: 1,
      position: 'top center'
    },
    'bottom center, overflowing bottom right'
  );

  reference = new Node({
    top: -5,
    bottom: 5,
    left: 29,
    right: 49,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left top', element, reference, container, bounds),
    {
      left: 59,
      top: 0,
      position: 'right top'
    },
    'left top, overflowing left'
  );

  reference = new Node({
    top: 36,
    bottom: 46,
    left: 30,
    right: 50,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left top', element, reference, container, bounds),
    {
      left: 0,
      top: 21,
      position: 'left bottom'
    },
    'left top, overflowing bottom'
  );

  reference = new Node({
    top: 36,
    bottom: 46,
    left: 29,
    right: 49,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left top', element, reference, container, bounds),
    {
      left: 59,
      top: 21,
      position: 'right bottom'
    },
    'left top, overflowing bottom left'
  );

  reference = new Node({
    top: 5,
    bottom: 15,
    left: 29,
    right: 49,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left middle', element, reference, container, bounds),
    {
      left: 59,
      top: 0,
      position: 'right middle'
    },
    'left middle, overflowing left'
  );

  reference = new Node({
    top: 4,
    bottom: 14,
    left: 29,
    right: 49,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left middle', element, reference, container, bounds),
    {
      left: 59,
      top: -1,
      position: 'right middle'
    },
    'left middle, overflowing top left'
  );

  reference = new Node({
    top: 46,
    bottom: 56,
    left: 29,
    right: 49,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left middle', element, reference, container, bounds),
    {
      left: 59,
      top: 41,
      position: 'right middle'
    },
    'left middle, overflowing bottom left'
  );

  reference = new Node({
    top: 15,
    bottom: 25,
    left: 29,
    right: 49,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left bottom', element, reference, container, bounds),
    {
      left: 59,
      top: 0,
      position: 'right bottom'
    },
    'left bottom, overflowing left'
  );

  reference = new Node({
    top: 14,
    bottom: 24,
    left: 30,
    right: 50,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left bottom', element, reference, container, bounds),
    {
      left: 0,
      top: 19,
      position: 'left top'
    },
    'left bottom, overflowing top'
  );

  reference = new Node({
    top: 14,
    bottom: 24,
    left: 29,
    right: 49,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getCoords('left bottom', element, reference, container, bounds),
    {
      left: 59,
      top: 19,
      position: 'right top'
    },
    'left bottom, overflowing top left'
  );
});
