import { useEffect, useState } from "react";

function useQuestion(idx, page) {
  const data = {
    "eventPlanning": [
      "What is the activity",
      "What would be your likely safety behaviour",
      "What is your worst fear?",
    ],
    "postActivity": ["Out of all safety behavious how much did you use?"],
  }
  const questionList = data[page];
  const [question, setQuestion] = useState(questionList[idx]);

  useEffect(() => {
    setQuestion(questionList[idx]);
  }, [idx]);
  
  return question;
}

export default useQuestion;
