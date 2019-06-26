# @zestia/position-utils

Rudimentary utils for determining the position of an element within another element, and positioning
elements near other elements. These utils do the bare minimum, as further positioning can be done with CSS translate.

<hr>

#### `getPosition(element, container, columns, rows)`

Returns where `element` is considered to be positioned inside `container`, based on a bounding box created by splitting the `container` into `columns` and `rows`. Here are some examples:

<img src="assets/position.png" width="860" height="201">

#### `getPositionCoords(position, element, reference, container[, bounds])`

Returns the coordinates required to place `element` on the outside edge of `reference` relative to `container`, taking into consideration the desired `position` (e.g. `top left`). If `bounds` is present, then the desired `position` _may_ be ignored in favour of an adjusted position that will keep `element` visible inside `bounds`.

<img src="assets/coords.png" width="288" height="288">
