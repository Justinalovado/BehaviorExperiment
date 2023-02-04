import React from "react";
import "./Modal.css";
import Button from "./Button";

function Modal({ open, onClose, addOption, addActivity, question, optionIdx }) {
  if (!open) return null;
  
  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="header">
          <h1>Type your answer here</h1>
          <p className="closeBtn" onClick={() => {
            onClose();
          }}>X</p>
        </div>
        <div className="content">
          <input className="answerBox" id="input" type="text"/>
          <Button className="saveBtn" text="Save" onClick={() => {
              if (question === "What is the activity") {
                addActivity(document.getElementById("input").value, optionIdx);
              }
              else {
                addOption(document.getElementById("input").value, optionIdx, question);
              }
              onClose();
            }} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
