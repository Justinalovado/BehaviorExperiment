import React from "react";
import { useNavigate } from 'react-router-dom'
import "./About.css";

function About() {
  const navigate = useNavigate();
  const warpHome = () => {
    navigate("/");
  }
  return (
    <div className="About-page">
      <h2 className="section-title fadeInDown">Welcome to BEF</h2>
      <p className="section-subtitle fadeInDown">Designed to help patients track their progress and share their experiences with their psychologists during Cognitive Behavioural Therapy (CBT).</p>
      <p className="fadeInDown">With our easy-to-use interface, patients can easily record their thoughts, feelings, and behaviours over time, giving them a clear picture of their progress and helping them stay motivated on their journey to better mental health.</p>
      <p className="fadeInDown">By providing valuable insights into patients' experiences, our BEF also helps psychologists tailor their treatment plans to better suit their patients' needs, ultimately leading to more successful outcomes.</p>
      {/* <button className="backToMenuButton" onClick={warpHome}>Back To Home</button> */}
      <button style={{backgroundColor: "white", color: "black", padding:"15px 120px", marginTop: "15px"}} onClick={warpHome}>
        <label style={{fontSize: "18px"}}>Back To Home</label>
      </button>
    </div>
  );
}

export default About;
