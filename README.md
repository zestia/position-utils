# @zestia/position-utils

Rudimentary utils for determining the position of an element within another element, and positioning
elements near other elements. These utils do the bare minimum, as further positioning can be done with CSS translate.

<hr>

#### `position(element, container, columns, rows)`

Returns where `element` is considered to be positioned inside `container`, based on a bounding box created by splitting the `container` into `columns` and `rows`. Here are some examples:

<img src="assets/position.png" width="860" height="201">

#### `coords(position, element, reference[, container, adjust])`

Returns the coordinates required to place `element` on the outside edge of `reference`, taking into consideration the desired `position` (e.g. `top left`). If `container` is provided, then its scroll position will be included in the coordinate calculation. If `adjust` is true, then `position` may be ignored in favour of an automatically computed position, to keep `element` visible inside `container`. Here are the possible positions:

<img src="assets/coords.png" width="288" height="288">
