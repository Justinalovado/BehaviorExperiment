import Question from "./components/Question";
import Button from "./components/Button";
import Option from "./components/Option";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Question />
      <div className="option-container">
        <Option />
        <Option />
        <Option />
        <Option />
        <Option />
        <Button className="addButton" text={"Add New +"} />
      </div>

      <div className="button-container">
        <Button className="nextButton" text={"Next ->"} />
        <Button className="cancelButton" text={"Cancel"} />
      </div>
    </div>
  );
}

export default App;
