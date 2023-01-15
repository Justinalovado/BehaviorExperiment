import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/Slider';
import "./PreActivity.css";

function PreActivity() {
	const [Metrics, setMetrics] = useState({});
	const [Part, setPart] = useState(0)
	const navigate = useNavigate();
	const NEXT_TXT = "Next ->";
	const PREV_TXT = "<- Prev";

	const generateKey = (pre) => {
		return `${ pre }_${ new Date().getTime() }`;
	}


	const printMetric = () => {
		console.log(Metrics);
	}

	const saveMetrics = () => {
		localStorage.setItem(generateKey("record_"), JSON.stringify(Metrics))
	}

	const nextSection = () => {
		if (Part + 1 < section.length){
			setPart(Part + 1)
		}else{
			saveMetrics()
			navigate("/PostActivity")
		}
	}
	const prevSection = () => {
		if (Part > 0){
			setPart(Part - 1);
		}else{
			navigate('/');
		}
	}

	const section = [
		(
			<div className='met-questions'>
				<h2>How anxious are you?</h2>
				<Slider curMetric="met-1" Metrics={Metrics} setMetrics={setMetrics} />
			</div>
		), (
			<div className='met-questions'>
				<h2>How strongly do you feel:</h2>
				<p>Your worst fear will happen?</p>
				<Slider curMetric="met-2" Metrics={Metrics} setMetrics={setMetrics} />
				<p>You will be judged negatively?</p>
				<Slider curMetric="met-3" Metrics={Metrics} setMetrics={setMetrics} />
				<p>You will make a bad impression during the activity?</p>
				<Slider curMetric="met-4" Metrics={Metrics} setMetrics={setMetrics} />
				<p>You will appear anxious during the activity?</p>
				<Slider curMetric="met-5" Metrics={Metrics} setMetrics={setMetrics} />
			</div>
		), (
			<div className='met-questions'>
				<h2>How bad do you think the outcome of the activity will be?</h2>
				<Slider curMetric="met-6" Metrics={Metrics} setMetrics={setMetrics} />
			</div>
		)
	]

  return (
    <div className='pre-act-container'>
			<div className='slide-container'>
				{section[Part]}
				{/* <button onClick={printMetric}>print</button> */}
			</div>
			<div className='btn-container'>
				<button onClick={nextSection}>{NEXT_TXT}</button>
				<button onClick={prevSection}>{PREV_TXT}</button>
			</div>
    </div>
  )
}

export default PreActivity;