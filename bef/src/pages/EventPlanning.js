import { useState } from "react";

import Question from "../components/Question";
import Button from "../components/Button";
import Option from "../components/Option";
import Modal from "../components/Modal";
import "./EventPlanning.css";

function EventPlanning() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="EventPlanning">
      <Question />
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
      <div className="option-container">
        <Option />
        <Option />
        <Option />
        <Option />
        <Option />
        <Button className="addButton" text="Add New +" onClick={() => setOpenModal(true)}/>
      </div>

      <div className="button-container">
        <Button className="nextButton" text={"Next ->"} />
        <Button className="cancelButton" text={"Cancel"} />
      </div>
    </div>
  );
}

export default EventPlanning;
