const sum = (a, b) => {
  return a + b;
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

export { sum, substract, multiply, divide };

// module.exports = {
//   add: sum,
//   substract: substract,
//   multiply: multiply,
//   divide: divide
// }