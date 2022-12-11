import React from "react";
import "./Question.css";

function Question({ question }) {
  return (
    <div className="question">
      <h1>{question}</h1>
    </div>
  );
}

export default Question;
