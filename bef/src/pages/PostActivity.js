import React from "react";
import { useState, useEffect } from "react";

import useQuestion from "../hooks/useQuestion";
import useOption from "../hooks/useOption";

import Modal from "../components/Modal";
import Button from "../components/Button";
import Question from "../components/Question";
import "./PostActivity.css";

// optionList will be sent at the end as the response of the client (backend)
// PostActivity will not show up if optionList is empty or null

function PostActivity() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const question = useQuestion(questionIdx, "postActivity");
  const { addOption, selectOption } = useOption();
  const [optionList, setOptionList] = useState(
    JSON.parse(localStorage.getItem("optionList"))
  );

  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("");

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  useEffect(() => {
    const newList = JSON.parse(localStorage.getItem("optionList"));
    if (newList) {
      setOptionList(newList);
    }
  }, [openModal]);

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

      {question === "Out of all safety behavious how much did you use?" && (
        <div className="buttons">
          <div className="buttonContainer">
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
      )}
    </div>
  );
}

export default PostActivity;
