import React, { useState } from "react";
import { getOptionList } from "../firebase";
import "firebase/database";
import Result from "../components/Result";
import "./Query.css"

const Query = () => {
  const [key, setKey] = useState("");
  const [options, setOptions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(1);//0=graph, 1=text
  const handleChange = (event) => {
    setKey(event.target.value);
  };


	function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setLoading(true);
		getOptionList(key).then(
			(data) => {setOptions(data);setLoading(false)}
		).catch(
			(error) => {
				setError(error);
				setLoading(false);
				setOptions()
			}
		)
	}

  return (
    <div className="query-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={key}
          onChange={handleChange}
          placeholder="Enter Key"
        />
        <button type="submit">Get Record</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
			{options && <Result res={options} mode={mode}/>}
    </div>
  );
};

export default Query;


/// write a function that count to 10?
