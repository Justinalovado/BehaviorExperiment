import { useState } from "react";

function useQuestion() { //later add idx as a parameter
  const questionList = ["What is the activity"];
  const [question, setQuestion] = useState("What is the activity?");

  return question
}

export default useQuestion;
