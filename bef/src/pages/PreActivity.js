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
			<div>
				<div>Q1</div>
				<Slider curMetric="met-1" Metrics={Metrics} setMetrics={setMetrics} />
			</div>
		),(
			<div>
				<div>Q2</div>
				<Slider curMetric="met-2" Metrics={Metrics} setMetrics={setMetrics} />
				<Slider curMetric="met-3" Metrics={Metrics} setMetrics={setMetrics} />
			</div>
		),

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