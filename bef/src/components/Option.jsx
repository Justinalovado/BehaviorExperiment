import { useEffect, useState } from "react";
import trash from "../images/Trash.png";
import "./Option.css";

// text means option text
function Option({ text, className="", removeOption, optionIdx }) {
    const [option, setOption] = useState("Option"); 
    useEffect(() => {
        if (text) {
            setOption(text);
        }
    }, [text]);
    
    return (
        <div className={`${className} option`} id={optionIdx}>
            {/* {option.length > 20 ? option.slice(0, 20) + "..." : option} */}
            {option.length > 30 ? <label id="rollText">{option}</label> : <label>{option}</label>}
            {/* <label>{option}</label> */}
            <img src={trash} alt="delete" onClick={(e) => {
                removeOption(e.target.parentNode.id);
            }} />
        </div>
    );
}

export default Option;
