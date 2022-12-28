import React from 'react'
import { useEffect, useState } from 'react';

function Slider( { curMetric, Metrics, setMetrics } ) {
	const [slideValue, setslideValue] = useState(50);
	const handleUpdate = () => {
		let val = document.getElementById(`${curMetric}`).value
		setslideValue(val)
		setMetrics({
			...Metrics,
			[curMetric]:val
		})
	}

	useEffect(() => {
		handleUpdate();
	},[])
	

  return (
		<div className='slider'>
			<div className='slide-value'>{slideValue}</div>
			<input id={curMetric} type="range" min="0" max="100" step="10" onChange={handleUpdate}/>
			<div>
				<div className='range-min'>0</div>
				<div className='range-max'>100</div>
			</div>
		</div>
  )
};

export default Slider;