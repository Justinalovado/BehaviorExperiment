import { useEffect, useState } from "react";
import "./Button.css";

function Button({ text, className="", handleClick }) {
    const [buttonText, setButtonText] = useState("Click me, please"); 
    useEffect(() => {
        if (text) {
            setButtonText(text);
        }
    }, []);
    
    return (
        <button className={className} onClick={handleClick}>{buttonText}</button>
    );
}

export default Button;
