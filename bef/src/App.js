import Question from "./components/Question";
import Button from "./components/Button";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Question />
      <div className="button-container">
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
      </div>
      <Button className="addButton" text={"Add New +"} />
    </div>
  );
}

export default App;
