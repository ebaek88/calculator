// operator and its corresponding function

class Calculator {
  constructor() {
    this.operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    this.op1;
    this.op2;
    this.op;
  }

  operate(op1, op2, op) {
    try {
      if(!operators[op]) {
        throw new Error("The operator does not exist in this calculator.");
      }
      return operators[op](op1, op2);
    } catch(e) {
      console.log(e.message);
    }
  }
}