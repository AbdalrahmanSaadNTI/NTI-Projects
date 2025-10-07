//import { add,substract } from "./myModules/mathOps.js";
import * as mathOps from "./myModules/mathOps.js";
const { sum, substract, multiply, divide } = mathOps;

console.log("Sum of 5 and 3 is: ", sum(5, 3));

console.log("Subtraction of 5 and 3 is: ", substract(5, 3));

console.log("Multiplication of 5 and 3 is: ", multiply(5, 3));

console.log("Division of 5 by 3 is: ", divide(5, 3));