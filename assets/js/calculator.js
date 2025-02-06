// operator and its corresponding function

class Calculator {
  static #numerical = "1234567890";
  #op1;
  #op2;
  #op;
  #stack;
  #takeInput;
  #digitInput;

  constructor() {
    this.operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    this.#op1 = "";
    this.#op2 = "";
    this.#op = "";
    this.#stack = [];
    this.#takeInput = true;
  }

  // getters and setters
  getTakeInput() {
    return this.#takeInput;
  }

  setTakeInput(boolean) {
    this.#takeInput = boolean;
  }

  getDigitInput() {
    return this.#digitInput;
  }

  setDigitInput(value) {
    if (Calculator.#numerical.includes(value)) {
      this.#digitInput = value;
    }
  }

  // take input for an operand
  enterInput(operand) {
    while (this.#takeInput) {}
  }

  operate(op1, op2, op) {
    try {
      if (!operators[op]) {
        throw new Error("The operator does not exist in this calculator.");
      }
      return operators[op](op1, op2);
    } catch (e) {
      console.log(e.message);
    }
  }
}
