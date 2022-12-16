import { useEffect, useState } from "react";
import useQuestion from "../hooks/useQuestion";
import useOption from "../hooks/useOption";
import Question from "../components/Question";
import Button from "../components/Button";
import Option from "../components/Option";
import Modal from "../components/Modal";
import "./EventPlanning.css";

// optionList will be sent at the end as the response of the client
// idx is the index of the question
// option is the answer to the question
// addOption is a function that adds the answer to the optionList
// removeOption is a function that removes the answer from the optionList
// openModal is a boolean that determines whether the modal is open or not
// setOpenModal is a function that sets the openModal to true or false
// onTextChange is a function that sets the option to the text that is typed in the modal

function EventPlanning() {
  const [idx, setIdx] = useState(0);
  const question = useQuestion(idx);
  const { optionList, setOptionList, addOption, removeOption } = useOption();
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("");
  
  useEffect(() => {
    //save idx
    const idx = JSON.parse(localStorage.getItem("idx"));
    if (idx) {
      setIdx(idx);
    }
  }, []);

  useEffect(() => {
    if (idx < 3) {
      localStorage.setItem("idx", JSON.stringify(idx));
    }
  }, [idx]);

  return (
    <div className="EventPlanning">
      <Question question={question} />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        option={option}
        onTextChange={(text) => setOption(text)}
        addOption={addOption}
        idx={idx}
      />
      <div className="option-container"> 
      {/* filter() for getting answers to the corresponding questions */}
        {optionList.filter(item => item.idx === idx).map((item) => (
          <Option key={item.option}
            text={item.option}
            />
        ))}
        <Button
          className="addButton"
          text="Add New +"
          onClick={() => {
            setOpenModal(true)
            setOption("");
          }}
        />
      </div>

      <div className="button-container">
        <Button
          className="nextButton"
          text={"Next ->"}
          onClick={() => {
            if (idx < 2) {
              setIdx(idx + 1);
            }
          }}
        />

        {idx > 0 && (
          <Button
            className="prevButton"
            text={"<- Prev"}
            onClick={() => {
              if (idx > 0) {
                setIdx(idx - 1);
              }
            }}
          />
        )}

        <Button className="cancelButton" text={"Cancel"} />
      </div>
    </div>
  );
}

export default EventPlanning;
