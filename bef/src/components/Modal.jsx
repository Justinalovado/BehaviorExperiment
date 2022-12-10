import React from "react";
import "./Modal.css";
import Button from "./Button";

function Modal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="header">
          <h1>Type your answer here</h1>
          <p className="closeBtn" onClick={onClose}>X</p>
        </div>
        <div className="content">
          <input className="answerBox" type="text" />
          <Button className="saveBtn" text="Save" />
        </div>
      </div>
    </div>
  );
}

export default Modal;
