import React from 'react'
import { useEffect, useState } from 'react';
import "./Slider.css"


function Slider( { curMetric, Metrics, setMetrics } ) {
	const [slideValue, setslideValue] = useState(50);
	const handleUpdate = () => {
		let val = document.getElementById(`${curMetric}`).value
		setslideValue(val)
		setMetrics({
			...Metrics,
			[curMetric]:val
		})
		const elem = document.getElementById(`${curMetric}-pointer`);
		elem.style.paddingLeft = (val*0.942) + "%";
	}

	useEffect(() => {
		handleUpdate();
	},[])
	

  return (
		<div className='slider'>
			<div className='pointer-track'id={`${curMetric}-pointer`}>
				<div className='pointer-box'>
					{slideValue}
				</div>
			</div>
			<input className="slider-track" id={curMetric} type="range" min="0" max="100" step="5" onChange={handleUpdate}/>
			<div className="label-container">
				<div>0</div>
				<div>100</div>
			</div>
		</div>
  )
};

export default Slider;