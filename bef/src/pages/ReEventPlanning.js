import React from 'react'
import { useState } from 'react'
import OptionList from '../components/OptionList'
import "./ReEventPlanning.css"
import { useNavigate } from 'react-router-dom'

export default function ReEventPlanning() {
  const [part, setPart] = useState(0)
  const NEXT_TXT = "Next ->";
  const PREV_TXT = "<- Prev";
  const navigate = useNavigate();
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
    ),(
      <div>
        <h1>What is your worst fear</h1>
        <OptionList key={3} name="fear" single={false} />
      </div>
    )
  ]

  function countAct(lst) {
    return lst.filter( obj => obj.selected === true).length
  }

  function handleNext() {
    let lst = JSON.parse(localStorage.getItem("activity"));
    let len_act = countAct(lst);
    if (part === 0 && len_act < 1 ){
      return
    }
    if (part<section.length - 1){
      setPart(part + 1);
    }else{
      navigate("/preActivity")
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
