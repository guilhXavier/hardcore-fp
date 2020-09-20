const { replace } = require('ramda')

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: () => `Box(${x})`,
  chain: f => f(x),
})

// Ex1: Using Box, refactor moneyToFloat to be unnested.
// =========================
const moneyToFloat = str => parseFloat(str.replace(/\$/, ''))

const boxMoneyToFloat = str =>
  Box(str)
    .map(elem => elem.replace(/\$/, ''))
    .fold(elem => parseFloat(elem))

console.log(boxMoneyToFloat('$5.00'))

// Ex2: Using Box, refactor percentToFloat to remove assignment
// =========================
const percentToFloat = str => {
  const float = parseFloat(str.replace(/\%/, ''))
  return float * 0.01
}

const boxPercentToFloat = str =>
  Box(str)
    .map(str => str.replace(/\%/, ''))
    .map(rStr => parseFloat(rStr))
    .fold(num => num * 0.01)

console.log(boxPercentToFloat('20%'))

// Ex3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
// =========================
const applyDiscount = (price, discount) => {
  const cents = moneyToFloat(price)
  const savings = percentToFloat(discount)
  return cents - cents * savings
}

const boxApplyDiscount = (price, discount) => {
  Box(boxMoneyToFloat(price))
    .chain(cents =>
      Box(boxPercentToFloat(discount)).map(savings => cents - cents * savings)
    )
    .fold(x => x)
}
