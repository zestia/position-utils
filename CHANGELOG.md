# Changelog

## 7.0.6

- Upgrade dependencies

## 7.0.5

- Upgrade `@zestia` scoped dependencies

## 7.0.4

- Re-release of 7.0.4 for testing publishing to GH instead of NPM

## 7.0.3

- Upgrade dependencies

## 7.0.2

- Only publish necessary code

## 7.0.1

- Reduce node version requirements

## 7.0.0

- Use modules

## 6.0.8

- Fix `getCoords` to account for an element inside a relative parent, which _is hidden_.
- Upgrade dependencies

## 6.0.7

- Fix `getCoords` to account for an element inside a relative parent, which has _been scrolled_.
- Upgrade dependencies

## 6.0.6

- Upgrade dependencies

## 6.0.5

- Upgrade dependencies

## 6.0.4

- Upgrade dependencies

## 6.0.3

- Upgrade dependencies

## 6.0.2

- Use existing function to compute middle of rect

## 6.0.1

- Fix `getPosition` not working for containers with non-zero top/left values

## 6.0.0

- Remove auto positioning

## 5.0.10

- Upgrade dependencies

## 5.0.9

- Upgrade dependencies

## 5.0.8

- Upgrade dependencies

## 5.07

- Upgrade dependencies

## 5.0.6

- Upgrade dependencies

## 5.0.5

- Upgrade dependencies

## 5.0.4

- Install release-it

## 5.0.3

- Flip from yarn to npm
- Upgrade dependencies

## 5.0.2

- Upgrade dependencies

## 5.0.1

- Make `getCoords` work for positioning elements inside relatively positioned containers

## 5.0.0

- Change name and signature of position functions
- Add support for bounds of `window` and `document`
- Add more tests

## 4.0.1

- Include scroll position of `container` in auto position calcualtion

## 4.0.0

- Add `container` parameter to `position` and introduce auto flipping if `element` overflows `container`

## 3.0.0

- Change return value of `positionCoords` to be an object instead of an array
- Rename `positionCoords` to `coords`
- Rename `elementPosition` to `position`

## 2.2.0

- Lower node version requirements

## 2.1.0

- Switch to AVA for testing

## 2.0.0

- Change `<x> middle` to `middle <x>` for `elementPosition` to be consistant with `top <x>` and `bottom <x>`

## 1.2.0

- Make `positionBoundary` private

## 1.1.1

- Floors calcualtions instead of round
- Removes need to pass in window to `positionCoords`

## < 1.1.0

- No changelog
