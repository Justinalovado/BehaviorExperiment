import React, { useState, useRef } from 'react';
import './Overlay.css'

function Overlay({onConfirm, onCancel}) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  function handleConfirm() {
    onConfirm(inputValue);
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <input 
          ref={inputRef} 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter some text" 
        />
        <div>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
