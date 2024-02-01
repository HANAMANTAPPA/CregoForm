import React, { useState } from "react";
import "./App.css"; // Import your CSS file for styling
// import fs from "fs";

const ExpressionForm = () => {
  const [rules, setRules] = useState([]);
  const [combinator, setCombinator] = useState("and");
  const [expression, setExpression] = useState({
    ruleType: "Age",
    operator: ">=",
    value: "",
    score: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExpression({ ...expression, [name]: value });
  };

  const handleAddExpression = () => {
    setRules([...rules, expression]);
    setExpression({
      ruleType: "Age",
      operator: ">=",
      value: "",
      score: "",
    });
  };

  const handleDeleteExpression = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Generate the expected output
    const output = {
      rules: rules.map((rule) => ({
        key: rule.ruleType.toLowerCase().replace(" ", "_"),
        output: {
          value: rule.value,
          operator: rule.operator,
          score: rule.score,
        },
      })),
      combinator,
    };
    console.log(output);
    // You can do further processing with the output here

    // let newRaw = JSON.stringify(output);
    // const fs = require("fs");
    // fs.writeFileSync("output.json", newRaw);

    // Write the output to a JSON file
    // fs.writeFile("output.json", JSON.stringify(output, null, 2), (err) => {
    //   if (err) throw err;
    //   console.log("Output written to output.json");
    // });

    // Create a Blob object from the JSON string
    const blob = new Blob([JSON.stringify(output, null, 2)], {
      type: "application/json",
    });
    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    // Cleanup
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1 className="heading">Expression Engine</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="connectorType">Connector Type</label>
          <select
            className="form-control"
            name="combinator"
            value={combinator}
            onChange={(e) => setCombinator(e.target.value)}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ruleType">Rule Type</label>
          <select
            className="form-control"
            name="ruleType"
            value={expression.ruleType}
            onChange={handleInputChange}
          >
            <option value="Age">Age</option>
            <option value="Credit Score">Credit Score</option>
            <option value="Account Balance">Account Balance</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="operator">Operator</label>
          <select
            className="form-control"
            name="operator"
            value={expression.operator}
            onChange={handleInputChange}
          >
            <option value=">=">{">="}</option>
            <option value="<=">{"<="}</option>
            <option value=">">{">"}</option>
            <option value="<">{"<"}</option>
            <option value="=">{"="}</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input
            type="text"
            className="form-control"
            name="value"
            value={expression.value}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="score">Score</label>
          <input
            type="text"
            className="form-control"
            name="score"
            value={expression.score}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddExpression}
        >
          Add Expression
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="expression-list">
        <h2>Expressions:</h2>
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>
              {rule.ruleType} {rule.operator} {rule.value} (Score: {rule.score}){" "}
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteExpression(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpressionForm;
