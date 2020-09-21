const R = require("ramda");

const add = R.curry((x, y) => x + y);

const concat = R.curry((y, x) => x + y);

const toUpper = (str) => str.toUpperCase();

const exclaim = (str) => str + "!";

const first = (xs) => xs[0];

// const compose = (f, g) => (x) => f(g(x));

const loudFirst = R.compose(toUpper, first);
const shout = R.compose(concat("!"), loudFirst);

console.log(shout("tears"));
