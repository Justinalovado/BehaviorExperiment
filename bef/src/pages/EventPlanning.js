import { useEffect, useState } from "react";
import useQuestion from "../hooks/useQuestion";
import useOption from "../hooks/useOption";
import Question from "../components/Question";
import Button from "../components/Button";
import Option from "../components/Option";
import Modal from "../components/Modal";
import "./EventPlanning.css";

// optionList will be sent at the end as the response of the client (backend)
// questionIdx is the index of the question
// option is the answer to the question
// addOption is a function that adds the answer to the optionList 
// removeOption is a function that removes the answer from the optionList
// openModal is a boolean that determines whether the modal is open or not
// setOpenModal is a function that sets the openModal to true or false
// onTextChange is a function that sets the option to the text that is typed in the modal
// optionIdx is the unique index/key of the answer
// generateKey is a function that generates a unique key for the answer

// useEffect is a function that is called when the component is mounted
// useEffect is called when the questionIdx is changed
// useEffect is called when the optionList is changed

function EventPlanning() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const question = useQuestion(questionIdx);
  const { optionList, setOptionList, addOption, removeOption } = useOption();
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("");
  
  const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }

  useEffect(() => {
    //save idx
    const idx = JSON.parse(localStorage.getItem("idx"));
    if (idx) {
      setQuestionIdx(idx);
    }
  }, []);

  useEffect(() => {
    if (questionIdx < 3) {
      localStorage.setItem("idx", JSON.stringify(questionIdx));
    }
  }, [questionIdx]);

  return (
    <div className="EventPlanning">
      <Question question={question} />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        option={option}
        onTextChange={(text) => setOption(text)}
        addOption={addOption}
        questionIdx={questionIdx}
        optionIdx={generateKey(option)}
      />
      <div className="option-container"> 
      {/* filter() for getting answers to the corresponding questions */}
        {optionList.filter(item => item.questionIdx === questionIdx).map((item) => (
          <Option key={item.optionIdx}
            text={item.option}
            removeOption={removeOption}
            optionIdx={item.optionIdx}
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
            if (questionIdx < 2) {
              setQuestionIdx(questionIdx + 1);
            }
          }}
        />

        {questionIdx > 0 && (
          <Button
            className="prevButton"
            text={"<- Prev"}
            onClick={() => {
              if (questionIdx > 0) {
                setQuestionIdx(questionIdx - 1);
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
