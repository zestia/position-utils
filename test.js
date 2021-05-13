const test = require('ava');
const { getPosition, getCoords } = require('./index');

class Node {
  constructor(rect) {
    this.rect = rect;
    this.scrollTop = 0;
    this.scrollLeft = 0;
  }

  getBoundingClientRect() {
    return this.rect;
  }
}

class Window {
  constructor(width, height) {
    this.innerWidth = width;
    this.innerHeight = height;
  }
}

class Document {
  constructor(node) {
    this.documentElement = node;
  }
}

global.Window = Window;
global.Document = Document;

test('getPosition', (t) => {
  const container = new Node({
    top: 10,
    left: 20,
    width: 300,
    height: 150,
    right: 300,
    bottom: 160
  });

  const window = new Window(300, 150);

  const document = new Document(container);

  const topLeftElement = new Node({
    top: 47,
    left: 99,
    width: 40,
    height: 25
  });

  const topCenterElement = new Node({
    top: 47,
    left: 100,
    width: 40,
    height: 25
  });

  const topRightElement = new Node({
    top: 47,
    left: 201,
    width: 40,
    height: 25
  });

  const middleLeftElement = new Node({
    top: 48,
    left: 99,
    width: 40,
    height: 25
  });

  const middleCenterElement = new Node({
    top: 48,
    left: 100,
    width: 40,
    height: 25
  });

  const middleRightElement = new Node({
    top: 48,
    left: 201,
    width: 40,
    height: 25
  });

  const bottomLeftElement = new Node({
    top: 98,
    left: 99,
    width: 40,
    height: 25
  });

  const bottomCenterElement = new Node({
    top: 98,
    left: 100,
    width: 40,
    height: 25
  });

  const bottomRightElement = new Node({
    top: 98,
    left: 201,
    width: 40,
    height: 25
  });

  // All possible positions of element inside container using basic grid

  t.is(getPosition(topLeftElement, container, 3, 3), 'top left');
  t.is(getPosition(topCenterElement, container, 3, 3), 'top center');
  t.is(getPosition(topRightElement, container, 3, 3), 'top right');
  t.is(getPosition(middleLeftElement, container, 3, 3), 'middle left');
  t.is(getPosition(middleCenterElement, container, 3, 3), 'middle center');
  t.is(getPosition(middleRightElement, container, 3, 3), 'middle right');
  t.is(getPosition(bottomLeftElement, container, 3, 3), 'bottom left');
  t.is(getPosition(bottomCenterElement, container, 3, 3), 'bottom center');
  t.is(getPosition(bottomRightElement, container, 3, 3), 'bottom right');

  // Accounts for a different grid

  t.is(getPosition(topRightElement, container, 6, 3), 'top center');
  t.is(getPosition(topRightElement, container, 3, 6), 'middle right');

  // Accounts for special arguments (where a container is derived)

  t.is(getPosition(bottomRightElement, window, 3, 3), 'bottom right');
  t.is(getPosition(bottomRightElement, document, 3, 3), 'bottom right');
});

test('getCoords', (t) => {
  const reference = new Node({
    top: 25,
    left: 30,
    width: 20,
    height: 10
  });

  const element = new Node({
    width: 40,
    height: 30
  });

  const container = new Node({
    top: 0,
    left: 0
  });

  element.offsetParent = container;

  // All possible positions of the element near the reference

  t.deepEqual(getCoords('top left', element, reference), [30, -5]);
  t.deepEqual(getCoords('top center', element, reference), [20, -5]);
  t.deepEqual(getCoords('top right', element, reference), [10, -5]);
  t.deepEqual(getCoords('right top', element, reference), [50, 25]);
  t.deepEqual(getCoords('right middle', element, reference), [50, 15]);
  t.deepEqual(getCoords('right bottom', element, reference), [50, 5]);
  t.deepEqual(getCoords('bottom left', element, reference), [30, 35]);
  t.deepEqual(getCoords('bottom center', element, reference), [20, 35]);
  t.deepEqual(getCoords('bottom right', element, reference), [10, 35]);
  t.deepEqual(getCoords('left top', element, reference), [-10, 25]);
  t.deepEqual(getCoords('left middle', element, reference), [-10, 15]);
  t.deepEqual(getCoords('left bottom', element, reference), [-10, 5]);

  // Accounts for the position of the reference's container

  container.rect.top = -5;
  container.rect.left = -10;

  t.deepEqual(getCoords('bottom right', element, reference), [20, 40]);

  // Accounts for scrolling of the reference's container

  container.scrollTop = 4;
  container.scrollLeft = 6;

  t.deepEqual(getCoords('bottom right', element, reference), [26, 44]);
});
