// Setup
//==============
const R = require("ramda");

// Example Data
const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

// Ex 1
// const isLastInStock = (cars) => {
//   var reversed_cars = _.last(cars);
//   return _.prop("in_stock", reversed_cars);
// };

const isLastInStockComp = R.compose(R.prop("in_stock"), R.last)(CARS);

console.log(isLastInStockComp);

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car

const nameOfFirstCar = R.compose(R.prop("name"), R.head)(CARS);

console.log(nameOfFirstCar);

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

const _average = function (xs) {
  return R.reduce(R.add, 0, xs) / xs.length;
}; // <- leave be

const averageDollarValue_ = function (cars) {
  const dollar_values = R.map(R.prop("dollar_value"), cars);
  return _average(dollar_values);
};

var averageDollarValue = function (cars) {
  var dollar_values = R.map(function (c) {
    return c.dollar_value;
  }, cars);
  return _average(dollar_values);
};

const avgDollarValueComp = R.compose(
  _average,
  R.map(R.prop("dollar_value"))
)(CARS);

console.log(avgDollarValueComp);

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names: e.g: sanitizeNames(["Hello World"]) //=> ["hello_world"].

const _underscore = R.replace(/\W+/g, "R"); //<-- leave this alone and use to sanitize

const sanitize = R.compose(_underscore, R.toLower);

const sanitizeNames = R.compose(R.map(sanitize))(["Hello world", "Hi josh"]);

console.log(sanitizeNames);

// Bonus 1:
// ============
// Refactor availablePrices with compose.

const availablePrices = function (cars) {
  const available_cars = R.filter(R.prop("in_stock"), cars);
  return available_cars.map((x) => formatMoney(x.dollar_value)).join(", ");
};

const formatVal = (x) => formatMoney(x.dollar_value);

const nAvailablePrices = R.compose(
  R.join,
  R.map(formatVal),
  R.filter(R.prop("in_stock"))
)(CARS);

// Bonus 2:
// ============
// Refactor to pointfree.

const fastestCar = function (cars) {
  const sorted = _.sortBy((car) => car.horsepower, cars);
  const fastest = _.last(sorted);
  return fastest.name + " is the fastest";
};

const nFastestCar = R.compose(
  R.concat(" is the fastest"),
  R.prop("name"),
  R.last,
  R.sortBy(R.prop("horsepower"))
)(CARS);
