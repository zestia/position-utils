const test = require('ava');
const { position: elementPosition, coords } = require('./index');

function node(rect, scrollLeft = 0, scrollTop = 0) {
  return {
    getBoundingClientRect() {
      return rect;
    },

    ownerDocument: {
      scrollingElement: {
        scrollTop,
        scrollLeft
      }
    }
  };
}

test('elementPosition', t => {
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

  t.is(elementPosition(element, container, 3, 3), 'top left');

  element = node({
    top: 14,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(elementPosition(element, container, 3, 3), 'top center');

  element = node({
    top: 14,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(elementPosition(element, container, 3, 3), 'top right');

  element = node({
    top: 30,
    left: 29,
    width: 60,
    height: 30
  });

  t.is(elementPosition(element, container, 3, 3), 'middle left');

  element = node({
    top: 30,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(elementPosition(element, container, 3, 3), 'middle center');

  element = node({
    top: 30,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(elementPosition(element, container, 3, 3), 'middle right');

  element = node({
    top: 46,
    left: 29,
    width: 60,
    height: 30
  });

  t.is(elementPosition(element, container, 3, 3), 'bottom left');

  element = node({
    top: 46,
    left: 60,
    width: 60,
    height: 30
  });

  t.is(elementPosition(element, container, 3, 3), 'bottom center');

  element = node({
    top: 46,
    left: 91,
    width: 60,
    height: 30
  });

  t.is(elementPosition(element, container, 3, 3), 'bottom right');
});

test('coords', t => {
  const reference = node({
    top: 20,
    left: 50,
    width: 60,
    height: 30
  });

  const element = node(
    {
      top: 13,
      left: 29,
      width: 20,
      height: 10
    },
    10,
    5
  );

  t.deepEqual(coords('top left', element, reference), {
    left: 60,
    top: 15,
    position: 'top left'
  });

  t.deepEqual(coords('top center', element, reference), {
    left: 80,
    top: 15,
    position: 'top center'
  });

  t.deepEqual(coords('top right', element, reference), {
    left: 100,
    top: 15,
    position: 'top right'
  });

  t.deepEqual(coords('right top', element, reference), {
    left: 120,
    top: 25,
    position: 'right top'
  });

  t.deepEqual(coords('right middle', element, reference), {
    left: 120,
    top: 35,
    position: 'right middle'
  });

  t.deepEqual(coords('right bottom', element, reference), {
    left: 120,
    top: 45,
    position: 'right bottom'
  });

  t.deepEqual(coords('bottom left', element, reference), {
    left: 60,
    top: 55,
    position: 'bottom left'
  });

  t.deepEqual(coords('bottom center', element, reference), {
    left: 80,
    top: 55,
    position: 'bottom center'
  });

  t.deepEqual(coords('bottom right', element, reference), {
    left: 100,
    top: 55,
    position: 'bottom right'
  });

  t.deepEqual(coords('left top', element, reference), {
    left: 40,
    top: 25,
    position: 'left top'
  });

  t.deepEqual(coords('left middle', element, reference), {
    left: 40,
    top: 35,
    position: 'left middle'
  });

  t.deepEqual(coords('left bottom', element, reference), {
    left: 40,
    top: 45,
    position: 'left bottom'
  });
});

test('coords default flip behaviour', t => {
  const element = node({
    width: 20,
    height: 10
  });

  const container = node({
    top: 0,
    left: 0,
    right: 140,
    bottom: 70
  });

  let reference;

  reference = node({
    top: 9,
    left: 0,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('top left', element, reference, container), {
    left: 0,
    top: 39,
    position: 'bottom left'
  });

  reference = node({
    top: 9,
    left: 40,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('top center', element, reference, container), {
    left: 60,
    top: 39,
    position: 'bottom center'
  });

  reference = node({
    top: 9,
    left: 80,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('top right', element, reference, container), {
    left: 120,
    top: 39,
    position: 'bottom right'
  });

  reference = node({
    top: 0,
    left: 61,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('right top', element, reference, container), {
    left: 41,
    top: 0,
    position: 'left top'
  });

  reference = node({
    top: 20,
    left: 61,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('right middle', element, reference, container), {
    left: 41,
    top: 30,
    position: 'left middle'
  });

  reference = node({
    top: 40,
    left: 61,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('right bottom', element, reference, container), {
    left: 41,
    top: 60,
    position: 'left bottom'
  });

  reference = node({
    top: 31,
    left: 0,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('bottom left', element, reference, container), {
    left: 0,
    top: 21,
    position: 'top left'
  });

  reference = node({
    top: 31,
    left: 40,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('bottom center', element, reference, container), {
    left: 60,
    top: 21,
    position: 'top center'
  });

  reference = node({
    top: 31,
    left: 80,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('bottom right', element, reference, container), {
    left: 120,
    top: 21,
    position: 'top right'
  });

  reference = node({
    top: 0,
    left: 19,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('left top', element, reference, container), {
    left: 79,
    top: 0,
    position: 'right top'
  });

  reference = node({
    top: 20,
    left: 19,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('left middle', element, reference, container), {
    left: 79,
    top: 30,
    position: 'right middle'
  });

  reference = node({
    top: 40,
    left: 19,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('left bottom', element, reference, container), {
    left: 79,
    top: 60,
    position: 'right bottom'
  });
});

test('coords custom flip behaviour', t => {
  const element = node({
    width: 20,
    height: 10
  });

  const container = node({
    top: 0,
    left: 0,
    right: 140,
    bottom: 70
  });

  const flip = position => (position === 'top left' ? 'right top' : 'top left');

  let reference;

  reference = node({
    top: 10,
    left: 0,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('top left', element, reference, container, flip), {
    left: 0,
    top: 0,
    position: 'top left'
  });

  reference = node({
    top: 9,
    left: 0,
    width: 60,
    height: 30
  });

  t.deepEqual(coords('top left', element, reference, container, flip), {
    left: 60,
    top: 9,
    position: 'right top'
  });
});
