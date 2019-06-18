# @zestia/position-utils

Rudimentary utils for determining the position of an element within another element, and positioning
elements near other elements. These utils do the bare minimum, as further positioning can be done with CSS translate.

<hr>

##### positionBoundary(element, columns, rows)

Accepts an element, and splits it up into columns and rows to create a central rectangle. A larger `column` value would result in a wider rectangle, and a larger `row` value would result in a taller rectangle.

##### elementPosition(element, boundary)

Returns where the element is positioned, taking the boundary into account. e.g. If the element is above-and-to-the-right of the boundary then it would be considered `top right`.

##### positionCoords(string, element, reference, window)

Returns the coordinates required to place `element` on the outside edge of `reference`, taking into consideration the desired position defined by `string` (e.g. `top left`), and the scroll position of the `window`.

<hr>
