import React from 'react'
import useQuestion from '../hooks/useQuestion'
import "./Question.css";

function Question() {
  const question = useQuestion();
  return (
    <div className="question">
      <h1>{question}</h1>
    </div>
    )
}

export default Question