const { QUnit, CSSAnimation } = window;

QUnit.assert.animated = function (actual, expected) {
  this.pushResult({
    expected: actual.map(keyForAnimation),
    result: actual.reduce((result, animation, index) => {
      return (
        result &&
        animation.playState === 'finished' &&
        keyForAnimation(animation) === expected[index]
      );
    }, actual.length === expected.length)
  });
};

function keyForAnimation(animation) {
  const id = animation.effect.target.getAttribute('id');

  const prop =
    animation[
      animation instanceof CSSAnimation ? 'animationName' : 'transitionProperty'
    ];

  return prop ? `#${id} → ${prop}` : `#${id}`;
}
