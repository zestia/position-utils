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
  var abs = Math.abs;
  var keys = Object.keys;

  function positionToString(position) {
    var string = '';
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

  function positionBoundary(element, columns, rows) {
    var rect   = element.getBoundingClientRect();
    var column = rect.width / columns;
    var row    = rect.height / rows;

    return {
      left:   round(column),
      top:    round(row),
      right:  round(column * (columns - 1)),
      bottom: round(row * (rows - 1))
    };
  }

  function elementPosition(element, boundary) {
    var rect = element.getBoundingClientRect();

    var V = abs(rect.top - boundary.top) < abs(rect.bottom - boundary.bottom);
    var H = abs(rect.left - boundary.left) < abs(rect.right - boundary.right);
    var N = rect.top < boundary.top;
    var E = rect.right > boundary.right;
    var S = rect.bottom > boundary.bottom;
    var W = rect.left < boundary.left;

    return {
      N: N && S ? !V : N,
      E: E && W ?  H : E,
      S: S && N ?  V : S,
      W: W && E ? !H : W
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
    positionBoundary: positionBoundary,
    elementPosition: elementPosition,
    hasDirection: hasDirection,
    positionCoords: positionCoords
  };
}));
