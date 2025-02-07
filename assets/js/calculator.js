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

  // clear the display and the stack
  clearDisplay = () => {
    // empty the stack
    while (this.#stack.length === 0) {
      this.#stack.pop();
    }

    // set the display to 0
    const display = document.querySelector(".display");
    display.textContent = "0";
  };

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
    } catch (err) {
      console.log(err.message);
    }
  };
}

function renderButtonsFunctional(calculatorInstance) {
  const numbers = document.querySelectorAll(".numeric");
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      calculatorInstance.setDigitInput(number.textContent);
      // console.log(calculatorInstance.getDigitInput());
    });
  });
}

function main() {
  // create an instance of Calculator
  const calculator = new Calculator();

  // render the buttons
  renderButtonsFunctional(calculator);

  // clear the display and the stock
  calculator.clearDisplay();

  // take the input for op1 only when the stack is empty

  // push op1 to the stack

  // take the input for the operator

  // push op to the stack

  // take the input for op2 only when op1 and op are already in the stack

  // when the operator button is clicked, calculate the result

  // push the result to the stack
}

main();
