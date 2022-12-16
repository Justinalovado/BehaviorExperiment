import { useEffect, useState } from "react";
import trash from "../images/Trash.png";
import "./Option.css";

function Option({ text, className="" }) {
    const [option, setOption] = useState("Option"); 
    useEffect(() => {
        if (text) {
            setOption(text);
        }
    }, [text]);
    
    return (
        <div className={className} id="label">
            <label>{option}</label>
            {/* <img src={trash} alt="delete" /> */}
        </div>
    );
}

export default Option;
