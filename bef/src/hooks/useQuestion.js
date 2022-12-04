import { useState } from "react";

function useQuestion() {
  const questionList = ["What is the activity"];
  const [question, setQuestion] = useState("What is the activity?");

  return question
}

export default useQuestion;
