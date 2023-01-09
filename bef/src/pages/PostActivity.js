import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";
import useWindowDimensions from "../hooks/useWindowDimension";

import Button from "../components/Button";
import Question from "../components/Question";
import "./PostActivity.css";

function PostActivity() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const question = useQuestion(questionIdx, "postActivity");
  const optionList = JSON.parse(localStorage.getItem("optionList"));
  const { height, width } = useWindowDimensions();

  return (
    <div className="PostActivity">
      <Question question={question} />
      <div className="buttonContainer">
        {question === "Out of all safety behavious how much did you use?" &&
          optionList
            .filter((item) => item.questionIdx === 1) // filter the optionList to get the answers to the second question
            .map((item) => (
                <Button
                  key={item.optionIdx}
                  text={item.option}
                  style={{ marginTop: "15px", maxWidth: "700px" }}
                  onClick={ (e) => {
                    if (e.target.tagName === "LABEL") {
                      e.target.parentElement.classList.toggle("selected");
                    }
                    else {
                      e.target.classList.toggle("selected")
                    }
                  } }
                />
              )
            )}
      </div>
    </div>
  );
}

export default PostActivity;
