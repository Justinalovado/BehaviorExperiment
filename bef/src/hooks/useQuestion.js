import { useEffect, useState } from "react";

function useQuestion(idx) {
  const questionList = [
    "What is the activity",
    "What would be your likely safety behaviour",
    "What is your worst fear?",
  ];
  const [question, setQuestion] = useState(questionList[0]);

  useEffect(() => {
    setQuestion(questionList[idx]);
  }, [idx]);
  
  return question;
}

export default useQuestion;
