import { useEffect, useState } from "react";
import "./Option.css";

function Option({ text, className="" }) {
    const [option, setOption] = useState("Option"); 
    useEffect(() => {
        if (text) {
            setOption(text);
        }
    }, []);
    
    return (
        <label className={className}>{option}</label>
    );
}

export default Option;
