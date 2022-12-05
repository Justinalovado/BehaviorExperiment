import Question from "../components/Question";
import Button from "../components/Button";
import Option from "../components/Option";
import "./EventPlanning.css";

function EventPlanning() {
  return (
    <div className="EventPlanning">
      <Question />
      <div className="option-container">
        <Option />
        <Option />
        <Option />
        <Option />
        <Option />
        <Button className="addButton" text={"Add New +"} />
      </div>

      <div className="button-container">
        <Button className="nextButton" text={"Next ->"} />
        <Button className="cancelButton" text={"Cancel"} />
      </div>
    </div>
  );
}

export default EventPlanning;
