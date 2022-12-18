import { useEffect, useState } from "react";
import "./Button.css";

function Button({ text, className="", onClick, style }) {
    const [buttonText, setButtonText] = useState("Click me, please"); 
    useEffect(() => {
        if (text) {
            setButtonText(text);
        }
    }, [text]);
    
    return (
        <button className={className} onClick={onClick} style={style}>{buttonText}</button>
    );
}

export default Button;
