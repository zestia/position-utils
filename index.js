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
    var column = rect.width / columns;
    var row = rect.height / rows;

    return {
      left: round(column),
      top: round(row),
      right: round(column * (columns - 1)),
      bottom: round(row * (rows - 1))
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
    var pointMiddle = refTop + refRect.height / 2 - elRect.height / 2;
    var pointCenter = refLeft + refRect.width / 2 - elRect.width / 2;
    var pointTop = refTop - elRect.height;
    var pointLeft = refLeft - elRect.width;
    var pointBottom = refTop + refRect.height;
    var pointRight = refLeft + refRect.width;
    var coords = [];

    switch (position) {
      case 'top left':
        coords = [pointLeft + elRect.width, pointTop];
        break;
      case 'top center':
        coords = [pointCenter, pointTop];
        break;
      case 'top right':
        coords = [pointRight - elRect.width, pointTop];
        break;
      case 'right middle':
        coords = [pointRight, pointMiddle];
        break;
      case 'right top':
        coords = [pointRight, pointTop + elRect.height];
        break;
      case 'right bottom':
        coords = [pointRight, pointBottom - elRect.height];
        break;
      case 'bottom right':
        coords = [pointRight - elRect.width, pointBottom];
        break;
      case 'bottom center':
        coords = [pointCenter, pointBottom];
        break;
      case 'bottom left':
        coords = [pointLeft + elRect.width, pointBottom];
        break;
      case 'left middle':
        coords = [pointLeft, pointMiddle];
        break;
      case 'left top':
        coords = [pointLeft, pointTop + elRect.height];
        break;
      case 'left bottom':
        coords = [pointLeft, pointBottom - elRect.height];
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
