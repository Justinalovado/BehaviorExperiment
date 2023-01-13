import { useEffect, useState } from "react";
import useQuestion from "../hooks/useQuestion";
import useOption from "../hooks/useOption";
import Question from "../components/Question";
import Button from "../components/Button";
import Option from "../components/Option";
import Modal from "../components/Modal";
import "./EventPlanning.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// optionList will be sent at the end as the response of the client (backend)
// questionIdx is the index of the question
// option is the answer to the question
// addOption is a function that adds the answer to the optionList 
// removeOption is a function that removes the answer from the optionList
// openModal is a boolean that determines whether the modal is open or not
// setOpenModal is a function that sets the openModalf to true or false
// onTextChange is a function that sets the option to the text that is typed in the modal
// optionIdx is the unique index/key of the answer
// generateKey is a function that generates a unique key for the answer
// useOption is a custom hook that is used to get the optionList, setOptionList, addOption, and removeOption
// useQuestion is a custom hook that is used to get the question

// useEffect is a function that is called when the component is mounted
// useEffect is called when the questionIdx is changed
// useEffect is called when the optionList is changed

function EventPlanning() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const question = useQuestion(questionIdx, "eventPlanning");
  const { optionList, setOptionList, addOption, removeOption } = useOption();
  const [openModal, setOpenModal] = useState(false);
  const [finish, setFinish] = useState(false);
  const [option, setOption] = useState("");
  const navigate = useNavigate();
  const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }

  const handleStart = () => {navigate("/PreActivity")}

  useEffect(() => {
    // load the question index from the local storage
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

  // finish is a boolean that determines whether the client has finished the activity or not
  // if finish is true, the client will see the finishMessage
  // if finish is false, the client will see the questions and the answers
  if (finish) {
    return (
      <div className="EventPlanning">
        <div className="finishMessage">
          <span style={{fontSize: "1.4em"}}>Great job!</span>
          <p>We have saved your activity</p>
        </div>
        <div className="option-container" style={{overflowY: "visible"}}>
          <span style={{fontSize: "2em"}}><p>Would you like to:</p></span>
          <Button className="addButton" text="Start Activity!" onClick={handleStart} />
          <Button className="backToMenuButton" text="Back to Menu"/>
        </div>
      </div>
    );
  }

  return (
    <div className="EventPlanning">
      <Question question={question} />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        option={option}
        onTextChange={(text) => setOption(text)}
        addOption={addOption}
        question={question}
        optionIdx={generateKey(option)}
      />

      <div className="options">
        <div className="option-container"> 
        {/* filter() for getting answers to the corresponding questions */}
          { optionList.filter(item => item.question === question).map((item) => (
            <Option key={item.optionIdx}
              text={item.option}
              removeOption={removeOption}
              optionIdx={item.optionIdx}
              />
          ))}
        </div>
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
          className={questionIdx !== 2 ? "nextButton" : "saveButton"}
          text={questionIdx !== 2 ? "Next ->" : "Save"}
          onClick={() => {
            if (questionIdx < 2) {
              setQuestionIdx(questionIdx + 1);
            }
            else {
              // save optionList to the backend
              // optionList is the response of the client
              // setQuestionIdx(0) is for resetting the questionIdx
              setFinish(true);
              console.log(optionList);
              localStorage.removeItem("idx");
              
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
