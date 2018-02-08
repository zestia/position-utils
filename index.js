(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('@zestia/position-utils', factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.positionUtils = factory();
  }
}(this, function() {
  'use strict';

  var round = Math.round;
  var keys = Object.keys;

  function positionToString(position) {
    let string = '';
    string += position.N ? 'N' : position.S ? 'S' : '';
    string += position.E ? 'E' : position.W ? 'W' : '';
    return string;
  }

  function stringToPosition(string) {
    return {
      N: /^N/.test(string),
      E: /E$/.test(string),
      S: /^S/.test(string),
      W: /W$/.test(string)
    };
  }

  function elementBoundary(element, columns, rows) {
    var rect   = element.getBoundingClientRect();
    var left   = element.scrollLeft;
    var top    = element.scrollTop;
    var column = rect.width / columns;
    var row    = rect.height / rows;

    return {
      left:   round(column + left),
      top:    round(row + top),
      right:  round(column * (columns - 1) + left),
      bottom: round(row * (rows - 1) + top)
    };
  }

  function elementPosition(element, boundary) {
    var rect = element.getBoundingClientRect();

    return {
      N: rect.top < boundary.top,
      E: rect.right > boundary.right,
      S: rect.bottom > boundary.bottom,
      W: rect.left < boundary.left
    };
  }

  function hasDirection(position) {
    return keys(position).filter(function(direction) {
      return !!position[direction];
    }).length > 0;
  }

  function positionCoords(string, element, reference, container) {
    var elRect     = element.getBoundingClientRect();
    var refRect    = reference.getBoundingClientRect();
    var refLeft    = refRect.left + container.scrollLeft;
    var refTop     = refRect.top + container.scrollTop;
    var refHeight  = refRect.height;
    var refWidth   = refRect.width;
    var elHeight   = elRect.height;
    var elWidth    = elRect.width;
    var vertical   = refTop + refHeight / 2 - elHeight / 2;
    var horizontal = refLeft + refWidth / 2 - elWidth / 2;
    var top        = refTop - elHeight;
    var left       = refLeft - elWidth;
    var bottom     = refTop + refHeight;
    var right      = refLeft + refWidth;
    var coords     = [];

    switch (string) {
      case 'N':  coords = [horizontal, top];    break;
      case 'NE': coords = [right, top];         break;
      case 'E':  coords = [right, vertical];    break;
      case 'SE': coords = [right, bottom];      break;
      case 'S':  coords = [horizontal, bottom]; break;
      case 'SW': coords = [left, bottom];       break;
      case 'W':  coords = [left, vertical];     break;
      case 'NW': coords = [left, top];          break;
    }

    return coords.map(round);
  }

  return {
    positionToString: positionToString,
    stringToPosition: stringToPosition,
    elementBoundary: elementBoundary,
    elementPosition: elementPosition,
    hasDirection: hasDirection,
    positionCoords: positionCoords
  };
}));
