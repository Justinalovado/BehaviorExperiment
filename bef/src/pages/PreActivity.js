import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import "./PreActivity.css";

function PreActivity() {
	const [Metrics, setMetrics] = useState({});
	const [Part, setPart] = useState(0)

	const printMetric = () => {
		console.log(Metrics);
	}

	const nextSection = () => {
		if (Part + 1 < section.length){
			setPart(Part + 1);
		}
	}
	const prevSection = () => {
		if (Part > 0){
			setPart(Part - 1);
		}
	}

	const section = [
		(
			<div className='met-questions'>
				<div>How anxious are you?</div>
				<Slider curMetric="met-1" Metrics={Metrics} setMetrics={setMetrics} />
			</div>
		),(
			<div className='met-questions'>
				<div>How strongly do you feel:</div>
				<div>Your worst fear will happen?</div>
				<Slider curMetric="met-2" Metrics={Metrics} setMetrics={setMetrics} />
				<div>You will be judged negatively?</div>
				<Slider curMetric="met-3" Metrics={Metrics} setMetrics={setMetrics} />
				<div>You will make a bad impression during the activity?</div>
				<Slider curMetric="met-4" Metrics={Metrics} setMetrics={setMetrics} />
				<div>You will appear anxious during the activity?</div>
				<Slider curMetric="met-5" Metrics={Metrics} setMetrics={setMetrics} />
			</div>
		),(
			<div className='met-questions'>
				<div>How bad do you think the outcome of the activity will be?</div>
				<Slider curMetric="met-6" Metrics={Metrics} setMetrics={setMetrics} />
			</div>
		)

	]

  return (
    <div className='container'>
			<div className='slide-container'>
				{section[Part]}
				{/* <button onClick={printMetric}>print</button> */}
			</div>
			<div className='btn-conatiner'>
				<button onClick={prevSection}>prev</button><br></br>
				<button onClick={nextSection}>next</button>
			</div>
    </div>
  )
}

export default PreActivity;