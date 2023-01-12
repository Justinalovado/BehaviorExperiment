import React from "react";
import { useState, useEffect } from "react";

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
function PostActivity() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const question = useQuestion(questionIdx, "postActivity");
  const { addOption, selectOption, addText } = useOption();
  const [optionList, setOptionList] = useState(
    JSON.parse(localStorage.getItem("optionList"))
  );
  const [finish, setFinish] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("");
  const [Metrics, setMetrics] = useState({});

	const text_question = [
		"Who did you interact with during the activity",
		"Compared to the initial predictions, what actually happened?",
		"What did you learn? What is a more realistic view about this situation"
	]
	const safety_behvs = (
		<div className="options">
			<div className="option-container">
				{optionList &&
					optionList
						.filter(
							(item) =>
								item.question ===
								"What would be your likely safety behaviour"
						) // filter the optionList to get the answers to the second question
						.map((item) => (
							<Button
								key={item.optionIdx}
								text={item.option}
								className={item.selected ? "selected button" : "button"}
								style={{ marginTop: "15px", maxWidth: "700px" }}
								onClick={(e) => {
									// toggle the selected class
									// if the target is the label, toggle the parent element
									// otherwise toggle the target element
									if (e.target.tagName === "LABEL") {
										e.target.parentElement.classList.toggle("selected");
									} else {
										e.target.classList.toggle("selected");
									}
									selectOption(item.optionIdx);
								}}
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
	)
	const txt_box = (
		<div className="inputBox">
      <textarea className="input" id={question} placeholder="Type your answer here"/>
    </div>
	)
	
	const handle_next = () => {
		// optionIdx is (question + key) not (answer + key)
		if (text_question.includes(question)) {
			addText(
				document.getElementById(question).value,
				question,
				generateKey(question)
			);
			document.getElementsByTagName("textarea").value = "";
		}
		if (questionIdx < MAXIDX-1) {
			setQuestionIdx(questionIdx + 1);
		} else {
			// save optionList to the backend
			// optionList is the response of the client
			setFinish(true);
			localStorage.removeItem("idx");
		}
	}

	const handle_prev = () => {
		if (questionIdx > 0) {
			setQuestionIdx(questionIdx - 1);
		}
	}
	
	const slide_questions = [
		"How anxious do you fell right now?",
		"How anxious were you at the peak anxiety level?",
		"How anxious did you feel at the end of activity?",
		"How surprised do you fell about the outcome of the activity?",
		"How strongly do you believe your worst fears happened during the activity?",
		"How strongly do you believe you were judged negatively during the activity?",
		"How strongly do you believe you appeared anxious during the activity?",
		"How bad do you think the outcome of the activity was?"
	]


	const sliders = (
		<div className='post-met-questions'>
				{slide_questions.map((q, i) => {
					return (
						<div className='met-questions'>
							<p>{q}</p>
							<Slider curMetric={`met-${6 + i}`} Metrics={Metrics} setMetrics={setMetrics} />
						</div>
					)
				})}
		</div>
	)

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  useEffect(() => {
    const newList = JSON.parse(localStorage.getItem("optionList"));
    if (newList) {
      setOptionList(newList);
    }
  }, [openModal]);

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
  
  useEffect(() => {
    if (questionIdx < MAXIDX) {
      localStorage.setItem("idx", JSON.stringify(questionIdx));
    }
  }, [questionIdx]);
  if (finish) {
    return (
      <div className="PostActivity">
        <Question question={"Thank you for your participation"} />
      </div>
    );
  }


  return (
    <div className="PostActivity">
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        option={option}
        onTextChange={(text) => setOption(text)}
        addOption={addOption}
        question={"What would be your likely safety behaviour"}
        optionIdx={generateKey(option)}
      />
      <Question question={question} />

      {(text_question.includes(question)) && (txt_box)}

      {question === "Out of all safety behavious how much did you use?" && (safety_behvs)}
			
			{question === "" && (sliders)}
      <div className="button-container" style={{ marginBottom: "20px" }}>
        <Button
          className={questionIdx !== MAXIDX-1 ? "nextButton" : "saveButton"}
          text={questionIdx !== MAXIDX-1 ? "Next ->" : "Submit"}
          onClick={handle_next}
        />
        {questionIdx > 0 && (
          <Button
            className="prevButton"
            text={"<- Prev"}
            onClick={handle_prev}
          />
        )}
      </div>
    </div>
  );
}

export default PostActivity;
