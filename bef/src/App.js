import Question from "./components/Question";
import Button from "./components/Button";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css";
import Landing from "./pages/Landing";

function App() {
  return (
    // <div className="App">
    //   <Question />
    //   <div className="button-container">
    //     <Button />
    //     <Button />
    //     <Button />
    //     <Button />
    //     <Button />
    //     <Button />
    //   </div>
    //   <Button className="addButton" text={"Add New +"} />
    // </div>
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/error" element={<h1>Page 404 Not found</h1>} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
