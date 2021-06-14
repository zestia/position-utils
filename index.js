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
    if (!element.offsetParent) {
      return [0, 0];
    }

    var elementRect = element.getBoundingClientRect();
    var referenceRect = reference.getBoundingClientRect();
    var offsetRect = element.offsetParent.getBoundingClientRect();
    var elementHeight = elementRect.height;
    var elementWidth = elementRect.width;
    var point = getMiddleOfRect(referenceRect);
    var referenceCenter = point[0] - elementWidth / 2;
    var referenceMiddle = point[1] - elementHeight / 2;
    var referenceTop = referenceRect.top;
    var referenceLeft = referenceRect.left;
    var referenceRight = referenceLeft + referenceRect.width;
    var referenceBottom = referenceTop + referenceRect.height;
    var offsetScrollTop = element.offsetParent.scrollTop;
    var offsetScrollLeft = element.offsetParent.scrollLeft;
    var offsetTop = offsetRect.top * -1;
    var offsetLeft = offsetRect.left * -1;
    var x;
    var y;

    switch (position) {
      case 'top left':
        x = referenceLeft;
        y = referenceTop - elementHeight;
        break;
      case 'top center':
        x = referenceCenter;
        y = referenceTop - elementHeight;
        break;
      case 'top right':
        x = referenceRight - elementWidth;
        y = referenceTop - elementHeight;
        break;
      case 'right top':
        x = referenceRight;
        y = referenceTop;
        break;
      case 'right middle':
        x = referenceRight;
        y = referenceMiddle;
        break;
      case 'right bottom':
        x = referenceRight;
        y = referenceBottom - elementHeight;
        break;
      case 'bottom left':
        x = referenceLeft;
        y = referenceBottom;
        break;
      case 'bottom center':
        x = referenceCenter;
        y = referenceBottom;
        break;
      case 'bottom right':
        x = referenceRight - elementWidth;
        y = referenceBottom;
        break;
      case 'left top':
        x = referenceLeft - elementWidth;
        y = referenceTop;
        break;
      case 'left middle':
        x = referenceLeft - elementWidth;
        y = referenceMiddle;
        break;
      case 'left bottom':
        x = referenceLeft - elementWidth;
        y = referenceBottom - elementHeight;
        break;
    }

    x += offsetLeft + offsetScrollLeft;
    y += offsetTop + offsetScrollTop;

    return [x, y];
  }

  return {
    getPosition: getPosition,
    getCoords: getCoords
  };
});
