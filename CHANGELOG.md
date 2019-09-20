# Changelog

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
