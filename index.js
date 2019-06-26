/* eslint-disable */

(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('@zestia/position-utils', factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.positionUtils = factory();
  }
})(this, function() {
  'use strict';

  function getMiddleOfRect(rect) {
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;

    return [x, y];
  }

  function getBoundaryRect(rect, columns, rows) {
    var column = rect.width / columns;
    var row = rect.height / rows;
    var left = column;
    var top = row;
    var right = column * (columns - 1);
    var bottom = row * (rows - 1);
    var width = right - left;
    var height = bottom - top;

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
    var middle = referenceRect.top + referenceRect.height / 2 - rect.height / 2;
    var center = referenceRect.left + referenceRect.width / 2 - rect.width / 2;
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

  function getAdjustedPositionForRect(position, rect, boundaryRect) {
    var parts = position.split(' ');
    var primary = parts[0];
    var secondary = parts[1];
    var overflowsTop = rect.top < boundaryRect.top;
    var overflowsBottom = rect.bottom > boundaryRect.bottom;
    var overflowsLeft = rect.left < boundaryRect.left;
    var overflowsRight = rect.right > boundaryRect.right;

    if (primary === 'top' && overflowsTop) {
      primary = 'bottom';
    } else if (primary === 'bottom' && overflowsBottom) {
      primary = 'top';
    } else if (primary === 'left' && overflowsLeft) {
      primary = 'right';
    } else if (primary === 'right' && overflowsRight) {
      primary = 'left';
    }

    if (secondary === 'top' && overflowsBottom) {
      secondary = 'bottom';
    } else if (secondary === 'bottom' && overflowsTop) {
      secondary = 'top';
    } else if (secondary === 'left' && overflowsRight) {
      secondary = 'right';
    } else if (secondary === 'right' && overflowsLeft) {
      secondary = 'left';
    }

    return [primary, secondary].join(' ');
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
        bottom: object.innerHeight
      };
    } else if (object instanceof Document) {
      return object.documentElement.getBoundingClientRect();
    } else {
      return object.getBoundingClientRect();
    }
  }

  function getCoords(position, element, reference, container) {
    var elementRect = element.getBoundingClientRect();
    var referenceRect = reference.getBoundingClientRect();
    var documentRect = getNormalisedRect(reference.ownerDocument);
    var resultRect = getPositionForRect(position, elementRect, referenceRect);
    var scrollLeft = documentRect.left * -1;
    var scrollTop = documentRect.top * -1;

    if (container) {
      var boundaryRect = getNormalisedRect(container);
      var adjustedPosition = getAdjustedPositionForRect(position, resultRect, boundaryRect);

      if (position !== adjustedPosition) {
        resultRect = getPositionForRect(adjustedPosition, elementRect, referenceRect);
        position = adjustedPosition;
      }
    }

    return {
      left: resultRect.left + scrollLeft,
      top: resultRect.top + scrollTop,
      position: position
    };
  }

  return {
    getPosition: getPosition,
    getCoords: getCoords
  };
});
