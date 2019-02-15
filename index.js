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

  var round = Math.round;

  function positionBoundary(element, columns, rows) {
    var rect = element.getBoundingClientRect();
    var width = rect.right - rect.left;
    var height = rect.bottom - rect.top;
    var column = width / columns;
    var row = height / rows;

    return {
      left: round(column),
      top: round(row),
      right: round(column * (columns - 1)),
      bottom: round(row * (rows - 1))
    };
  }

  function elementPosition(element, boundary) {
    var rect = element.getBoundingClientRect();

    var x = rect.left + (rect.right - rect.left) / 2;
    var y = rect.top + (rect.bottom - rect.top) / 2;

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

  function positionCoords(position, element, reference, window) {
    var elRect = element.getBoundingClientRect();
    var refRect = reference.getBoundingClientRect();
    var refLeft = refRect.left + window.pageXOffset;
    var refTop = refRect.top + window.pageYOffset;
    var refHeight = refRect.bottom - refRect.top;
    var refWidth = refRect.right - refRect.left;
    var elHeight = elRect.bottom - elRect.top;
    var elWidth = elRect.right - elRect.left;
    var middle = refTop + refHeight / 2 - elHeight / 2;
    var center = refLeft + refWidth / 2 - elWidth / 2;
    var top = refTop - elHeight;
    var left = refLeft - elWidth;
    var bottom = refTop + refHeight;
    var right = refLeft + refWidth;
    var coords = [];

    switch (position) {
      case 'top left':
        coords = [left + elWidth, top];
        break;
      case 'top center':
        coords = [center, top];
        break;
      case 'top right':
        coords = [right - elWidth, top];
        break;
      case 'right middle':
        coords = [right, middle];
        break;
      case 'right top':
        coords = [right, top + elHeight];
        break;
      case 'right bottom':
        coords = [right, bottom - elHeight];
        break;
      case 'bottom right':
        coords = [right - elWidth, bottom];
        break;
      case 'bottom center':
        coords = [center, bottom];
        break;
      case 'bottom left':
        coords = [left + elWidth, bottom];
        break;
      case 'left middle':
        coords = [left, middle];
        break;
      case 'left top':
        coords = [left, top + elHeight];
        break;
      case 'left bottom':
        coords = [left, bottom - elHeight];
        break;
    }

    return coords.map(round);
  }

  return {
    positionBoundary: positionBoundary,
    elementPosition: elementPosition,
    positionCoords: positionCoords
  };
});
