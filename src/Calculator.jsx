import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("0"); // Current number input
  const [formula, setFormula] = useState(""); // Full formula
  const [currentOperator, setCurrentOperator] = useState(""); // Current operator
  const [lastClicked, setLastClicked] = useState(""); // Last clicked button
  const [warningButton, setWarningButton] = useState(null);

  const handleNumber = (num) => {
    if (lastClicked === "=") {
      setInput(num);
      setFormula(num);
      setCurrentOperator("");
    } else if (input === "0" && num === "0") {
      return;
    } else if (input === "0" || /[+\-*/]/.test(lastClicked)) {
      setInput(num);
      setFormula(formula + num);
    } else {
      setInput(input + num);
      setFormula(formula + num);
    }
    setLastClicked(num);
    setWarningButton(num);
  };

  const handleOperator = (operator) => {
    if (lastClicked === "=") {
      setFormula(input + operator);
    } else if (/[+\-*/]$/.test(formula)) {
      setFormula(formula.replace(/[+\-*/]$/, operator));
    } else {
      setFormula(formula + operator);
    }
    setCurrentOperator(operator); // Update current operator
    setLastClicked(operator);
  };

  const handleDecimal = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
      setFormula(formula + ".");
    }
    setLastClicked(".");
  };

  const handleClear = () => {
    setInput("0");
    setFormula("");
    setCurrentOperator("");
    setLastClicked("");
  };

  const handleEquals = () => {
    try {
      const result = eval(formula); // Evaluate the formula
      setInput(result.toString());
      setFormula(result.toString());
      setCurrentOperator("");
      setLastClicked("=");
    } catch (error) {
      setInput("Error");
      setFormula("");
      setCurrentOperator("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto w-md-25 w-50 bg-dark text-light p-2">
        <div className="card-body ">
          <div
            id="display"
            className="form-control text-right mb-3 d-flex justify-content-between bg-body-tertiary"
          >
            <span>{input}</span>
            <span>{currentOperator}</span>
          </div>
          <div className="d-grid gap-2">
            <button id="clear" className="btn btn-danger" onClick={handleClear}>
              AC
            </button>
            <div className="row gap-2">
              {["7", "8", "9"].map((num) => (
                <button
                  key={num}
                  id={num === "7" ? "seven" : num === "8" ? "eight" : "nine"}
                  className={`btn btn-light col ${
                    warningButton === num ? " btn-outline-warning" : ""
                  }`}
                  onClick={() => handleNumber(num)}
                >
                  {num}
                </button>
              ))}
              <button
                id="divide"
                className="btn btn-secondary col"
                onClick={() => handleOperator("/")}
              >
                /
              </button>
            </div>
            <div className="row gap-2">
              {["4", "5", "6"].map((num) => (
                <button
                  key={num}
                  id={num === "4" ? "four" : num === "5" ? "five" : "six"}
                  className="btn btn-light col"
                  onClick={() => handleNumber(num)}
                >
                  {num}
                </button>
              ))}
              <button
                id="multiply"
                className="btn btn-secondary col"
                onClick={() => handleOperator("*")}
              >
                *
              </button>
            </div>
            <div className="row gap-2">
              {["1", "2", "3"].map((num) => (
                <button
                  key={num}
                  id={num === "1" ? "one" : num === "2" ? "two" : "three"}
                  className="btn btn-light col"
                  onClick={() => handleNumber(num)}
                >
                  {num}
                </button>
              ))}
              <button
                id="subtract"
                className="btn btn-secondary col"
                onClick={() => handleOperator("-")}
              >
                -
              </button>
            </div>
            <div className="row gap-2">
              <button
                id="zero"
                className="btn btn-light col-6"
                onClick={() => handleNumber("0")}
              >
                0
              </button>
              <button
                id="decimal"
                className="btn btn-light col"
                onClick={handleDecimal}
              >
                .
              </button>
              <button
                id="add"
                className="btn btn-secondary col"
                onClick={() => handleOperator("+")}
              >
                +
              </button>
            </div>
            <button
              id="equals"
              className="btn btn-warning"
              onClick={handleEquals}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
