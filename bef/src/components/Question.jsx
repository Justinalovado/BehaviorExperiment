import React from "react";
import "./Question.css";

function Question({ question, className, style }) {
  
  return (
    <div className={`question ${className}`} style={style}>
      <h1>{question}</h1>
    </div>
  );
}

export default Question;
