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

// test('getPositionInViewport', t => {
//   const doc = node({
//     top: -10,
//     bottom: 330,
//     left: -20,
//     right: 580,
//     width: 600,
//     height: 350
//   });
//
//   doc.clientWidth = 300;
//   doc.clientHeight = 150;
//
//   let element;
//
//   element = node(
//     {
//       top: 37,
//       left: 79,
//       bottom: 62,
//       right: 119,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'top left', 'top left');
//
//   element = node(
//     {
//       top: 37,
//       left: 80,
//       bottom: 62,
//       right: 120,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'top center', 'top center');
//
//   element = node(
//     {
//       top: 37,
//       left: 181,
//       bottom: 62,
//       right: 221,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'top right', 'top right');
//
//   element = node(
//     {
//       top: 38,
//       left: 79,
//       bottom: 63,
//       right: 119,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'middle left');
//
//   element = node(
//     {
//       top: 38,
//       left: 80,
//       bottom: 63,
//       right: 120,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'middle center', 'middle center');
//
//   element = node(
//     {
//       top: 38,
//       left: 181,
//       bottom: 63,
//       right: 221,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'middle right', 'middle right');
//
//   element = node(
//     {
//       top: 88,
//       left: 79,
//       bottom: 113,
//       right: 119,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'bottom left', 'bottom left');
//
//   element = node(
//     {
//       top: 88,
//       left: 80,
//       bottom: 113,
//       right: 120,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'bottom center', 'bottom center');
//
//   element = node(
//     {
//       top: 88,
//       left: 181,
//       bottom: 113,
//       right: 221,
//       width: 40,
//       height: 25
//     },
//     doc
//   );
//
//   t.is(getPositionInViewport(element, 3, 3), 'bottom right', 'bottom right');
// });
//
// test('getPositionCoords', t => {
//   const container = node({
//     top: -5,
//     bottom: 65,
//     left: -10,
//     right: 90,
//     width: 100,
//     height: 70
//   });
//
//   const reference = node({
//     top: 25,
//     bottom: 35,
//     left: 30,
//     right: 50,
//     width: 20,
//     height: 10
//   });
//
//   const element = node({
//     width: 40,
//     height: 30
//   });
//
//   t.deepEqual(
//     getPositionCoords('top left', element, reference, container),
//     {
//       left: 40,
//       top: 0,
//       position: 'top left'
//     },
//     'top left'
//   );
//
//   t.deepEqual(
//     getPositionCoords('top center', element, reference, container),
//     {
//       left: 30,
//       top: 0,
//       position: 'top center'
//     },
//     'top center'
//   );
//
//   t.deepEqual(
//     getPositionCoords('top right', element, reference, container),
//     {
//       left: 20,
//       top: 0,
//       position: 'top right'
//     },
//     'top right'
//   );
//
//   t.deepEqual(
//     getPositionCoords('right top', element, reference, container),
//     {
//       left: 60,
//       top: 30,
//       position: 'right top'
//     },
//     'right top'
//   );
//
//   t.deepEqual(
//     getPositionCoords('right middle', element, reference, container),
//     {
//       left: 60,
//       top: 20,
//       position: 'right middle'
//     },
//     'right middle'
//   );
//
//   t.deepEqual(
//     getPositionCoords('right bottom', element, reference, container),
//     {
//       left: 60,
//       top: 10,
//       position: 'right bottom'
//     },
//     'right bottom'
//   );
//
//   t.deepEqual(
//     getPositionCoords('bottom left', element, reference, container),
//     {
//       left: 40,
//       top: 40,
//       position: 'bottom left'
//     },
//     'bottom left'
//   );
//
//   t.deepEqual(
//     getPositionCoords('bottom center', element, reference, container),
//     {
//       left: 30,
//       top: 40,
//       position: 'bottom center'
//     },
//     'bottom center'
//   );
//
//   t.deepEqual(
//     getPositionCoords('bottom right', element, reference, container),
//     {
//       left: 20,
//       top: 40,
//       position: 'bottom right'
//     },
//     'bottom right'
//   );
//
//   t.deepEqual(
//     getPositionCoords('left top', element, reference, container),
//     {
//       left: 0,
//       top: 30,
//       position: 'left top'
//     },
//     'left top'
//   );
//
//   t.deepEqual(
//     getPositionCoords('left middle', element, reference, container),
//     {
//       left: 0,
//       top: 20,
//       position: 'left middle'
//     },
//     'left middle'
//   );
//
//   t.deepEqual(
//     getPositionCoords('left bottom', element, reference, container),
//     {
//       left: 0,
//       top: 10,
//       position: 'left bottom'
//     },
//     'left bottom'
//   );
// });

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
    right: 0,
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

  reference = node({
    top: 24,
    bottom: 34,
    left: 0,
    right: 10,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getPositionCoords('top center', element, reference, container, true),
    {
      left: 0,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top'
  );

  reference = node({
    top: 25,
    bottom: 35,
    left: -1,
    right: 9,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getPositionCoords('top center', element, reference, container, true),
    {
      left: -1,
      top: 0,
      position: 'top center'
    },
    'top center, overflowing left'
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
    getPositionCoords('top center', element, reference, container, true),
    {
      left: 51,
      top: 0,
      position: 'top center'
    },
    'top center, overflowing right'
  );

  reference = node({
    top: 24,
    bottom: 34,
    left: -1,
    right: 9,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getPositionCoords('top center', element, reference, container, true),
    {
      left: -1,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top left'
  );

  reference = node({
    top: 24,
    bottom: 34,
    left: 61,
    right: 71,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getPositionCoords('top center', element, reference, container, true),
    {
      left: 61,
      top: 39,
      position: 'bottom center'
    },
    'top center, overflowing top right'
  );

  reference = node({
    top: 24,
    bottom: 34,
    left: 10,
    right: 20,
    width: 20,
    height: 10
  });

  t.deepEqual(
    getPositionCoords('top right', element, reference, container, true),
    {
      left: 0,
      top: 39,
      position: 'bottom right'
    },
    'top right, overflowing top'
  );
});
