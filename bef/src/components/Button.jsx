import { useEffect, useState } from "react";
import "./Button.css";
import useWindowDimensions from "../hooks/useWindowDimension";

function Button({ text, className = "", onClick, style }) {
  const { width} = useWindowDimensions();

  return (
    <button
      className={className === "" ? "button" : className}
      onClick={onClick}
      style={style}
    >
      {(width <= 600 && text.length > 30) || text.length > 76 ? (
        <label id="rollText">{text}</label>
      ) : (
        <label>{text}</label>
      )}
    </button>
  );
}

export default Button;
