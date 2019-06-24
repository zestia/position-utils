const test = require('ava');
const { position, coords } = require('./index');

function node(rect, scrollLeft = 0, scrollTop = 0) {
  return {
    getBoundingClientRect() {
      return rect;
    },

    scrollTop,
    scrollLeft
  };
}

test('position', t => {
  const container = node({
    width: 180,
    height: 90
  });

  let element;

  element = node({
    top: 13,
    left: 29,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'top left', 'top left');

  element = node({
    top: 14,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'top center', 'top center');

  element = node({
    top: 14,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'top right', 'top right');

  element = node({
    top: 30,
    left: 29,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'middle left');

  element = node({
    top: 30,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'middle center', 'middle center');

  element = node({
    top: 30,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'middle right', 'middle right');

  element = node({
    top: 46,
    left: 29,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'bottom left', 'bottom left');

  element = node({
    top: 46,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'bottom center', 'bottom center');

  element = node({
    top: 46,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(position(element, container, 3, 3), 'bottom right', 'bottom right');
});

test('coords', t => {
  const reference = node({
    top: 20,
    left: 50,
    width: 60,
    height: 30
  });

  const element = node({
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top left', element, reference),
    {
      left: 50,
      top: 10,
      position: 'top left'
    },
    'top left'
  );

  t.deepEqual(
    coords('top center', element, reference),
    {
      left: 70,
      top: 10,
      position: 'top center'
    },
    'top center'
  );

  t.deepEqual(
    coords('top right', element, reference),
    {
      left: 90,
      top: 10,
      position: 'top right'
    },
    'top right'
  );

  t.deepEqual(
    coords('right top', element, reference),
    {
      left: 110,
      top: 20,
      position: 'right top'
    },
    'right top'
  );

  t.deepEqual(
    coords('right middle', element, reference),
    {
      left: 110,
      top: 30,
      position: 'right middle'
    },
    'right middle'
  );

  t.deepEqual(
    coords('right bottom', element, reference),
    {
      left: 110,
      top: 40,
      position: 'right bottom'
    },
    'right bottom'
  );

  t.deepEqual(
    coords('bottom left', element, reference),
    {
      left: 50,
      top: 50,
      position: 'bottom left'
    },
    'bottom left'
  );

  t.deepEqual(
    coords('bottom center', element, reference),
    {
      left: 70,
      top: 50,
      position: 'bottom center'
    },
    'bottom center'
  );

  t.deepEqual(
    coords('bottom right', element, reference),
    {
      left: 90,
      top: 50,
      position: 'bottom right'
    },
    'bottom right'
  );

  t.deepEqual(
    coords('left top', element, reference),
    {
      left: 30,
      top: 20,
      position: 'left top'
    },
    'left top'
  );

  t.deepEqual(
    coords('left middle', element, reference),
    {
      left: 30,
      top: 30,
      position: 'left middle'
    },
    'left middle'
  );

  t.deepEqual(
    coords('left bottom', element, reference),
    {
      left: 30,
      top: 40,
      position: 'left bottom'
    },
    'left bottom'
  );
});

test('coords with container parameter', t => {
  const container = node({}, 10, 5);

  const reference = node({
    top: 20,
    left: 50,
    width: 60,
    height: 30
  });

  const element = node({
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top left', element, reference, container),
    {
      left: 60,
      top: 15,
      position: 'top left'
    },
    'top left'
  );

  t.deepEqual(
    coords('top center', element, reference, container),
    {
      left: 80,
      top: 15,
      position: 'top center'
    },
    'top center'
  );

  t.deepEqual(
    coords('top right', element, reference, container),
    {
      left: 100,
      top: 15,
      position: 'top right'
    },
    'top right'
  );

  t.deepEqual(
    coords('right top', element, reference, container),
    {
      left: 120,
      top: 25,
      position: 'right top'
    },
    'right top'
  );

  t.deepEqual(
    coords('right middle', element, reference, container),
    {
      left: 120,
      top: 35,
      position: 'right middle'
    },
    'right middle'
  );

  t.deepEqual(
    coords('right bottom', element, reference, container),
    {
      left: 120,
      top: 45,
      position: 'right bottom'
    },
    'right bottom'
  );

  t.deepEqual(
    coords('bottom left', element, reference, container),
    {
      left: 60,
      top: 55,
      position: 'bottom left'
    },
    'bottom left'
  );

  t.deepEqual(
    coords('bottom center', element, reference, container),
    {
      left: 80,
      top: 55,
      position: 'bottom center'
    },
    'bottom center'
  );

  t.deepEqual(
    coords('bottom right', element, reference, container),
    {
      left: 100,
      top: 55,
      position: 'bottom right'
    },
    'bottom right'
  );

  t.deepEqual(
    coords('left top', element, reference, container),
    {
      left: 40,
      top: 25,
      position: 'left top'
    },
    'left top'
  );

  t.deepEqual(
    coords('left middle', element, reference, container),
    {
      left: 40,
      top: 35,
      position: 'left middle'
    },
    'left middle'
  );

  t.deepEqual(
    coords('left bottom', element, reference, container),
    {
      left: 40,
      top: 45,
      position: 'left bottom'
    },
    'left bottom'
  );
});

test('coords with adjust parameter', t => {
  const container = node(
    {
      top: 0,
      left: 0,
      right: 100,
      bottom: 70
    },
    10,
    5
  );

  const element = node({
    width: 40,
    height: 30
  });

  let reference;

  reference = node({
    top: 29,
    left: 0,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top left', element, reference, container, true),
    {
      left: 10,
      top: 44,
      position: 'bottom left'
    },
    'top left, overflowing top'
  );

  reference = node({
    top: 30,
    left: 61,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top left', element, reference, container, true),
    {
      left: 51,
      top: 5,
      position: 'top right'
    },
    'top left, overflowing right'
  );

  reference = node({
    top: 29,
    left: 61,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top left', element, reference, container, true),
    {
      left: 51,
      top: 44,
      position: 'bottom right'
    },
    'top left, overflowing top right'
  );

  reference = node({
    top: 29,
    left: 10,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container, true),
    {
      left: 10,
      top: 44,
      position: 'bottom center'
    },
    'top center, overflowing top'
  );

  reference = node({
    top: 30,
    left: 9,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container, true),
    {
      left: 9,
      top: 5,
      position: 'top center'
    },
    'top center, overflowing left'
  );

  reference = node({
    top: 30,
    left: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container, true),
    {
      left: 71,
      top: 5,
      position: 'top center'
    },
    'top center, overflowing right'
  );

  reference = node({
    top: 29,
    left: 9,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container, true),
    {
      left: 9,
      top: 44,
      position: 'bottom center'
    },
    'top center, overflowing top left'
  );

  reference = node({
    top: 29,
    left: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top center', element, reference, container, true),
    {
      left: 71,
      top: 44,
      position: 'bottom center'
    },
    'top center, overflowing top right'
  );

  reference = node({
    top: 29,
    left: 20,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top right', element, reference, container, true),
    {
      left: 10,
      top: 44,
      position: 'bottom right'
    },
    'top right, overflowing top'
  );

  reference = node({
    top: 30,
    left: 19,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top right', element, reference, container, true),
    {
      left: 29,
      top: 5,
      position: 'top left'
    },
    'top right, overflowing left'
  );

  reference = node({
    top: 29,
    left: 19,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('top right', element, reference, container, true),
    {
      left: 29,
      top: 44,
      position: 'bottom left'
    },
    'top right, overflowing top left'
  );

  reference = node({
    top: 0,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right top', element, reference, container, true),
    {
      left: 11,
      top: 5,
      position: 'left top'
    },
    'right top, overflowing right'
  );

  reference = node({
    top: 41,
    left: 40,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right top', element, reference, container, true),
    {
      left: 70,
      top: 26,
      position: 'right bottom'
    },
    'right top, overflowing bottom'
  );

  reference = node({
    top: 41,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right top', element, reference, container, true),
    {
      left: 11,
      top: 26,
      position: 'left bottom'
    },
    'right top, overflowing bottom right'
  );

  reference = node({
    top: 10,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right middle', element, reference, container, true),
    {
      left: 11,
      top: 5,
      position: 'left middle'
    },
    'right middle, overflowing right'
  );

  reference = node({
    top: 9,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right middle', element, reference, container, true),
    {
      left: 11,
      top: 4,
      position: 'left middle'
    },
    'right middle, overflowing top right'
  );

  reference = node({
    top: 51,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right middle', element, reference, container, true),
    {
      left: 11,
      top: 46,
      position: 'left middle'
    },
    'right middle, overflowing bottom right'
  );

  reference = node({
    top: 20,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right bottom', element, reference, container, true),
    {
      left: 11,
      top: 5,
      position: 'left bottom'
    },
    'right bottom, overflowing right'
  );

  reference = node({
    top: 19,
    left: 40,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right bottom', element, reference, container, true),
    {
      left: 70,
      top: 24,
      position: 'right top'
    },
    'right bottom, overflowing top'
  );

  reference = node({
    top: 19,
    left: 41,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('right bottom', element, reference, container, true),
    {
      left: 11,
      top: 24,
      position: 'left top'
    },
    'right bottom, overflowing top right'
  );

  reference = node({
    top: 31,
    left: 0,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('bottom left', element, reference, container, true),
    {
      left: 10,
      top: 6,
      position: 'top left'
    },
    'bottom left, overflowing bottom'
  );

  reference = node({
    top: 30,
    left: 61,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('bottom left', element, reference, container, true),
    {
      left: 51,
      top: 45,
      position: 'bottom right'
    },
    'bottom left, overflowing right'
  );

  reference = node({
    top: 31,
    left: 61,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('bottom left', element, reference, container, true),
    {
      left: 51,
      top: 6,
      position: 'top right'
    },
    'bottom left overflowing bottom right'
  );

  reference = node({
    top: 31,
    left: 10,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('bottom center', element, reference, container, true),
    {
      left: 10,
      top: 6,
      position: 'top center'
    },
    'bottom center, overflowing bottom'
  );

  reference = node({
    top: 30,
    left: 9,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('bottom center', element, reference, container, true),
    {
      left: 9,
      top: 45,
      position: 'bottom center'
    },
    'bottom center, overflowing left'
  );

  reference = node({
    top: 30,
    left: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('bottom center', element, reference, container, true),
    {
      left: 71,
      top: 45,
      position: 'bottom center'
    },
    'bottom center, overflowing right'
  );

  reference = node({
    top: 31,
    left: 9,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('bottom center', element, reference, container, true),
    {
      left: 9,
      top: 6,
      position: 'top center'
    },
    'bottom center, overflowing bottom left'
  );

  reference = node({
    top: 31,
    left: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('bottom center', element, reference, container, true),
    {
      left: 71,
      top: 6,
      position: 'top center'
    },
    'bottom center, overflowing bottom right'
  );

  reference = node({
    top: 0,
    left: 39,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left top', element, reference, container, true),
    {
      left: 69,
      top: 5,
      position: 'right top'
    },
    'left top, overflowing left'
  );

  reference = node({
    top: 41,
    left: 40,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left top', element, reference, container, true),
    {
      left: 10,
      top: 26,
      position: 'left bottom'
    },
    'left top, overflowing bottom'
  );

  reference = node({
    top: 41,
    left: 39,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left top', element, reference, container, true),
    {
      left: 69,
      top: 26,
      position: 'right bottom'
    },
    'left top, overflowing bottom left'
  );

  reference = node({
    top: 10,
    left: 39,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left middle', element, reference, container, true),
    {
      left: 69,
      top: 5,
      position: 'right middle'
    },
    'left middle, overflowing left'
  );

  reference = node({
    top: 9,
    left: 39,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left middle', element, reference, container, true),
    {
      left: 69,
      top: 4,
      position: 'right middle'
    },
    'left middle, overflowing top left'
  );

  reference = node({
    top: 51,
    left: 39,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left middle', element, reference, container, true),
    {
      left: 69,
      top: 46,
      position: 'right middle'
    },
    'left middle, overflowing bottom left'
  );

  reference = node({
    top: 20,
    left: 39,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left bottom', element, reference, container, true),
    {
      left: 69,
      top: 5,
      position: 'right bottom'
    },
    'left bottom, overflowing left'
  );

  reference = node({
    top: 19,
    left: 40,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left bottom', element, reference, container, true),
    {
      left: 10,
      top: 24,
      position: 'left top'
    },
    'left bottom, overflowing top'
  );

  reference = node({
    top: 19,
    left: 39,
    width: 20,
    height: 10
  });

  t.deepEqual(
    coords('left bottom', element, reference, container, true),
    {
      left: 69,
      top: 24,
      position: 'right top'
    },
    'left bottom, overflowing top left'
  );
});
