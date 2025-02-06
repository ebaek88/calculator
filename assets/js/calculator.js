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
  // all methods are listed as class fields so that there won't be confusion over "this" within the method body
  // https://ko.javascript.info/class#ref-482
  getTakeInput = () => {
    return this.#takeInput;
  };

  setTakeInput = (boolean) => {
    this.#takeInput = boolean;
  };

  getDigitInput = () => {
    return this.#digitInput;
  };

  setDigitInput = (value) => {
    if (Calculator.#numerical.includes(value)) {
      this.#digitInput = value;
    }
  };

  // take input for an operand
  enterInput = (operand) => {
    if (this.#takeInput) {
      operand += this.getDigitInput();
    }
  };

  operate = (op1, op2, op) => {
    try {
      if (!operators[op]) {
        throw new Error("The operator does not exist in this calculator.");
      }
      return operators[op](op1, op2);
    } catch (e) {
      console.log(e.message);
    }
  };
}

function renderButtonsFunctional(calculatorInstance) {
  const numbers = document.querySelectorAll(".numeric");
  numbers.forEach( (number) => {
    number.addEventListener("click", () => {
      calculatorInstance.setDigitInput(number.textContent);
      // console.log(calculatorInstance.getDigitInput());
    });
  });
}

function main() {
  const calculator = new Calculator();

  renderButtonsFunctional(calculator);
}

main();
