import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import trash from "../images/Trash.png";
import trash2 from "../images/Trash2.png";
import "./Option.css";

// text means option text
function Option({ text, className = "", removeOption, optionIdx, onClick }) {
  const { height, width } = useWindowDimensions();
  const [option, setOption] = useState("Option");
  useEffect(() => {
    if (text) {
      setOption(text);
    }
  }, [text]);
  
  return (
    <div className={`${className} option`} id={optionIdx} onClick={onClick}>
      {(width <= 600 && option.length > 30) || option.length > 76 ? (
        <label id="rollText" onTouchStart="e.preventDefault()">{option}</label>
      ) : (
        <label onTouchStart="e.preventDefault()">{option}</label>
      )}
      {className === "selected" ? (<img
        src={trash2}
        alt="delete"
        onClick={(e) => {
          e.stopPropagation()
          removeOption(e.target.parentNode.id);
        }}
      />) : (<img
        src={trash}
        alt="delete"
        onClick={(e) => {
          e.stopPropagation()
          removeOption(e.target.parentNode.id);
        }}
        />)}
    </div>
  );
}

export default Option;
