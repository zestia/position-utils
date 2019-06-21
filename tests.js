const test = require('ava');
const { position, coords } = require('./index');

function node(rect, scrollLeft = 0, scrollTop = 0) {
  return {
    getBoundingClientRect() {
      return rect;
    },
    ownerDocument: { scrollingElement: { scrollTop, scrollLeft } }
  };
}

test('position', t => {
  const container = node({ width: 180, height: 90 });

  let element;

  element = node({ top: 13, left: 29, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'top left');

  element = node({ top: 14, left: 60, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'top center');

  element = node({ top: 14, left: 91, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'top right');

  element = node({ top: 30, left: 29, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'middle left');

  element = node({ top: 30, left: 60, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'middle center');

  element = node({ top: 30, left: 91, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'middle right');

  element = node({ top: 46, left: 29, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'bottom left');

  element = node({ top: 46, left: 60, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'bottom center');

  element = node({ top: 46, left: 91, width: 60, height: 30 });

  t.is(position(element, container, 3, 3), 'bottom right');
});

test('coords', t => {
  const reference = node({ top: 20, left: 50, width: 60, height: 30 });

  const element = node({ top: 13, left: 29, width: 20, height: 10 }, 10, 5);

  t.deepEqual(coords('top left', element, reference), { left: 60, top: 15 });

  t.deepEqual(coords('top center', element, reference), { left: 80, top: 15 });

  t.deepEqual(coords('top right', element, reference), { left: 100, top: 15 });

  t.deepEqual(coords('right top', element, reference), { left: 120, top: 25 });

  t.deepEqual(coords('right middle', element, reference), { left: 120, top: 35 });

  t.deepEqual(coords('right bottom', element, reference), { left: 120, top: 45 });

  t.deepEqual(coords('bottom left', element, reference), { left: 60, top: 55 });

  t.deepEqual(coords('bottom center', element, reference), { left: 80, top: 55 });

  t.deepEqual(coords('bottom right', element, reference), { left: 100, top: 55 });

  t.deepEqual(coords('left top', element, reference), { left: 40, top: 25 });

  t.deepEqual(coords('left middle', element, reference), { left: 40, top: 35 });

  t.deepEqual(coords('left bottom', element, reference), { left: 40, top: 45 });
});
