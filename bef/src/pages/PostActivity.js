/* eslint-disable react/style-prop-object */
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import storeOptionList from "../firebase";
import useQuestion from "../hooks/useQuestion";
import useOption from "../hooks/useOption";

import Modal from "../components/Modal";
import Button from "../components/Button";
import Question from "../components/Question";
import Slider from "../components/Slider";
import "./PostActivity.css";

// optionList will be sent at the end as the response of the client (backend)
// PostActivity will not show up if optionList is empty or null
const MAXIDX = 5;
const generateKey = () => {
  return parseInt(`${new Date().getTime()}`, 10);
};
let key = null;
function PostActivity() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const question = useQuestion(questionIdx, "postActivity");
  const [finish, setFinish] = useState(false);
  const {
    optionList,
    setOptionList,
    addOption,
    selectOption,
    finalizeOption,
    addText,
    activityList,
  } = useOption(finish);
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("");
  const [Metrics, setMetrics] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (questionIdx === MAXIDX) {
      key = `${generateKey()}`;
      console.log("key:", key)
    }
  }, [questionIdx])

  function Lastpage() {
    localStorage.removeItem("idx");
    function handleF5KeyPress(event) {
      if (event.keyCode === 116 || event.code === "F5") {
        event.preventDefault();
        document.removeEventListener("keydown", handleF5KeyPress)
        navigate("/")
      }
    }
    document.addEventListener("keydown", handleF5KeyPress);
    return (
      <div className="PostActivity" style={{justifyContent: "center"}}>
        <Question className="fadeInDown" question={"Thank you for your participation"} />
        <Question className="fadeInDown" question={`This is your key: ${key}`} />
        <Button className="backToMenuButton fadeInDown" text="Back to Menu" onClick={() => navigate("/")} />
      </div>
    );
  }
  // ---------------------- store the optionList to firebase ---------------------- //
  useEffect(() => {
    if (questionIdx === MAXIDX) {
      setFinish(true);
      // save optionList to firebase
      // optionList is the response of the client
      storeOptionList(key, {
        ...optionList,
        safety_behaviour: optionList["safety_behaviour"].filter((item) => item.finalized === true),
        activity: activityList.find((activity) => activity.selected === true)
          .activity,
        metrics: {
          ...Metrics,
          ...JSON.parse(localStorage.getItem("sliderRecord"))
        },
      });
    }
  }, [optionList]);
  // ------------------------------------------------------------------------------ //

  const newList = useMemo(
    () => JSON.parse(localStorage.getItem("optionList")),
    []
  );
  useEffect(() => {
    if (newList) {
      setOptionList(newList);
    }
  }, [newList]);

  useEffect(() => {
    if (questionIdx > 1 && document.getElementById(question)) {
      document.getElementById(question).value = "";
    }
  }, [questionIdx]);

  useEffect(() => {
    // load the question index from the local storage
    const idx = JSON.parse(localStorage.getItem("idx"));
    if (idx) {
      setQuestionIdx(idx);
    }
  }, []);
  
  const text_question = [
    "Who did you interact with during the activity",
    "Compared to the initial predictions, what actually happened?",
    "What did you learn? What is a more realistic view about this situation",
  ];

  const safety_behvs = useMemo(() => {
    return (
      <div className="options">
        <div className="option-container">
          {optionList["safety_behaviour"] &&
            optionList["safety_behaviour"].map((item) => 
                item.selected && (
                  <Button
                    key={item.optionIdx}
                    text={item.option}
                    className={item.finalized ? "fadeInDown selected button" : "fadeInDown button"}
                    style={{ marginTop: "15px", maxWidth: "700px" }}
                    onClick={(e) => {
                    // toggle the finalized option
                    // if the target is the label, toggle the parent element
                    // otherwise toggle the target element
                      finalizeOption(item.optionIdx);
                      if (e.target.tagName === "LABEL") {
                        e.target.parentElement.classList.toggle("selected");
                      } else {
                        e.target.classList.toggle("selected");
                      }
                  }}
                  />
                )
              
          )}
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
    );
  }, [optionList, selectOption]);

  const txt_box = (
    <div className="inputBox">
      <textarea
        className="input"
        id={question}
        placeholder="Type your answer here"
      />
    </div>
  );
  
  const MySwal = withReactContent(Swal);
  const handle_next = () => {
    // optionIdx is (question + key) not (answer + key)
    const warningSign = '<span style="font-family: "Inter";"><strong>Please select an activity</strong></span>'
    if (optionList["safety_behaviour"].find((activity) => activity.finalized === true) === undefined) {
      MySwal.fire({
        html: warningSign,
        confirmButtonText: "OK",
        confirmButtonColor: "#FFC300",
        background: "#FFFFFF",
        width: "400px",
        padding: "20px",
        
      });
      return;
    }
    if (text_question.includes(question)) {
      addText(document.getElementById(question).value, questionIdx);
      document.getElementsByTagName("textarea").value = "";
    }

    if (questionIdx < MAXIDX) {
      setQuestionIdx(questionIdx + 1);
    }
  };

  const handle_prev = () => {
    if (questionIdx > 0) {
      setQuestionIdx(questionIdx - 1);
    }
    else {
      navigate("/PreActivity")
    }
  };

  const slide_questions = [
    "How anxious do you feel right now?",
    "How anxious were you at the peak anxiety level?",
    "How anxious did you feel at the end of activity?",
    "How surprised do you feel about the outcome of the activity?",
    "How strongly do you believe your worst fears happened during the activity?",
    "How strongly do you believe you were judged negatively during the activity?",
    "How strongly do you believe you appeared anxious during the activity?",
    "How bad do you think the outcome of the activity was?",
  ];

  const sliders = (
    <div className="post-met-questions">
      {slide_questions.map((q, i) => {
        return (
          <div key={q} className="met-questions">
            <p>{q}</p>
            <Slider
              curMetric={`met-${7 + i}`}
              Metrics={Metrics}
              setMetrics={setMetrics}
            />
          </div>
        );
      })}
    </div>
  );
  const guide = (
    <Question question="Select your option/options" style={{ fontSize: "0.67em"}} />
  )
  if (finish) {
    return <Lastpage key={key}/>;
  }

  return (
    <div className="PostActivity">
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        option={option}
        onTextChange={(text) => setOption(text)}
        addOption={addOption}
        question={"Out of all safety behavious how much did you use?"}
        optionIdx={generateKey(option)}
      />
      <Question question={question} />

      {text_question.includes(question) && txt_box}

      {question === "Out of all safety behavious how much did you use?" && guide}
      
      {question === "Out of all safety behavious how much did you use?" &&
        safety_behvs}

      {question === "" && sliders}
      <div className="button-container" style={{ marginBottom: "20px" }}>
        <Button
          className={questionIdx !== MAXIDX-1 ? "nextButton" : "saveButton"}
          text={questionIdx !== MAXIDX-1 ? "Next ->" : "Submit"}
          onClick={handle_next}
        />
        
        <Button
          className="prevButton"
          text={"<- Prev"}
          onClick={handle_prev}
        />
        
      </div>
    </div>
  );
}

export default PostActivity;
