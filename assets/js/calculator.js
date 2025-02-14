class Calculator {
  static numerical = "1234567890";
  static operator = "+-*/";
  #op1;
  #op2;
  #op;
  #stack;
  #continueInput; // if false, write over the display, if true, continue writing on the display
  #decimalUsed; // decimal button can be clicked only when it is false

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
    this.#decimalUsed = false;
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

    if (!display.textContent.includes(".")) {
      this.#decimalUsed = false;
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
      return +this.operators[op](Number(op1), Number(op2)).toFixed(4);
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

    // adding keydonw event
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Backspace") {
        this.deleteDigit();
      }
    });

    // adding click event
    backspace.addEventListener("click", this.deleteDigit);
  };

  // rendering +/- button. +/- button changes the sign to negative if positive and vice versa
  renderChangeSignButtonFunctional = () => {
    const changeSign = document.querySelector("#change-sign");
    let display = document.querySelector(".display");
    changeSign.addEventListener("click", () => {
      if (this.#continueInput === true) {
        if (display.textContent[0] === "-") {
          let temp = display.textContent.slice(1);
          display.textContent = temp;
        } else {
          let temp = display.textContent;
          display.textContent = "-" + temp;
        }
      }
    });
  };

  // rendering the random integer button. It display an integer between 0 and 99999
  renderRandomIntButtonFunctional = () => {
    const rand = document.querySelector("#random-int");
    const display = document.querySelector(".display");
    rand.addEventListener("click", () => {
      display.textContent = Math.floor(Math.random() * 100000);
    });
  };

  // rendering the number buttons
  renderNumericButtonsFunctional = () => {
    const numbers = document.querySelectorAll(".numeric");
    const display = document.querySelector(".display");

    // adding keydown events
    document.addEventListener("keydown", (evt) => {
      if (Calculator.numerical.includes(evt.key) && this.#stack.length !== 1) {
        if (!this.#continueInput) {
          display.textContent = evt.key;
        } else {
          display.textContent += evt.key;
        }
      }
      this.#continueInput = true;
    });

    // adding click events
    numbers.forEach((number) => {
      number.addEventListener("click", () => {
        if (
          Calculator.numerical.includes(number.textContent) &&
          this.#stack.length !== 1 // pushing numbers consecutively in a stack is not logical
        ) {
          if (!this.#continueInput) {
            display.textContent = number.textContent;
          } else {
            display.textContent += number.textContent;
          }
        }
        this.#continueInput = true;
      });
    });
  };

  // rendering the decimal button, so that it can be clicked only once while entering a number
  renderDecimalButtonFunctional = () => {
    const decimal = document.querySelector("#decimal");
    const display = document.querySelector(".display");

    // adding keydown event
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "." && !this.#decimalUsed && this.#stack.length !== 1) {
        display.textContent += decimal.textContent;
        this.#decimalUsed = true;
        this.#continueInput = true;
      }
    });

    // adding click events
    decimal.addEventListener("click", () => {
      // pushing numbers consecutively in a stack is not logical
      if (!this.#decimalUsed && this.#stack.length !== 1) {
        display.textContent += decimal.textContent;
        this.#decimalUsed = true;
        this.#continueInput = true;
      }
    });
  };

  // rendering the operator buttons
  renderOperatorButtonsFunctional = () => {
    const operators = document.querySelectorAll(".operator");
    const display = document.querySelector(".display");

    // adding keydown events
    document.addEventListener("keydown", (evt) => {
      if (Calculator.operator.includes(evt.key)) {
        switch (this.#stack.length) {
          case 0:
            this.takeInput();
            this.#stack.push(evt.key);
            break;
          case 1:
            this.#stack.pop();
            this.#stack.push(display.textContent);
            this.#stack.push(evt.key);
            break;
          case 2:
            // check if this.#continueInput is false, because when the operator is clicked right after the first operator is clicked, it just
            // updates the operator
            // otherwise, takeInput then operate
            if (!this.#continueInput) {
              this.#stack.pop();
              this.#stack.push(evt.key);
            } else {
              this.takeInput();
              this.#op2 = this.#stack.pop();
              this.#op = this.#stack.pop();
              this.#op1 = this.#stack.pop();
              if (this.#op === "/" && this.#op2 === 0) {
                this.#stack.push(this.#op1);
                alert(
                  "You cannot divide by 0. Please choose another operator or a divisor that is not 0."
                );
                display.textContent = this.#op1;
                break;
              }
              const result = this.operate(this.#op1, this.#op2, this.#op);
              this.#stack.push(result);
              display.textContent = result;
              this.#stack.push(evt.key);
            }
            break;
          default: // when the stack is full(op1, op, op2) or when there is one operand is in the stack already and
            // an operator and another operand is ready to go into the stack
            this.#op2 = this.#stack.pop();
            this.#op = this.#stack.pop();
            this.#op1 = this.#stack.pop();
            if (this.#op === "/" && this.#op2 === 0) {
              this.#stack.push(this.#op1);
              alert(
                "You cannot divide by 0. Please choose another operator or a divisor that is not 0."
              );
              display.textContent = this.#op1;
              break;
            }
            const result = this.operate(this.#op1, this.#op2, this.#op);
            this.#stack.push(result);
            // display result?
            display.textContent = result;
            this.#stack.push(evt.key);
            break;
        }
        this.#continueInput = false;
        this.#decimalUsed = false;
      }
    });

    // adding click events
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
            // check if this.#continueInput is false, because when the operator is clicked right after the first operator is clicked, it just
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
              if (this.#op === "/" && this.#op2 === 0) {
                this.#stack.push(this.#op1);
                alert(
                  "You cannot divide by 0. Please choose another operator or a divisor that is not 0."
                );
                display.textContent = this.#op1;
                break;
              }
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
            if (this.#op === "/" && this.#op2 === 0) {
              this.#stack.push(this.#op1);
              alert(
                "You cannot divide by 0. Please choose another operator or a divisor that is not 0."
              );
              display.textContent = this.#op1;
              break;
            }
            const result = this.operate(this.#op1, this.#op2, this.#op);
            this.#stack.push(result);
            // display result?
            display.textContent = result;
            this.#stack.push(e.target.textContent);
            break;
        }
        this.#continueInput = false;
        this.#decimalUsed = false;
      });
    });
  };

  // rendering the equal button
  renderEqualButtonFunctional = () => {
    const equal = document.querySelector("#equal");
    const display = document.querySelector(".display");

    // adding keydown events
    document.addEventListener("keydown", (evt) => {
      if (
        (evt.key === "=" || evt.key === "Enter") &&
        this.#stack.length === 2 &&
        this.#continueInput === true
      ) {
        this.takeInput();
        this.#op2 = this.#stack.pop();
        this.#op = this.#stack.pop();
        this.#op1 = this.#stack.pop();
        if (this.#op === "/" && this.#op2 === 0) {
          this.#stack.push(this.#op1);
          alert(
            "You cannot divide by 0. Please choose another operator or a divisor that is not 0."
          );
          display.textContent = this.#op1;
          return;
        }
        const result = this.operate(this.#op1, this.#op2, this.#op);
        display.textContent = result;
        this.#stack.push(result);
        this.#continueInput = false;
        this.#decimalUsed = false;
      }
    });

    // adding click events
    equal.addEventListener("click", () => {
      if (this.#stack.length === 2 && this.#continueInput === true) {
        this.takeInput();
        this.#op2 = this.#stack.pop();
        this.#op = this.#stack.pop();
        this.#op1 = this.#stack.pop();
        if (this.#op === "/" && this.#op2 === 0) {
          this.#stack.push(this.#op1);
          alert(
            "You cannot divide by 0. Please choose another operator or a divisor that is not 0."
          );
          display.textContent = this.#op1;
          return;
        }
        const result = this.operate(this.#op1, this.#op2, this.#op);
        display.textContent = result;
        this.#stack.push(result);
        this.#continueInput = false;
        this.#decimalUsed = false;
      }
    });
  };
}

function main() {
  // create an instance of Calculator
  const calculator = new Calculator();

  // render the number buttons
  calculator.renderNumericButtonsFunctional();

  calculator.renderDecimalButtonFunctional();

  calculator.renderAllClearButtonFunctional();

  calculator.renderBackspaceButtonFunctional();

  calculator.renderChangeSignButtonFunctional();

  calculator.renderRandomIntButtonFunctional();

  calculator.renderOperatorButtonsFunctional();

  calculator.renderEqualButtonFunctional();
}

main();
