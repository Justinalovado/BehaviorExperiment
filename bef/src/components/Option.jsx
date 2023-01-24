import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import useQuestion from "../hooks/useQuestion";
import trash from "../images/Trash.png";
import trash2 from "../images/Trash2.png";
import "./Option.css";

// text means option text
function Option({ text, className = "", remove, optionIdx, question, onClick, style }) {
  const { height, width } = useWindowDimensions();
  const [option, setOption] = useState("Option");
  useEffect(() => {
    if (text) {
      setOption(text);
    }
  }, [text]);
  
  return (
    <div className={`${className} option`} style={style} id={optionIdx} onClick={onClick}>
      {(width <= 600 && option.length > 30) || option.length > 76 ? (
        <label style={style} id="rollText">{option}</label>
      ) : (
        <label style={style}>{option}</label>
      )}
      {className === "selected" ? (<img
        src={trash2}
        alt="delete"
        onClick={(e) => {
          e.stopPropagation()
          if (question === "What is the activity") {
            // removeActivity used
            remove(parseInt(e.target.parentNode.id, 10));
          }
          else {
            // removeOption used
            remove(parseInt(e.target.parentNode.id, 10), question);
          }
        }}
      />) : (<img
        src={trash}
        alt="delete"
        onClick={(e) => {
          e.stopPropagation()
          if (question === "What is the activity") {
            // removeActivity used
            remove(parseInt(e.target.parentNode.id, 10));
          }
          else {
            // removeOption used
            remove(parseInt(e.target.parentNode.id, 10), question);
          }
        }}
        />)}
    </div>
  );
}

export default Option;
