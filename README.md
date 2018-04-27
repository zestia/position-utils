# @zestia/position-utils

Rudimentary utils for determining the position of an element within another element, and positioning
elements near other elements. These utils do the bare minimum, as further positioning can be done with CSS translate.

<hr>

##### positionToString(position)

Accepts a position, e.g. `{ north: true, west: true }`, and returns a string representation: `NW`

##### stringToPosition(string)

Accepts a string, e.g. `SE`, and returns a position `{ south: true, east: true }`

##### hasDirection(position)

Accepts a position, e.g. `{ south: true, west: true }` and returns whether or not that corresponds to a known position, like South West.

##### positionBoundary(element, columns, rows)

Accepts an element, and splits it up into columns and rows to create a central rectangle. A larger `column` value would result in a wider rectangle, and a larger `row` value would result in a taller rectangle.

##### elementPosition(element, boundary)

Returns where the element is positioned, taking the boundary into account. e.g. If the element is above-and-to-the-right of the boundary then it would be considered to be in the North East `NE`.

##### positionCoords(string, element, reference, window)

Returns the coordinates required to place `element` on the outside edge of `reference`, taking into consideration the desired position defined by `string` (e.g. `SW`), and the scroll position of the `window`.

<hr>

