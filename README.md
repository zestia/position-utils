# @zestia/position-utils

Utils for determining the position of an element within another element, and positioning
elements near other elements. Note that 'auto' positioning is intentionally not part of this library.

## getPosition

Returns where `element` is considered to be positioned inside `container`, based on a bounding box created by splitting the `container` into `columns` and `rows`.

<img src="docs/position.png" width="865" height="205">

### Examples

```javascript
// Syntax
getPosition(element, container, columns, rows);
```

```javascript
// Get position of element inside container, could be in 1 of 9 possible positions
getPosition(element, container, 3, 3);
```

```javascript
// Get position of element inside the document, could be in one of 2 possible locations: top center or bottom center
getPosition(element, document, 1, 2);
```

```javascript
// Get position of element inside the viewport, with edge positions less likely to be considered
getPosition(element, window, 5, 5);
```

## getCoords

Returns the coordinates required to place `element` at `position`, on the outside edge of `reference`.

<img src="docs/coords.png" width="288" height="288">

### Examples

```javascript
// Syntax
getCoords(position, element, reference);
```

```javascript
// Get coords to position element at the bottom left of reference
getCoords('bottom left', element, reference);
```
