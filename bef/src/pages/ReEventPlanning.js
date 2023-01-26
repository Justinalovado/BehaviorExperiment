import React from 'react'
import { useState } from 'react'
import OptionList from '../components/OptionList'
import "./ReEventPlanning.css"

export default function ReEventPlanning() {
  const [part, setPart] = useState(1)
  const NEXT_TXT = "Next ->";
  const PREV_TXT = "<- Prev";
  const section = [
    (
      <div>
        <h1>What is the activity</h1>
        <OptionList key={1} name="activity" single={true} />
      </div>
    ),(
      <div>
        <h1>What are your likely safety behavirour</h1>
        <OptionList key={2} name="safe-behv" single={false} />
      </div>
    )
  ]

  function handleNext() {
    if (part<section.length - 1){
      setPart(part + 1);
    }
  }

  function handlePrev() {
    if (part > 0){
      setPart(part - 1);
    }
  }

  return (
    <div className="re-EventPlanning">
      {section[part]}
      <div className="btn-container">
        <button onClick={handleNext}>{NEXT_TXT}</button>
        <button onClick={handlePrev}>{PREV_TXT}</button>
      </div>
    </div>
  )
}
