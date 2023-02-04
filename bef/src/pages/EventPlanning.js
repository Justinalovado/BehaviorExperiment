import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useQuestion from "../hooks/useQuestion";
import useOption from "../hooks/useOption";
import Question from "../components/Question";
import Button from "../components/Button";
import Option from "../components/Option";
import Modal from "../components/Modal";
import "./EventPlanning.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

export default function EventPlanning() {
  const MySwal = withReactContent(Swal);
  const [questionIdx, setQuestionIdx] = useState(0);
  const question = useQuestion(questionIdx, "eventPlanning");
  const {
    optionList,
    activityList,
    selectActivity,
    addOption,
    removeOption,
    removeActivity,
    addActivity,
  } = useOption(question);
  const [openModal, setOpenModal] = useState(false);
  const [finish, setFinish] = useState(false);
  const [option, setOption] = useState("");

  const navigate = useNavigate();
  const generateKey = (pre) => {
    return parseInt(`${new Date().getTime()}`, 10);
  };
  const handleStart = () => {
    navigate("/PreActivity");
  };

  // ---------------------------button components --------------------------- //
  const NextButton = () => {
    return (
      <Button
        className={questionIdx !== 2 ? "nextButton" : "saveButton"}
        text={questionIdx !== 2 ? "Next ->" : "Save"}
        onClick={() => {
          if (activityList.length === 0) {
            // alert("Please add an activity");
            MySwal.fire({
              html: '<span style="font-family: "Inter";"><strong>Please add an activity</strong></span>',
              icon: "error",
              confirmButtonText: "OK",
            });
          } else if (
            activityList.find((activity) => activity.selected === true) ===
            undefined
          ) {
            MySwal.fire({
              html: '<span style="font-family: "Inter";"><strong>Please select an activity</strong></span>',
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            if (questionIdx < 2) {
              setQuestionIdx(questionIdx + 1);
            } else {
              // save optionList to the backend
              // optionList is the response of the client
              // setQuestionIdx(0) is for resetting the questionIdx
              setFinish(true);
              localStorage.removeItem("idx");
            }
          }
        }}
      />
    );
  };
  const PrevButton = () => {
    return (
      <Button
        className="prevButton"
        text={"<- Prev"}
        onClick={() => {
          if (questionIdx > 0) {
            setQuestionIdx(questionIdx - 1);
          }
        }}
      />
    );
  };
  // ---------------------------button components --------------------------- //
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
          <span style={{ fontSize: "1.4em" }}>Great job!</span>
          <p>We have saved your activity</p>
        </div>
        <div className="option-container" style={{ overflowY: "visible" }}>
          <span style={{ fontSize: "2em" }}>
            <p>Would you like to:</p>
          </span>
          <Button
            className="addButton"
            text="Start Activity!"
            onClick={handleStart}
          />
          <Button className="backToMenuButton" text="Back to Menu" />
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
        addActivity={addActivity}
        question={question}
        optionIdx={generateKey("")}
      />

      <div className="options">
        <div className="option-container">
          {/* filter() for getting answers to the corresponding questions */}
          {question === "What is the activity" &&
            activityList &&
            activityList.map((item) => (
              <Option
                key={item.optionIdx}
                optionIdx={item.optionIdx}
                text={item.activity}
                style={{ cursor: "pointer" }}
                className={item.selected ? "selected" : ""}
                remove={removeActivity}
                question={question}
                onClick={(e) => {
                  selectActivity(item.optionIdx);
                }}
              />
            ))}
          {question === "What would be your likely safety behaviour" &&
            optionList["safety_behaviour"] &&
            optionList["safety_behaviour"].map((item) => (
              <Option
                key={item.optionIdx}
                text={item.option}
                question={question}
                remove={removeOption}
                optionIdx={item.optionIdx}
              />
            ))}
          {question === "What is your worst fear?" &&
            optionList["worst_fear"] &&
            optionList["worst_fear"].map((item) => (
              <Option
                key={item.optionIdx}
                text={item.option}
                question={question}
                remove={removeOption}
                optionIdx={item.optionIdx}
              />
            ))}
        </div>
        <Button
          className="addButton"
          text="Add New +"
          onClick={() => {
            setOpenModal(true);
            setOption("");
          }}
        />
      </div>

      <div className="button-container">
        <NextButton />
        {questionIdx > 0 && <PrevButton />}
        <Button className="cancelButton" text={"Cancel"} />
      </div>
    </div>
  );
}
