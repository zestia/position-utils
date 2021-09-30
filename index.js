/* global Window, Document */

function getMiddleOfRect(rect) {
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  return [x, y];
}

function getBoundaryRect(rect, columns, rows) {
  const column = rect.width / columns;
  const row = rect.height / rows;
  const left = rect.left + column;
  const top = rect.top + row;
  const right = rect.right - column;
  const bottom = rect.bottom - row;

  return {
    left,
    top,
    right,
    bottom
  };
}

function getPositionForBoundary(rect, boundaryRect) {
  const point = getMiddleOfRect(rect);
  const [x, y] = point;
  const position = [];

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

export function getPosition(element, container, columns, rows) {
  const elementRect = element.getBoundingClientRect();
  const containerRect = getNormalisedRect(container);
  const boundaryRect = getBoundaryRect(containerRect, columns, rows);

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

export function getCoords(position, element, reference) {
  if (!element.offsetParent) {
    return [0, 0];
  }

  const elementRect = element.getBoundingClientRect();
  const referenceRect = reference.getBoundingClientRect();
  const offsetRect = element.offsetParent.getBoundingClientRect();
  const elementHeight = elementRect.height;
  const elementWidth = elementRect.width;
  const point = getMiddleOfRect(referenceRect);
  const referenceCenter = point[0] - elementWidth / 2;
  const referenceMiddle = point[1] - elementHeight / 2;
  const referenceTop = referenceRect.top;
  const referenceLeft = referenceRect.left;
  const referenceRight = referenceLeft + referenceRect.width;
  const referenceBottom = referenceTop + referenceRect.height;
  const offsetScrollTop = element.offsetParent.scrollTop;
  const offsetScrollLeft = element.offsetParent.scrollLeft;
  const offsetTop = offsetRect.top * -1;
  const offsetLeft = offsetRect.left * -1;
  let x;
  let y;

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
