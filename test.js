const test = require('ava');
const { getPosition, getCoords } = require('./index');

class Node {
  constructor(rect, offsetParent) {
    this.rect = rect;
    this.offsetParent = offsetParent;
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
  const container = new Window({ innerWidth: 300, innerHeight: 150 });

  let element;

  element = new Node({ top: 37, left: 79, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'top left', 'top left');

  element = new Node({ top: 37, left: 80, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'top center', 'top center');

  element = new Node({ top: 37, left: 181, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'top right', 'top right');

  element = new Node({ top: 38, left: 79, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'middle left');

  element = new Node({ top: 38, left: 80, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'middle center', 'middle center');

  element = new Node({ top: 38, left: 181, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'middle right', 'middle right');

  element = new Node({ top: 88, left: 79, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'bottom left', 'bottom left');

  element = new Node({ top: 88, left: 80, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'bottom center', 'bottom center');

  element = new Node({ top: 88, left: 181, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'bottom right', 'bottom right');
});

test('getCoords', t => {
  const offsetParent = new Node({ top: -5, left: -10 });
  const reference = new Node({ top: 25, left: 30, width: 20, height: 10 });
  const element = new Node({ width: 40, height: 30 }, offsetParent);

  t.deepEqual(
    getCoords('top left', element, reference),
    { left: 40, top: 0, position: 'top left' },
    'top left'
  );

  t.deepEqual(
    getCoords('top center', element, reference),
    { left: 30, top: 0, position: 'top center' },
    'top center'
  );

  t.deepEqual(
    getCoords('top right', element, reference),
    { left: 20, top: 0, position: 'top right' },
    'top right'
  );

  t.deepEqual(
    getCoords('right top', element, reference),
    { left: 60, top: 30, position: 'right top' },
    'right top'
  );

  t.deepEqual(
    getCoords('right middle', element, reference),
    { left: 60, top: 20, position: 'right middle' },
    'right middle'
  );

  t.deepEqual(
    getCoords('right bottom', element, reference),
    { left: 60, top: 10, position: 'right bottom' },
    'right bottom'
  );

  t.deepEqual(
    getCoords('bottom left', element, reference),
    { left: 40, top: 40, position: 'bottom left' },
    'bottom left'
  );
  t.deepEqual(
    getCoords('bottom center', element, reference),
    { left: 30, top: 40, position: 'bottom center' },
    'bottom center'
  );

  t.deepEqual(
    getCoords('bottom right', element, reference),
    { left: 20, top: 40, position: 'bottom right' },
    'bottom right'
  );

  t.deepEqual(
    getCoords('left top', element, reference),
    { left: 0, top: 30, position: 'left top' },
    'left top'
  );

  t.deepEqual(
    getCoords('left middle', element, reference),
    { left: 0, top: 20, position: 'left middle' },
    'left middle'
  );

  t.deepEqual(
    getCoords('left bottom', element, reference),
    { left: 0, top: 10, position: 'left bottom' },
    'left bottom'
  );
});

test('getCoords with boundary container', t => {
  const offsetParent = new Node({ top: -5, left: -10 });
  const container = new Node({ top: 0, left: 0, right: 100, bottom: 70 });
  const element = new Node({ width: 40, height: 30 }, offsetParent);

  let reference;

  reference = new Node({ top: 29, left: 0, width: 20, height: 10 });

  t.deepEqual(
    getCoords('top left', element, reference, container),
    { left: 10, top: 44, position: 'bottom left' },
    'top left, overflowing top'
  );

  reference = new Node({ top: 30, left: 61, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top left', element, reference, container),
    { left: 51, top: 5, position: 'top right' },
    'top left, overflowing right'
  );

  reference = new Node({ top: 29, left: 61, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top left', element, reference, container),
    { left: 51, top: 44, position: 'bottom right' },
    'top left, overflowing top right'
  );

  reference = new Node({ top: 29, left: 10, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top center', element, reference, container),
    { left: 10, top: 44, position: 'bottom center' },
    'top center, overflowing top'
  );

  reference = new Node({ top: 30, left: 9, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top center', element, reference, container),
    { left: 9, top: 5, position: 'top center' },
    'top center, overflowing left'
  );

  reference = new Node({ top: 30, left: 71, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top center', element, reference, container),
    { left: 71, top: 5, position: 'top center' },
    'top center, overflowing right'
  );

  reference = new Node({ top: 29, left: 9, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top center', element, reference, container),
    { left: 9, top: 44, position: 'bottom center' },
    'top center, overflowing top left'
  );

  reference = new Node({ top: 24, left: 61, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top center', element, reference, container),
    { left: 61, top: 39, position: 'bottom center' },
    'top center, overflowing top right'
  );

  reference = new Node({ top: 29, left: 20, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top right', element, reference, container),
    { left: 10, top: 44, position: 'bottom right' },
    'top right, overflowing top'
  );

  reference = new Node({ top: 30, left: 19, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top right', element, reference, container),
    { left: 29, top: 5, position: 'top left' },
    'top right, overflowing left'
  );

  reference = new Node({ top: 29, left: 19, width: 20, height: 10 });
  t.deepEqual(
    getCoords('top right', element, reference, container),
    { left: 29, top: 44, position: 'bottom left' },
    'top right, overflowing top left'
  );

  reference = new Node({ top: 0, left: 41, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right top', element, reference, container),
    { left: 11, top: 5, position: 'left top' },
    'right top, overflowing right'
  );

  reference = new Node({ top: 41, left: 40, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right top', element, reference, container),
    { left: 70, top: 26, position: 'right bottom' },
    'right top, overflowing bottom'
  );

  reference = new Node({ top: 41, left: 41, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right top', element, reference, container),
    { left: 11, top: 26, position: 'left bottom' },
    'right top, overflowing bottom right'
  );

  reference = new Node({ top: 10, left: 41, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right middle', element, reference, container),
    { left: 11, top: 5, position: 'left middle' },
    'right middle, overflowing right'
  );

  reference = new Node({ top: 9, left: 41, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right middle', element, reference, container),
    { left: 11, top: 4, position: 'left middle' },
    'right middle, overflowing top right'
  );

  reference = new Node({ top: 51, left: 41, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right middle', element, reference, container),
    { left: 11, top: 46, position: 'left middle' },
    'right middle, overflowing bottom right'
  );

  reference = new Node({ top: 20, left: 41, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right bottom', element, reference, container),
    { left: 11, top: 5, position: 'left bottom' },
    'right bottom, overflowing right'
  );

  reference = new Node({ top: 19, left: 40, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right bottom', element, reference, container),
    { left: 70, top: 24, position: 'right top' },
    'right bottom, overflowing top'
  );

  reference = new Node({ top: 19, left: 41, width: 20, height: 10 });
  t.deepEqual(
    getCoords('right bottom', element, reference, container),
    { left: 11, top: 24, position: 'left top' },
    'right bottom, overflowing top right'
  );

  reference = new Node({ top: 31, left: 0, width: 20, height: 10 });
  t.deepEqual(
    getCoords('bottom left', element, reference, container),
    { left: 10, top: 6, position: 'top left' },
    'bottom left, overflowing bottom'
  );

  reference = new Node({ top: 30, left: 61, width: 20, height: 10 });
  t.deepEqual(
    getCoords('bottom left', element, reference, container),
    { left: 51, top: 45, position: 'bottom right' },
    'bottom left, overflowing right'
  );

  reference = new Node({ top: 31, left: 61, width: 20, height: 10 });
  t.deepEqual(
    getCoords('bottom left', element, reference, container),
    { left: 51, top: 6, position: 'top right' },
    'bottom left overflowing bottom right'
  );

  reference = new Node({ top: 31, left: 10, width: 20, height: 10 });
  t.deepEqual(
    getCoords('bottom center', element, reference, container),
    { left: 10, top: 6, position: 'top center' },
    'bottom center, overflowing bottom'
  );

  reference = new Node({ top: 30, left: 9, width: 20, height: 10 });
  t.deepEqual(
    getCoords('bottom center', element, reference, container),
    { left: 9, top: 45, position: 'bottom center' },
    'bottom center, overflowing left'
  );

  reference = new Node({ top: 30, left: 71, width: 20, height: 10 });
  t.deepEqual(
    getCoords('bottom center', element, reference, container),
    { left: 71, top: 45, position: 'bottom center' },
    'bottom center, overflowing right'
  );

  reference = new Node({ top: 31, left: 9, width: 20, height: 10 });
  t.deepEqual(
    getCoords('bottom center', element, reference, container),
    { left: 9, top: 6, position: 'top center' },
    'bottom center, overflowing bottom left'
  );

  reference = new Node({ top: 31, left: 71, width: 20, height: 10 });
  t.deepEqual(
    getCoords('bottom center', element, reference, container),
    { left: 71, top: 6, position: 'top center' },
    'bottom center, overflowing bottom right'
  );

  reference = new Node({ top: 0, left: 39, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left top', element, reference, container),
    { left: 69, top: 5, position: 'right top' },
    'left top, overflowing left'
  );

  reference = new Node({ top: 41, left: 40, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left top', element, reference, container),
    { left: 10, top: 26, position: 'left bottom' },
    'left top, overflowing bottom'
  );

  reference = new Node({ top: 41, left: 39, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left top', element, reference, container),
    { left: 69, top: 26, position: 'right bottom' },
    'left top, overflowing bottom left'
  );

  reference = new Node({ top: 10, left: 39, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left middle', element, reference, container),
    { left: 69, top: 5, position: 'right middle' },
    'left middle, overflowing left'
  );

  reference = new Node({ top: 9, left: 39, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left middle', element, reference, container),
    { left: 69, top: 4, position: 'right middle' },
    'left middle, overflowing top left'
  );

  reference = new Node({ top: 51, left: 39, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left middle', element, reference, container),
    { left: 69, top: 46, position: 'right middle' },
    'left middle, overflowing bottom left'
  );

  reference = new Node({ top: 20, left: 39, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left bottom', element, reference, container),
    { left: 69, top: 5, position: 'right bottom' },
    'left bottom, overflowing left'
  );

  reference = new Node({ top: 19, left: 40, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left bottom', element, reference, container),
    { left: 10, top: 24, position: 'left top' },
    'left bottom, overflowing top'
  );

  reference = new Node({ top: 19, left: 39, width: 20, height: 10 });
  t.deepEqual(
    getCoords('left bottom', element, reference, container),
    { left: 69, top: 24, position: 'right top' },
    'left bottom, overflowing top left'
  );
});
