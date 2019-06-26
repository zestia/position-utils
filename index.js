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
      bottom: bottom,
      width: width,
      height: height
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
      bottom: y + rect.height,
      width: rect.width,
      height: rect.height
    };
  }

  function getAdjustedPositionForRect(position, rect, containerRect) {
    var parts = position.split(' ');
    var primary = parts[0];
    var secondary = parts[1];
    var overflowsTop = rect.top < containerRect.top;
    var overflowsBottom = rect.bottom > containerRect.bottom;
    var overflowsLeft = rect.left < containerRect.left;
    var overflowsRight = rect.right > containerRect.right;

    console.log(
      'top',
      overflowsTop,
      containerRect.top - rect.top,
      ', bottom',
      containerRect.bottom - rect.bottom,
      overflowsBottom,
      ', left',
      containerRect.left - rect.left,
      overflowsLeft,
      ', right',
      overflowsRight,
      containerRect.right - rect.right
    );

    if (overflowsTop && containerRect.top - rect.top !== 1) {
      console.error('ERROR top', containerRect.top - rect.top);
    }
    if (overflowsLeft && containerRect.left - rect.left !== 1) {
      console.error('ERROR left', containerRect.left - rect.left);
    }
    if (overflowsRight && containerRect.right - rect.right !== -1) {
      console.error('ERROR right', containerRect.right - rect.right);
    }
    if (overflowsBottom && containerRect.bottom - rect.bottom !== -1) {
      console.error('ERROR bottom', containerRect.bottom - rect.bottom);
    }

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

  function getPositionInViewport(element, columns, rows) {
    var elementRect = element.getBoundingClientRect();
    var viewport = element.ownerDocument.documentElement;

    var viewportRect = {
      top: 0,
      left: 0,
      height: viewport.clientHeight,
      width: viewport.clientWidth
    };

    var boundaryRect = getBoundaryRect(viewportRect, columns, rows);
    var position = getPositionForBoundary(elementRect, boundaryRect);

    return position;
  }

  function getPositionCoords(position, element, reference, container, adjust) {
    var elementRect = element.getBoundingClientRect();
    var referenceRect = reference.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();
    var resultRect = getPositionForRect(position, elementRect, referenceRect);
    var scrollLeft = containerRect.left * -1;
    var scrollTop = containerRect.top * -1;

    console.log('for', position);
    console.log('element rect', elementRect);
    console.log('reference rect', referenceRect);
    console.log('container rect', containerRect);
    console.log('result rect', resultRect);

    if (adjust) {
      var adjustedPosition = getAdjustedPositionForRect(position, resultRect, containerRect);

      if (position !== adjustedPosition) {
        resultRect = getPositionForRect(adjustedPosition, elementRect, referenceRect);
        position = adjustedPosition;

        console.log('adjusted rect', resultRect);
      }
    }

    console.log('');

    return {
      left: resultRect.left + scrollLeft,
      top: resultRect.top + scrollTop,
      position: position
    };
  }

  return {
    getPositionInViewport: getPositionInViewport,
    getPositionCoords: getPositionCoords,
    position: getPositionInViewport,
    coords: getPositionCoords
  };
});
