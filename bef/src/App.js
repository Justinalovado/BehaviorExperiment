import './App.css';
import { useState } from 'react';
function App() {
  const questions = ["What is the activity"]
  const [question, setQuestion] = useState("What is the activity?");
  return (
    <div className="App">
      <h1>{question}</h1>
    </div>
  );
}

export default App;
