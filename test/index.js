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

    assert.equal(getPosition(element, container, 3, 3), 'top left');
  });
});

module('getCoords', function (hooks) {
  let element;
  let reference;

  hooks.beforeEach(function () {
    element = document.getElementById('test-element');
    reference = document.getElementById('test-reference');
  });

  test('possible positions', function (assert) {
    assert.expect(12);

    assert.deepEqual(getCoords('top left', element, reference), [0, 150]);
    assert.deepEqual(getCoords('top center', element, reference), [50, 150]);
    assert.deepEqual(getCoords('top right', element, reference), [100, 150]);
    assert.deepEqual(getCoords('right top', element, reference), [200, 200]);
    assert.deepEqual(getCoords('right middle', element, reference), [200, 225]);
    assert.deepEqual(getCoords('right bottom', element, reference), [200, 250]);
    assert.deepEqual(getCoords('bottom left', element, reference), [0, 300]);
    assert.deepEqual(getCoords('bottom center', element, reference), [50, 300]);
    assert.deepEqual(getCoords('bottom right', element, reference), [100, 300]);
    assert.deepEqual(getCoords('left top', element, reference), [-100, 200]);
    assert.deepEqual(getCoords('left middle', element, reference), [-100, 225]);
    assert.deepEqual(getCoords('left bottom', element, reference), [-100, 250]);
  });
});
