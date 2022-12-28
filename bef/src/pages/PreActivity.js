import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import Slider from '../components/Slider';
import "./PreActivity.css";

function PreActivity() {
	const [Metrics, setMetrics] = useState({});

	// const addMetric = (name, val) => {
	// 	setMetrics(...Metrics, ...{[name]:[val]});
	// }
	const printMetric = () => {
		console.log(Metrics);
	}

	
  return (
    <div className='container'>
			<div className='slide-container'>
				<Slider curMetric="met-1" Metrics={Metrics} setMetrics={setMetrics} />
				<Slider curMetric="met-2" Metrics={Metrics} setMetrics={setMetrics} />
				<button onClick={printMetric}>print</button>
			</div>
			<div className='btn-conatiner'>
				buttons here
			</div>
    </div>
  )
}

export default PreActivity;