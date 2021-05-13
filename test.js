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

class Window {}
class Document {}

global.Window = Window;
global.Document = Document;

test('#getPosition', (t) => {
  const container = new Node({
    top: 10,
    left: 20,
    width: 300,
    height: 150,
    right: 300,
    bottom: 160
  });

  let element;

  element = new Node({ top: 47, left: 99, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'top left');

  element = new Node({ top: 47, left: 100, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'top center');

  element = new Node({ top: 47, left: 201, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'top right');

  element = new Node({ top: 48, left: 99, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'middle left');

  element = new Node({ top: 48, left: 100, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'middle center');

  element = new Node({ top: 48, left: 201, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'middle right');

  element = new Node({ top: 98, left: 99, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'bottom left');

  element = new Node({ top: 98, left: 100, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'bottom center');

  element = new Node({ top: 98, left: 201, width: 40, height: 25 });
  t.is(getPosition(element, container, 3, 3), 'bottom right');
});

test('getCoords', (t) => {
  const offsetParent = new Node({ top: -5, left: -10 });
  const reference = new Node({ top: 25, left: 30, width: 20, height: 10 });
  const element = new Node({ width: 40, height: 30 });
  offsetParent.scrollTop = 0;
  offsetParent.scrollLeft = 0;
  element.offsetParent = offsetParent;

  t.deepEqual(getCoords('top left', element, reference), [40, 0]);
  t.deepEqual(getCoords('top center', element, reference), [30, 0]);
  t.deepEqual(getCoords('top right', element, reference), [20, 0]);
  t.deepEqual(getCoords('right top', element, reference), [60, 30]);
  t.deepEqual(getCoords('right middle', element, reference), [60, 20]);
  t.deepEqual(getCoords('right bottom', element, reference), [60, 10]);
  t.deepEqual(getCoords('bottom left', element, reference), [40, 40]);
  t.deepEqual(getCoords('bottom center', element, reference), [30, 40]);
  t.deepEqual(getCoords('bottom right', element, reference), [20, 40]);
  t.deepEqual(getCoords('left top', element, reference), [0, 30]);
  t.deepEqual(getCoords('left middle', element, reference), [0, 20]);
  t.deepEqual(getCoords('left bottom', element, reference), [0, 10]);
});
