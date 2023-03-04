import React from 'react'
import "./Result.css"
import Barchart from './Barchart'

export default function Result(props) {
	const res = props.res
  const activity = res.hasOwnProperty("activity") ? res.activity : null;
  const mets = res.hasOwnProperty("metrics") ? res.metrics : null;
  const safe_behv = res.hasOwnProperty("safety_behaviour") ? res.safe_behv : null;
  const fear = res.hasOwnProperty("worst_fear")? res.worst_fear:null;

  let anx_feeling = [mets["met-1"], mets["met-8"], mets["met-9"]]
  let anx_feeling_lab = ["Before", "During", "After"]
  
  let pair_label = ["Predicted", "Actual"]
  let pred_act = {
    "Percepted Anxiety" : [mets["met-5"], mets["met-13"]],
    "Fear level" : [mets["met-2"], mets["met-11"]],
    "Fear of Negative Judgement" : [mets["met-3"], mets["met-12"]],
    "Outcome" : [mets["met-6"], mets["met-14"]]
  }


  // let anx_percept = [mets.met_5, mets.met_13]
  // let fear_met = [mets.met_2, mets.met_11]
  // let neg_judge = [mets.met_3, mets.met_12]
  // let outcome = [mets.met_6, mets.met_14]
  // let questions = [
  //    "How anxious are you?",
  //   "How strongly do you feel your worst fear will happen?",
  //   "How strongly do you feel you will be judged negatively?",
  //   "How strongly do you feel you will make a bad impression during activity?",
  //   "How strongly do you feel you will appear anxious during activity?",
  //      "How bad do you think the outcome of the activity will be?"-----
  //    "How anxious do you feel right now?",
  //   "How anxious were you at the peak anxiety level?",
  //   "How anxious did you feel at the end of activity?",
  //   "How surprised do you feel about the outcome of the activity?",
  //   "How strongly do you believe your worst fears happened during the activity?",
  //   "How strongly do you believe you were judged negatively during the activity?",
  //   "How strongly do you believe you appeared anxious during the activity?",
  //      "How bad do you think the outcome of the activity was?"
  // ]


  // const sorted = Object.entries(mets).sort((a, b) => {
  //   const keyA = a[0].split("-")[1];
  //   const keyB = b[0].split("-")[1];
  //   return keyA - keyB;
  // });

  // const mappedObj = Array(13).fill(0).map((_, i) => {
  //   const metIndex = i + 1;
  //   const metKey = `met-${metIndex}`;
  //   const found = sorted.find(([key]) => key === metKey);
  //   return found ? found[1] : 50;
  // });

  return (
    <div className='result-box'>
      {/* {JSON.stringify(res)} */}
      <div className="first-item">
        <h2>activity: {activity}</h2>
        <Barchart values={anx_feeling} label={anx_feeling_lab} />
      </div>
      {Object.entries(pred_act).map(([key, val]) => (
        <div className='stat-section'>
          <h3>{key}</h3>
          <Barchart values={val} label={pair_label}/>
        </div>
      ))}
    </div>
  )
};
