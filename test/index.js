import { getPosition, getCoords } from '../index.js';

const {
  QUnit: { module, test }
} = window;

module('getPosition', function (hooks) {
  let element;
  let container;

  hooks.beforeEach(function () {
    element = document.getElementById('test-element');
    container = document.getElementById('test-container');
  });

  test('possible positions', function (assert) {
    assert.expect(1);

    // assert.equal(getPosition(element, container, 3, 3), 'top left');
  });
});

module('getCoords', function (hooks) {
  let element;
  let reference;
  let container;

  hooks.beforeEach(function () {
    element = document.getElementById('test-element');
    reference = document.getElementById('test-reference');
    container = document.getElementById('test-container');
  });

  hooks.afterEach(function () {
    reference.style = '';
    container.style = '';
    container.scrollTop = 0;
  });

  test('possible positions', function (assert) {
    assert.expect(12);

    assert.deepEqual(getCoords('top left', element, reference), [0, -50]);
    assert.deepEqual(getCoords('top center', element, reference), [50, -50]);
    assert.deepEqual(getCoords('top right', element, reference), [100, -50]);
    assert.deepEqual(getCoords('right top', element, reference), [200, 0]);
    assert.deepEqual(getCoords('right middle', element, reference), [200, 25]);
    assert.deepEqual(getCoords('right bottom', element, reference), [200, 50]);
    assert.deepEqual(getCoords('bottom left', element, reference), [0, 100]);
    assert.deepEqual(getCoords('bottom center', element, reference), [50, 100]);
    assert.deepEqual(getCoords('bottom right', element, reference), [100, 100]);
    assert.deepEqual(getCoords('left top', element, reference), [-100, 0]);
    assert.deepEqual(getCoords('left middle', element, reference), [-100, 25]);
    assert.deepEqual(getCoords('left bottom', element, reference), [-100, 50]);
  });

  test('offset parent', function (assert) {
    assert.expect(1);

    reference.style.position = 'relative';
    reference.style.left = '1px';
    reference.style.top = '2px';

    assert.deepEqual(getCoords('bottom right', element, reference), [101, 102]);
  });

  test('hidden parent', function (assert) {
    assert.expect(1);

    container.style.display = 'none';

    assert.deepEqual(getCoords('bottom right', element, reference), [0, 0]);
  });

  test('scrolled parent', function (assert) {
    assert.expect(1);

    container.style.overflow = 'scroll';
    reference.style.marginTop = '400px';
    container.scrollTop = 101;

    assert.deepEqual(getCoords('bottom right', element, reference), [100, 399]);
  });
});
