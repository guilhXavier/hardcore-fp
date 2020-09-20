const R = require("ramda");
const split = R.curry((delimiter, string) => string.split(delimiter));

// Ex 1
const words = split(" ");

// const result = words("Jingle bells Batman smells");

// console.log(result);

// Ex 1a
const sentences = R.map(words);

// const result = sentences(["Jingle bells Batman smells", "Robin laid an egg"]);

// console.log(result);

// Ex 2
const filterQs = R.filter(R.test(/q/gi));

// const result = filterQs(["q1", "q2", "3"]);

// console.log(result);

// Ex 3
const __keepHighest = (x, y) => (x >= y ? x : y);

const max = function (xs) {
  return R.reduce(
    function (acc, x) {
      return __keepHighest(acc, x);
    },
    0,
    xs
  );
};

const nMax = R.reduce(__keepHighest, 0);

// const result = nMax([323, 523, 554, 123, 5234]);

// console.log(result);

// Bonus 1

const slice = R.curry((start, end, xs) => xs.slice(start, end));

// Bonus 2

const take = slice(0);
