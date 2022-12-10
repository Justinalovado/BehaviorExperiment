import { useEffect, useState } from "react";
import "./Button.css";

function Button({ text, className="", onClick }) {
    const [buttonText, setButtonText] = useState("Click me, please"); 
    useEffect(() => {
        if (text) {
            setButtonText(text);
        }
    }, [text]);
    
    return (
        <button className={className} onClick={onClick}>{buttonText}</button>
    );
}

export default Button;
