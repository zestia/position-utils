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

  var floor = Math.floor;

  function positionBoundary(element, columns, rows) {
    var rect = element.getBoundingClientRect();
    var column = rect.width / columns;
    var row = rect.height / rows;

    return {
      left: floor(column),
      top: floor(row),
      right: floor(column * (columns - 1)),
      bottom: floor(row * (rows - 1))
    };
  }

  function elementPosition(element, boundary) {
    var rect = element.getBoundingClientRect();

    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;

    var position = [];
    var middle;
    var center;

    if (y < boundary.top) {
      position.push('top');
    } else if (y > boundary.bottom) {
      position.push('bottom');
    } else {
      middle = true;
    }

    if (x < boundary.left) {
      position.push('left');
    } else if (x > boundary.right) {
      position.push('right');
    } else {
      center = true;
    }

    if (middle) {
      position.push('middle');
    }

    if (center) {
      position.push('center');
    }

    return position.join(' ');
  }

  function positionCoords(position, element, reference) {
    var elRect = element.getBoundingClientRect();
    var refRect = reference.getBoundingClientRect();
    var scrollEl = element.ownerDocument.scrollingElement;
    var refLeft = refRect.left + scrollEl.scrollLeft;
    var refTop = refRect.top + scrollEl.scrollTop;
    var middle = refTop + refRect.height / 2 - elRect.height / 2;
    var center = refLeft + refRect.width / 2 - elRect.width / 2;
    var top = refTop - elRect.height;
    var left = refLeft - elRect.width;
    var bottom = refTop + refRect.height;
    var right = refLeft + refRect.width;
    var coords = [];

    switch (position) {
      case 'top left':
        coords = [left + elRect.width, top];
        break;
      case 'top center':
        coords = [center, top];
        break;
      case 'top right':
        coords = [right - elRect.width, top];
        break;
      case 'right middle':
        coords = [right, middle];
        break;
      case 'right top':
        coords = [right, top + elRect.height];
        break;
      case 'right bottom':
        coords = [right, bottom - elRect.height];
        break;
      case 'bottom right':
        coords = [right - elRect.width, bottom];
        break;
      case 'bottom center':
        coords = [center, bottom];
        break;
      case 'bottom left':
        coords = [left + elRect.width, bottom];
        break;
      case 'left middle':
        coords = [left, middle];
        break;
      case 'left top':
        coords = [left, top + elRect.height];
        break;
      case 'left bottom':
        coords = [left, bottom - elRect.height];
        break;
    }

    return coords.map(floor);
  }

  return {
    positionBoundary: positionBoundary,
    elementPosition: elementPosition,
    positionCoords: positionCoords
  };
});
