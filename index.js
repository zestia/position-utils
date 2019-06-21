/* eslint-disable */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('@zestia/position-utils', factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.positionUtils = factory();
  }
})(this, function() {
  'use strict';

  function boundaryRect(element, columns, rows) {
    var rect = element.getBoundingClientRect();
    var column = rect.width / columns;
    var row = rect.height / rows;

    return {
      left: column,
      top: row,
      right: column * (columns - 1),
      bottom: row * (rows - 1)
    };
  }

  function middleOfRect(rect) {
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;

    return [x, y];
  }

  function positionRect(position, element, reference) {
    var elRect = element.getBoundingClientRect();
    var refRect = reference.getBoundingClientRect();
    var scrollEl = element.ownerDocument.scrollingElement || document.documentElement; // Remove document global when IE11 support is dropped
    var refLeft = refRect.left + scrollEl.scrollLeft;
    var refTop = refRect.top + scrollEl.scrollTop;
    var middle = refTop + refRect.height / 2 - elRect.height / 2;
    var center = refLeft + refRect.width / 2 - elRect.width / 2;
    var top = refTop - elRect.height;
    var left = refLeft - elRect.width;
    var bottom = refTop + refRect.height;
    var right = refLeft + refRect.width;
    var x;
    var y;

    switch (position) {
      case 'top left':
        x = left + elRect.width;
        y = top;
        break;
      case 'top center':
        x = center;
        y = top;
        break;
      case 'top right':
        x = right - elRect.width;
        y = top;
        break;
      case 'right top':
        x = right;
        y = top + elRect.height;
        break;
      case 'right middle':
        x = right;
        y = middle;
        break;
      case 'right bottom':
        x = right;
        y = bottom - elRect.height;
        break;
      case 'bottom left':
        x = left + elRect.width;
        y = bottom;
        break;
      case 'bottom center':
        x = center;
        y = bottom;
        break;
      case 'bottom right':
        x = right - elRect.width;
        y = bottom;
        break;
      case 'left top':
        x = left;
        y = top + elRect.height;
        break;
      case 'left middle':
        x = left;
        y = middle;
        break;
      case 'left bottom':
        x = left;
        y = bottom - elRect.height;
        break;
    }

    return {
      top: y,
      left: x,
      right: x + elRect.width,
      bottom: y + elRect.height
    };
  }

  function elementPosition(element, container, columns, rows) {
    var boundary = boundaryRect(container, columns, rows);
    var rect = element.getBoundingClientRect();
    var point = middleOfRect(rect);
    var x = point[0];
    var y = point[1];
    var position = [];

    if (y < boundary.top) {
      position.push('top');
    } else if (y > boundary.bottom) {
      position.push('bottom');
    } else {
      position.push('middle');
    }

    if (x < boundary.left) {
      position.push('left');
    } else if (x > boundary.right) {
      position.push('right');
    } else {
      position.push('center');
    }

    return position.join(' ');
  }

  function flipPosition(position, elRect, contRect) {
    var parts = position.split(' ');
    var primary = parts[0];
    var secondary = parts[1];
    var overflowsTop = elRect.top < contRect.top;
    var overflowsBottom = elRect.bottom > contRect.bottom;
    var overflowsLeft = elRect.left < contRect.left;
    var overflowsRight = elRect.right > contRect.right;

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

  function positionCoords(position, element, reference, container) {
    var rect = positionRect(position, element, reference);

    if (container) {
      var contRect = container.getBoundingClientRect();
      var flippedPosition = flipPosition(position, rect, contRect);

      return positionCoords(flippedPosition, element, reference);
    }

    return {
      left: rect.left,
      top: rect.top,
      position: position
    };
  }

  return {
    position: elementPosition,
    coords: positionCoords
  };
});
