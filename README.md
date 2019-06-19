# @zestia/position-utils

Rudimentary utils for determining the position of an element within another element, and positioning
elements near other elements. These utils do the bare minimum, as further positioning can be done with CSS translate.

<hr>

##### elementPosition(element, container, columns, rows)

Returns where `element` is considered to be position inside `container`, based on a bounding box created by splitting the `container` into `columns` and `rows`. e.g. If the element is above-and-to-the-right of the bounding box then it would be considered `top right`.

##### positionCoords(string, element, reference)

Returns the coordinates required to place `element` on the outside edge of `reference`, taking into consideration the desired position defined by `string` (e.g. `top left`)

<hr>

### Example

```javascript
// A typical example involves 3 elements:
// 1. An element in a container
// 2. The container element
// 3. Another element, to be positioned near the first element

const myElement = document.querySelector('.my-element');
const docElement = document.documentElement;
const popupElement = document.querySelector('.popup');

// Find the position of myElement, inside docElement when it is split into
// a grid, creating a bounding box e.g.
// 1000 x 1000 = { top: 333, left: 333, bottom: 666, right: 666 }

const elPosition = elementPosition(myElement, docElement, 3, 3);

// In this example, based on the bounding box, myElement was considered
// to be in the 'top left' of docElement. So, it make sense to position
// our popup element beneath it...

// Compute the coordinates to position popupElement on the bottom left edge of myElement
const [left, top] = positionCoords('bottom left', popupElement, myElement);
```
