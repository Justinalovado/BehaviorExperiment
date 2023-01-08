import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import trash from "../images/Trash.png";
import "./Option.css";

// text means option text
function Option({ text, className="", removeOption, optionIdx }) {
    const { height, width } = useWindowDimensions();
    const [option, setOption] = useState("Option"); 
    useEffect(() => {
        if (text) {
            setOption(text);
        }
    }, [text]);
    
    return (
        <div className={`${className} option`} id={optionIdx}>
            {width <= 600 && option.length > 30 || option.length > 76 ? <label id="rollText">{option}</label> : <label>{option}</label>}
            <img src={trash} alt="delete" onClick={(e) => {
                removeOption(e.target.parentNode.id);
            }} />
        </div>
    );
}

export default Option;
