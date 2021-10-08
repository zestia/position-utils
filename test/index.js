import { getPosition, getCoords } from '../index.js';

const {
  QUnit: { module, test }
} = window;

let element;
let container;
let reference;

module('getPosition', function (hooks) {
  hooks.beforeEach(function () {
    element = document.getElementById('test-element');
    reference = document.getElementById('test-reference');
    container = document.getElementById('test-container');

    reference.style.display = 'none';
  });

  test('possible positions', function (assert) {
    assert.expect(9);

    assert.equal(getPosition(element, container, 3, 3), 'top left');

    container.style.justifyContent = 'center';

    assert.equal(getPosition(element, container, 3, 3), 'top center');

    container.style.justifyContent = 'end';

    assert.equal(getPosition(element, container, 3, 3), 'top right');

    container.style.alignItems = 'center';

    assert.equal(getPosition(element, container, 3, 3), 'middle right');

    container.style.alignItems = 'flex-end';

    assert.equal(getPosition(element, container, 3, 3), 'bottom right');

    container.style.justifyContent = 'center';

    assert.equal(getPosition(element, container, 3, 3), 'bottom center');

    container.style.justifyContent = 'flex-start';

    assert.equal(getPosition(element, container, 3, 3), 'bottom left');

    container.style.alignItems = 'center';

    assert.equal(getPosition(element, container, 3, 3), 'middle left');

    container.style.justifyContent = 'center';

    assert.equal(getPosition(element, container, 3, 3), 'middle center');
  });

  test('custom grid', function (assert) {
    assert.expect(9);

    assert.equal(getPosition(element, container, 2, 2), 'top left');

    container.style.justifyContent = 'center';

    assert.equal(getPosition(element, container, 2, 2), 'top left');

    container.style.justifyContent = 'end';

    assert.equal(getPosition(element, container, 2, 2), 'top right');

    container.style.alignItems = 'center';

    assert.equal(getPosition(element, container, 2, 2), 'top right');

    container.style.alignItems = 'flex-end';

    assert.equal(getPosition(element, container, 2, 2), 'bottom right');

    container.style.justifyContent = 'center';

    assert.equal(getPosition(element, container, 2, 2), 'bottom left');

    container.style.justifyContent = 'flex-start';

    assert.equal(getPosition(element, container, 2, 2), 'bottom left');

    container.style.alignItems = 'center';

    assert.equal(getPosition(element, container, 2, 2), 'top left');

    container.style.justifyContent = 'center';

    assert.equal(getPosition(element, container, 2, 2), 'top left');
  });

  test('window container', function (assert) {
    assert.expect(2);

    element.style.position = 'absolute';
    element.style.top = '100%';
    element.style.right = 0;

    assert.equal(getPosition(element, window, 3, 3), 'bottom right');

    element.style.top = `${document.body.scrollHeight}px`;

    assert.equal(getPosition(element, window, 3, 3), 'bottom right');
  });

  test('document container', function (assert) {
    assert.expect(2);

    element.style.position = 'absolute';
    element.style.top = '100%';
    element.style.right = 0;

    assert.equal(getPosition(element, document, 3, 3), 'middle right');

    element.style.top = `${document.body.scrollHeight}px`;

    assert.equal(getPosition(element, document, 3, 3), 'bottom right');
  });

  test('boundary accuracy', function (assert) {
    assert.expect(4);

    container.style.width = '300px';
    container.style.height = '300px';
    container.style.position = 'relative';

    element.style.position = 'absolute';

    element.style.left = '50px';

    assert.equal(getPosition(element, container, 3, 3), 'top left');

    element.style.left = '51px';

    assert.equal(getPosition(element, container, 3, 3), 'top center');

    element.style.top = '76px';

    assert.equal(getPosition(element, container, 3, 3), 'middle center');

    element.style.left = '50px';

    assert.equal(getPosition(element, container, 3, 3), 'middle left');
  });
});

module('getCoords', function (hooks) {
  hooks.beforeEach(function () {
    element = document.getElementById('test-element');
    reference = document.getElementById('test-reference');
    container = document.getElementById('test-container');
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

    reference.style.marginTop = '400px';
    container.scrollTop = 101;

    assert.deepEqual(getCoords('bottom right', element, reference), [100, 399]);
  });
});
