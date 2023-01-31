import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Landing.css"

export default function Landing() {
	const navigate = useNavigate();
	const warpPlanning = () => {navigate("/EventPlanning")};
	const warpQuery = () => {navigate("/Query")};

  return (
   <div className="landing">
			<h1>Welcome</h1>
   		<div className='btn-container'>
				<button onClick={warpPlanning}>Start Activity</button>
				<button onClick={warpQuery}>Find Result</button>
  		</div>
  	</div>
  )
}
