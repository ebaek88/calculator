class Calculator {
  static numerical = "1234567890.";
  #op1;
  #op2;
  #op;
  #stack;
  #continueInput; // if false, write over the display, if true, continue writing on the display

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
    this.#continueInput = false;
  }

  // clear the display
  clearDisplay = () => {
    // set the display to 0
    const display = document.querySelector(".display");
    this.#stack.length === 0
      ? (display.textContent = "0")
      : (display.textContent = "");
    this.#continueInput = false;
  };

  // delete one digit at the end
  deleteDigit = () => {
    let display = document.querySelector(".display");
    if (display.textContent.length === 1) {
      display.textContent = "0";
      this.#continueInput = false;
    } else {
      display.textContent = display.textContent.slice(
        0,
        display.textContent.length - 1
      );
    }
  };

  // getters and setters
  // all methods are listed as class fields so that there won't be confusion over "this" within the method body
  // https://ko.javascript.info/class#ref-482

  // take input for an operand and push it to the stack
  takeInput = () => {
    const display = document.querySelector(".display");
    this.#stack.push(+display.textContent);
  };

  operate = (op1, op2, op) => {
    try {
      if (!this.operators[op]) {
        throw new Error("The operator does not exist in this calculator.");
      }
      return this.operators[op](Number(op1), Number(op2));
    } catch (err) {
      console.log(err.message);
    }
  };

  // rendering the all clear button
  renderAllClearButtonFunctional = () => {
    const allClear = document.querySelector("#all-clear");
    allClear.addEventListener("click", () => {
      // empty the stack
      while (this.#stack.length !== 0) {
        this.#stack.pop();
      }
      this.clearDisplay();
    });
  };

  // rendering the backspace button
  renderBackspaceButtonFunctional = () => {
    const backspace = document.querySelector("#backspace");
    backspace.addEventListener("click", this.deleteDigit);
  };

  // rendering the number buttons
  renderNumericButtonsFunctional = () => {
    const numbers = document.querySelectorAll(".numeric");
    numbers.forEach((number) => {
      number.addEventListener("click", () => {
        const currentDisplay = document.querySelector(".display");
        if (Calculator.numerical.includes(number.textContent)) {
          if (!this.#continueInput) {
            currentDisplay.textContent = number.textContent;
          } else {
            currentDisplay.textContent += number.textContent;
          }
        }
        this.#continueInput = true;
      });
    });
  };

  // rendering the operator buttons
  renderOperatorButtonsFunctional = () => {
    const operators = document.querySelectorAll(".operator");
    const display = document.querySelector(".display");
    operators.forEach((operator) => {
      operator.addEventListener("click", (e) => {
        switch (this.#stack.length) {
          case 0:
            this.takeInput();
            this.#stack.push(e.target.textContent);
            break;
          case 1:
            this.#stack.pop();
            this.#stack.push(display.textContent);
            this.#stack.push(e.target.textContent);
            break;
          case 2:
            // check if display is "". because when the operator is clicked right after the first operator is clicked, it just
            // updates the operator
            // otherwise, takeInput then operate
            if (!this.#continueInput) {
              this.#stack.pop();
              this.#stack.push(e.target.textContent);
            } else {
              this.takeInput();
              this.#op2 = this.#stack.pop();
              this.#op = this.#stack.pop();
              this.#op1 = this.#stack.pop();
              const result = this.operate(this.#op1, this.#op2, this.#op);
              this.#stack.push(result);
              display.textContent = result;
              this.#stack.push(e.target.textContent);
            }
            break;
          default: // when the stack is full(op1, op, op2) or when there is one operand is in the stack already and
            // an operator and another operand is ready to go into the stack
            this.#op2 = this.#stack.pop();
            this.#op = this.#stack.pop();
            this.#op1 = this.#stack.pop();
            const result = this.operate(this.#op1, this.#op2, this.#op);
            this.#stack.push(result);
            // display result?
            display.textContent = result;
            this.#stack.push(e.target.textContent);
            break;
        }
        this.#continueInput = false;
      });
    });
  };

  // rendering the equal button
  renderEqualButtonFunctional = () => {
    const equal = document.querySelector("#equal");
    const display = document.querySelector(".display");
    equal.addEventListener("click", () => {
      if (this.#stack.length === 2 && this.#continueInput === true) {
        this.takeInput();
        this.#op2 = this.#stack.pop();
        this.#op = this.#stack.pop();
        this.#op1 = this.#stack.pop();
        const result = this.operate(this.#op1, this.#op2, this.#op);
        display.textContent = result;
        this.#stack.push(result);
      }
    });
  };
}

function main() {
  // create an instance of Calculator
  const calculator = new Calculator();

  // render the number buttons
  calculator.renderNumericButtonsFunctional();

  // clear the display and the stock
  calculator.renderAllClearButtonFunctional();

  calculator.renderBackspaceButtonFunctional();

  calculator.renderOperatorButtonsFunctional();

  calculator.renderEqualButtonFunctional();

  // take the input for op1 only when the stack is empty

  // push op1 to the stack

  // take the input for the operator

  // push op to the stack

  // take the input for op2 only when op1 and op are already in the stack

  // when the operator button is clicked, calculate the result

  // push the result to the stack
}

main();
