const { curry } = require("ramda");

const add = (x, y) => x + y;

const modulo = curry((x, y) => y % x);

const isOdd = modulo(2);

const filter = curry((f, xs) => xs.filter(f));

const getOdds = filter(isOdd);

const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement)
);

const replaceVowels = replace(/[AEIOU]/gim, "!");

const result = replaceVowels("Hey I have words");

console.log(result);
