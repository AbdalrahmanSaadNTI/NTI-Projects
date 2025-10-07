const sum01 = require('../../opSum.js');


const sum = (a, b) => {
  return sum01.sum(a, b);
}

const substract = (a, b) => {
  return a - b;
}

const multiply = (a, b) => {
  return a * b;
}

const divide = (a, b) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

module.exports = {
  "add": sum,
  "substract": substract,
  "multiply": multiply,
  "divide": divide
}