# @zestia/position-utils

Rudimentary utils for determining the position of an element within another element, and positioning
elements near other elements. These utils do the bare minimum, as further positioning can be done with CSS translate.

<hr>

##### positionBoundary(element, columns, rows)

Accepts an element, and splits it up into columns and rows to create a central rectangle. A larger `column` value would result in a wider rectangle, and a larger `row` value would result in a taller rectangle.

##### elementPosition(element, boundary)

Returns where the element is positioned, taking the boundary into account. e.g. If the element is above-and-to-the-right of the boundary rectangle then it would be considered `top right`.

##### positionCoords(string, element, reference)

Returns the coordinates required to place `element` on the outside edge of `reference`, taking into consideration the desired position defined by `string` (e.g. `top left`)

<hr>

### Example

```javascript
// A typical example involves at least 3 elements:
// 1. An element in a container
// 2. The container element
// 3. Another element, to be positioned near the first element

const myElement = document.querySelector('.my-element');
const docElement = document.documentElement;
const popupElement = document.querySelector('.popup');

// Create a boundary rectangle for the container
// (The values control how likely myElement is to be
// considered near an edge).

const docBoundary = positionBoundary(docElement, 3, 3);
// -> 1000 x 1000 = { top: 333, left: 333, bottom: 666, right: 666 }

// Use the boundary rectange to compute where myElement
// is considered to be positioned inside docElement

const elPosition = elementPosition(myElement, docBoundary);
//  --> myElement is considered to be in the 'top left' of the docElement

// Now we know where the myElement is positioned, we can
// decide how we might want to position another element
// near it. In this case, myElement is in the top left of the document, so it makes sense to put our popup beneath it...

// Compute the coordinates to position popupElement on
// the bottom left edge of myElement
const [left, top] = positionCoords('bottom left', popupElement, mYlement);
```
