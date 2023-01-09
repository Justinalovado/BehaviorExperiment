import { useEffect, useState } from "react";
import "./Button.css";
import useWindowDimensions from "../hooks/useWindowDimension";
// this is 
function Button({ text, className="", onClick, style, id }) {
    const { width, height } = useWindowDimensions();
    const [buttonText, setButtonText] = useState("Click me, please"); 
    useEffect(() => {
        if (text) {
            setButtonText(text);
        }
    }, [text]);
    
    return (
        <button className={className === "" ? "button" : className} onClick={onClick} style={style}>
             {width <= 600 && buttonText.length > 30 || buttonText.length > 76 ? <label id="rollText">{buttonText}</label> : <label>{buttonText}</label>}
        </button>
    );
}

export default Button;
