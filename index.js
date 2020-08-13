/* eslint-disable */

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('@zestia/position-utils', factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.positionUtils = factory();
  }
})(this, function () {
  'use strict';

  function getMiddleOfRect(rect) {
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;

    return [x, y];
  }

  function getBoundaryRect(rect, columns, rows) {
    var column = rect.width / columns;
    var row = rect.height / rows;
    var left = rect.left + column;
    var top = rect.top + row;
    var right = rect.right - column;
    var bottom = rect.bottom - row;

    return {
      left: left,
      top: top,
      right: right,
      bottom: bottom
    };
  }

  function getPositionForBoundary(rect, boundaryRect) {
    var point = getMiddleOfRect(rect);
    var x = point[0];
    var y = point[1];
    var position = [];

    if (y < boundaryRect.top) {
      position.push('top');
    } else if (y > boundaryRect.bottom) {
      position.push('bottom');
    } else {
      position.push('middle');
    }

    if (x < boundaryRect.left) {
      position.push('left');
    } else if (x > boundaryRect.right) {
      position.push('right');
    } else {
      position.push('center');
    }

    return position.join(' ');
  }

  function getPositionForRect(position, rect, referenceRect) {
    var point = getMiddleOfRect(referenceRect);
    var center = point[0] - rect.width / 2;
    var middle = point[1] - rect.height / 2;
    var top = referenceRect.top - rect.height;
    var left = referenceRect.left - rect.width;
    var bottom = referenceRect.top + referenceRect.height;
    var right = referenceRect.left + referenceRect.width;
    var x;
    var y;

    switch (position) {
      case 'top left':
        x = left + rect.width;
        y = top;
        break;
      case 'top center':
        x = center;
        y = top;
        break;
      case 'top right':
        x = right - rect.width;
        y = top;
        break;
      case 'right top':
        x = right;
        y = top + rect.height;
        break;
      case 'right middle':
        x = right;
        y = middle;
        break;
      case 'right bottom':
        x = right;
        y = bottom - rect.height;
        break;
      case 'bottom left':
        x = left + rect.width;
        y = bottom;
        break;
      case 'bottom center':
        x = center;
        y = bottom;
        break;
      case 'bottom right':
        x = right - rect.width;
        y = bottom;
        break;
      case 'left top':
        x = left;
        y = top + rect.height;
        break;
      case 'left middle':
        x = left;
        y = middle;
        break;
      case 'left bottom':
        x = left;
        y = bottom - rect.height;
        break;
    }

    return {
      top: y,
      left: x,
      right: x + rect.width,
      bottom: y + rect.height
    };
  }

  function getPosition(element, container, columns, rows) {
    var elementRect = element.getBoundingClientRect();
    var containerRect = getNormalisedRect(container);
    var boundaryRect = getBoundaryRect(containerRect, columns, rows);

    return getPositionForBoundary(elementRect, boundaryRect);
  }

  function getNormalisedRect(object) {
    if (object instanceof Window) {
      return {
        top: 0,
        left: 0,
        right: object.innerWidth,
        bottom: object.innerHeight,
        width: object.innerWidth,
        height: object.innerHeight
      };
    } else if (object instanceof Document) {
      return object.documentElement.getBoundingClientRect();
    } else {
      return object.getBoundingClientRect();
    }
  }

  function getCoords(position, element, reference) {
    var elementRect = element.getBoundingClientRect();
    var referenceRect = reference.getBoundingClientRect();
    var offsetRect = element.offsetParent.getBoundingClientRect();
    var positionRect = getPositionForRect(position, elementRect, referenceRect);
    var scrollLeft = offsetRect.left * -1;
    var scrollTop = offsetRect.top * -1;
    var y = positionRect.top + scrollTop;
    var x = positionRect.left + scrollLeft;

    return [x, y];
  }

  return {
    getPosition: getPosition,
    getCoords: getCoords
  };
});
