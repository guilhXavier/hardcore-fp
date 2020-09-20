const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: `Box(${x})`,
});

const nextCharForNumberStringBox = (str) =>
  Box(str)
    .map((x) => x.trim())
    .map((trimmed) => parseInt(trimmed, 10))
    .map((number) => new Number(number + 1))
    .fold(String.fromCharCode);

console.log(nextCharForNumberStringBox("  64"));

const first = (xs) => xs[0];

const halfTheFirstLargeNumber = (xs) => {
  const found = xs.filter((x) => x >= 20);
  const answer = first(found) / 2;
  return `The answer is ${answer}`;
};

const halfTheFirstLargeNumber = (xs) =>
  Box(xs)
    .map((x) => xs.filter((x) => x >= 20))
    .map((x) => first(x) / 2)
    .fold((answer) => `The answer is ${answer}`);

const res = halfTheFirstLargeNumber([1, 4, 50]);
console.log(res);
