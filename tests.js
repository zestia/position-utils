const test = require('ava');
const { getPositionInViewport, getPositionCoords } = require('./index');

function node(rect, documentElement) {
  return {
    getBoundingClientRect() {
      return rect;
    },

    ownerDocument: {
      documentElement
    }
  };
}

test('getPositionInViewport', t => {
  const doc = node({
    top: -10,
    bottom: 330,
    left: -20,
    right: 580,
    width: 600,
    height: 350
  });

  doc.clientWidth = 300;
  doc.clientHeight = 150;

  let element;

  element = node(
    {
      top: 37,
      left: 79,
      bottom: 62,
      right: 119,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'top left', 'top left');

  element = node(
    {
      top: 37,
      left: 80,
      bottom: 62,
      right: 120,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'top center', 'top center');

  element = node(
    {
      top: 37,
      left: 181,
      bottom: 62,
      right: 221,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'top right', 'top right');

  element = node(
    {
      top: 38,
      left: 79,
      bottom: 63,
      right: 119,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'middle left');

  element = node(
    {
      top: 38,
      left: 80,
      bottom: 63,
      right: 120,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'middle center', 'middle center');

  element = node(
    {
      top: 38,
      left: 181,
      bottom: 63,
      right: 221,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'middle right', 'middle right');

  element = node(
    {
      top: 88,
      left: 79,
      bottom: 113,
      right: 119,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'bottom left', 'bottom left');

  element = node(
    {
      top: 88,
      left: 80,
      bottom: 113,
      right: 120,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'bottom center', 'bottom center');

  element = node(
    {
      top: 88,
      left: 181,
      bottom: 113,
      right: 221,
      width: 40,
      height: 25
    },
    doc
  );

  t.is(getPositionInViewport(element, 3, 3), 'bottom right', 'bottom right');
});

test('getPositionCoords', t => {
  const container = node({
    top: -5,
    bottom: 65,
    left: -10,
    right: 90,
    width: 100,
    height: 70
  });

  const reference = node({
    top: 25,
    bottom: 35,
    left: 30,
    right: 50,
    width: 20,
    height: 10
  });

  const element = node({
    width: 40,
    height: 30
  });

  t.deepEqual(
    getPositionCoords('top left', element, reference, container),
    {
      left: 40,
      top: 0,
      position: 'top left'
    },
    'top left'
  );

  t.deepEqual(
    getPositionCoords('top center', element, reference, container),
    {
      left: 30,
      top: 0,
      position: 'top center'
    },
    'top center'
  );

  t.deepEqual(
    getPositionCoords('top right', element, reference, container),
    {
      left: 20,
      top: 0,
      position: 'top right'
    },
    'top right'
  );

  t.deepEqual(
    getPositionCoords('right top', element, reference, container),
    {
      left: 60,
      top: 30,
      position: 'right top'
    },
    'right top'
  );

  t.deepEqual(
    getPositionCoords('right middle', element, reference, container),
    {
      left: 60,
      top: 20,
      position: 'right middle'
    },
    'right middle'
  );

  t.deepEqual(
    getPositionCoords('right bottom', element, reference, container),
    {
      left: 60,
      top: 10,
      position: 'right bottom'
    },
    'right bottom'
  );

  t.deepEqual(
    getPositionCoords('bottom left', element, reference, container),
    {
      left: 40,
      top: 40,
      position: 'bottom left'
    },
    'bottom left'
  );

  t.deepEqual(
    getPositionCoords('bottom center', element, reference, container),
    {
      left: 30,
      top: 40,
      position: 'bottom center'
    },
    'bottom center'
  );

  t.deepEqual(
    getPositionCoords('bottom right', element, reference, container),
    {
      left: 20,
      top: 40,
      position: 'bottom right'
    },
    'bottom right'
  );

  t.deepEqual(
    getPositionCoords('left top', element, reference, container),
    {
      left: 0,
      top: 30,
      position: 'left top'
    },
    'left top'
  );

  t.deepEqual(
    getPositionCoords('left middle', element, reference, container),
    {
      left: 0,
      top: 20,
      position: 'left middle'
    },
    'left middle'
  );

  t.deepEqual(
    getPositionCoords('left bottom', element, reference, container),
    {
      left: 0,
      top: 10,
      position: 'left bottom'
    },
    'left bottom'
  );
});

test('coords with adjust parameter', t => {
  const container = node({
    top: -5,
    bottom: 65,
    left: -10,
    right: 90,
    width: 100,
    height: 70
  });

  const element = node({
    width: 40,
    height: 30
  });

  let reference;

  reference = node({
    top: 24,
    bottom: 34,
    left: -10,
    right: 10,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getPositionCoords('top left', element, reference, container, true),
    {
      left: 0,
      top: 39,
      position: 'bottom left'
    },
    'top left, overflowing top'
  );

  reference = node({
    top: 25,
    bottom: 35,
    left: 51,
    right: 61,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getPositionCoords('top left', element, reference, container, true),
    {
      left: 41,
      top: 0,
      position: 'top right'
    },
    'top left, overflowing right'
  );

  reference = node({
    top: 24,
    bottom: 34,
    left: 51,
    right: 61,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getPositionCoords('top left', element, reference, container, true),
    {
      left: 41,
      top: 39,
      position: 'bottom right'
    },
    'top left, overflowing top right'
  );
  //
  // reference = node(
  //   {
  //     top: 29,
  //     left: 30,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top center', element, reference, container),
  //   {
  //     left: 10,
  //     top: 44,
  //     position: 'bottom center'
  //   },
  //   'top center, overflowing top'
  // );
  //
  // reference = node(
  //   {
  //     top: 29,
  //     left: 0,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top left', element, reference, container),
  //   {
  //     left: 0,
  //     top: 39,
  //     position: 'bottom left'
  //   },
  //   'top left, overflowing top'
  // );
  //
  // reference = node(
  //   {
  //     top: 30,
  //     left: 61,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top left', element, reference, container),
  //   {
  //     left: 41,
  //     top: 0,
  //     position: 'top right'
  //   },
  //   'top left, overflowing right'
  // );
  //
  // reference = node(
  //   {
  //     top: 29,
  //     left: 61,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top left', element, reference, container),
  //   {
  //     left: 41,
  //     top: 39,
  //     position: 'bottom right'
  //   },
  //   'top left, overflowing top right'
  // );
  //
  // reference = node(
  //   {
  //     top: 29,
  //     left: 10,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top center', element, reference, container),
  //   {
  //     left: 0,
  //     top: 39,
  //     position: 'bottom center'
  //   },
  //   'top center, overflowing top'
  // );
  //
  // reference = node(
  //   {
  //     top: 30,
  //     left: 9,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top center', element, reference, container),
  //   {
  //     left: -1,
  //     top: 0,
  //     position: 'top center'
  //   },
  //   'top center, overflowing left'
  // );
  //
  // reference = node(
  //   {
  //     top: 30,
  //     left: 71,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top center', element, reference, container),
  //   {
  //     left: 61,
  //     top: 0,
  //     position: 'top center'
  //   },
  //   'top center, overflowing right'
  // );
  //
  // reference = node(
  //   {
  //     top: 29,
  //     left: 9,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top center', element, reference, container),
  //   {
  //     left: -1,
  //     top: 39,
  //     position: 'bottom center'
  //   },
  //   'top center, overflowing top left'
  // );
  //
  // reference = node(
  //   {
  //     top: 29,
  //     left: 71,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top center', element, reference, container),
  //   {
  //     left: 61,
  //     top: 39,
  //     position: 'bottom center'
  //   },
  //   'top center, overflowing top right'
  // );
  //
  // reference = node(
  //   {
  //     top: 29,
  //     left: 20,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top right', element, reference, container),
  //   {
  //     left: 0,
  //     top: 39,
  //     position: 'bottom right'
  //   },
  //   'top right, overflowing top'
  // );
  //
  // reference = node(
  //   {
  //     top: 30,
  //     left: 19,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top right', element, reference, container),
  //   {
  //     left: 19,
  //     top: 0,
  //     position: 'top left'
  //   },
  //   'top right, overflowing left'
  // );
  //
  // reference = node(
  //   {
  //     top: 29,
  //     left: 19,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('top right', element, reference, container),
  //   {
  //     left: 19,
  //     top: 39,
  //     position: 'bottom left'
  //   },
  //   'top right, overflowing top left'
  // );
  //
  // reference = node(
  //   {
  //     top: 0,
  //     left: 41,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right top', element, reference, container),
  //   {
  //     left: 1,
  //     top: 0,
  //     position: 'left top'
  //   },
  //   'right top, overflowing right'
  // );
  //
  // reference = node(
  //   {
  //     top: 41,
  //     left: 40,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right top', element, reference, container),
  //   {
  //     left: 60,
  //     top: 21,
  //     position: 'right bottom'
  //   },
  //   'right top, overflowing bottom'
  // );
  //
  // reference = node(
  //   {
  //     top: 41,
  //     left: 41,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right top', element, reference, container),
  //   {
  //     left: 1,
  //     top: 21,
  //     position: 'left bottom'
  //   },
  //   'right top, overflowing bottom right'
  // );
  //
  // reference = node(
  //   {
  //     top: 10,
  //     left: 41,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right middle', element, reference, container),
  //   {
  //     left: 1,
  //     top: 0,
  //     position: 'left middle'
  //   },
  //   'right middle, overflowing right'
  // );
  //
  // reference = node(
  //   {
  //     top: 9,
  //     left: 41,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right middle', element, reference, container),
  //   {
  //     left: 1,
  //     top: -1,
  //     position: 'left middle'
  //   },
  //   'right middle, overflowing top right'
  // );
  //
  // reference = node(
  //   {
  //     top: 51,
  //     left: 41,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right middle', element, reference, container),
  //   {
  //     left: 1,
  //     top: 41,
  //     position: 'left middle'
  //   },
  //   'right middle, overflowing bottom right'
  // );
  //
  // reference = node(
  //   {
  //     top: 20,
  //     left: 41,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right bottom', element, reference, container),
  //   {
  //     left: 1,
  //     top: 0,
  //     position: 'left bottom'
  //   },
  //   'right bottom, overflowing right'
  // );
  //
  // reference = node(
  //   {
  //     top: 19,
  //     left: 40,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right bottom', element, reference, container),
  //   {
  //     left: 60,
  //     top: 19,
  //     position: 'right top'
  //   },
  //   'right bottom, overflowing top'
  // );
  //
  // reference = node(
  //   {
  //     top: 19,
  //     left: 41,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('right bottom', element, reference, container),
  //   {
  //     left: 1,
  //     top: 19,
  //     position: 'left top'
  //   },
  //   'right bottom, overflowing top right'
  // );
  //
  // reference = node(
  //   {
  //     top: 31,
  //     left: 0,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('bottom left', element, reference, container),
  //   {
  //     left: 0,
  //     top: 1,
  //     position: 'top left'
  //   },
  //   'bottom left, overflowing bottom'
  // );
  //
  // reference = node(
  //   {
  //     top: 30,
  //     left: 61,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('bottom left', element, reference, container),
  //   {
  //     left: 41,
  //     top: 40,
  //     position: 'bottom right'
  //   },
  //   'bottom left, overflowing right'
  // );
  //
  // reference = node(
  //   {
  //     top: 31,
  //     left: 61,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('bottom left', element, reference, container),
  //   {
  //     left: 41,
  //     top: 1,
  //     position: 'top right'
  //   },
  //   'bottom left overflowing bottom right'
  // );
  //
  // reference = node(
  //   {
  //     top: 31,
  //     left: 10,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('bottom center', element, reference, container),
  //   {
  //     left: 0,
  //     top: 1,
  //     position: 'top center'
  //   },
  //   'bottom center, overflowing bottom'
  // );
  //
  // reference = node(
  //   {
  //     top: 30,
  //     left: 9,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('bottom center', element, reference, container),
  //   {
  //     left: -1,
  //     top: 40,
  //     position: 'bottom center'
  //   },
  //   'bottom center, overflowing left'
  // );
  //
  // reference = node(
  //   {
  //     top: 30,
  //     left: 71,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('bottom center', element, reference, container),
  //   {
  //     left: 61,
  //     top: 40,
  //     position: 'bottom center'
  //   },
  //   'bottom center, overflowing right'
  // );
  //
  // reference = node(
  //   {
  //     top: 31,
  //     left: 9,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('bottom center', element, reference, container),
  //   {
  //     left: -1,
  //     top: 1,
  //     position: 'top center'
  //   },
  //   'bottom center, overflowing bottom left'
  // );
  //
  // reference = node(
  //   {
  //     top: 31,
  //     left: 71,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('bottom center', element, reference, container),
  //   {
  //     left: 61,
  //     top: 1,
  //     position: 'top center'
  //   },
  //   'bottom center, overflowing bottom right'
  // );
  //
  // reference = node(
  //   {
  //     top: 0,
  //     left: 39,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left top', element, reference, container),
  //   {
  //     left: 59,
  //     top: 0,
  //     position: 'right top'
  //   },
  //   'left top, overflowing left'
  // );
  //
  // reference = node(
  //   {
  //     top: 41,
  //     left: 40,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left top', element, reference, container),
  //   {
  //     left: 0,
  //     top: 21,
  //     position: 'left bottom'
  //   },
  //   'left top, overflowing bottom'
  // );
  //
  // reference = node(
  //   {
  //     top: 41,
  //     left: 39,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left top', element, reference, container),
  //   {
  //     left: 59,
  //     top: 21,
  //     position: 'right bottom'
  //   },
  //   'left top, overflowing bottom left'
  // );
  //
  // reference = node(
  //   {
  //     top: 10,
  //     left: 39,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left middle', element, reference, container),
  //   {
  //     left: 59,
  //     top: 0,
  //     position: 'right middle'
  //   },
  //   'left middle, overflowing left'
  // );
  //
  // reference = node(
  //   {
  //     top: 9,
  //     left: 39,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left middle', element, reference, container),
  //   {
  //     left: 59,
  //     top: -1,
  //     position: 'right middle'
  //   },
  //   'left middle, overflowing top left'
  // );
  //
  // reference = node(
  //   {
  //     top: 51,
  //     left: 39,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left middle', element, reference, container),
  //   {
  //     left: 59,
  //     top: 41,
  //     position: 'right middle'
  //   },
  //   'left middle, overflowing bottom left'
  // );
  //
  // reference = node(
  //   {
  //     top: 20,
  //     left: 39,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left bottom', element, reference, container),
  //   {
  //     left: 59,
  //     top: 0,
  //     position: 'right bottom'
  //   },
  //   'left bottom, overflowing left'
  // );
  //
  // reference = node(
  //   {
  //     top: 19,
  //     left: 40,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left bottom', element, reference, container),
  //   {
  //     left: 0,
  //     top: 19,
  //     position: 'left top'
  //   },
  //   'left bottom, overflowing top'
  // );
  //
  // reference = node(
  //   {
  //     top: 19,
  //     left: 39,
  //     width: 20,
  //     height: 10
  //   },
  //   viewport
  // );
  //
  // t.deepEqual(
  //   getPositionCoords('left bottom', element, reference, container),
  //   {
  //     left: 59,
  //     top: 19,
  //     position: 'right top'
  //   },
  //   'left bottom, overflowing top left'
  // );
});
