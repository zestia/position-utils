# @zestia/position-utils

Rudimentary utils for determining the position of an element within another element, and positioning
elements near other elements. These utils do the bare minimum, as further positioning can be done with CSS translate.

<hr>

#### `getPositionInViewport(element, columns, rows)`

Returns where `element` is considered to be positioned inside the viewport, based on a bounding box created by splitting the viewport into `columns` and `rows`. Here are some examples:

<img src="assets/position.png" width="860" height="201">

#### `getPositionCoords(position, element, reference, container[, adjust])`

Returns the coordinates required to place `element` on the outside edge of `reference` relative to `container`, taking into consideration the desired `position` (e.g. `top left`). If `adjust`, then the desired `position` _may_ be ignored in favour of an adjusted position that will keep `element` visible inside `container`.

<img src="assets/coords.png" width="288" height="288">
