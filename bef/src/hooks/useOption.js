import React from "react";
import { useState, useEffect } from "react";

function useOption() {
  const [optionList, setOptionList] = useState([]);
    // ----------------localStorage part--------------------- //
    useEffect(() => {
        const optionList = JSON.parse(localStorage.getItem("optionList"));
        if (optionList) {
          setOptionList(optionList);
        }
      }, []);
    
    useEffect(() => {
      if (optionList.length !== 0) {
        localStorage.setItem("optionList", JSON.stringify(optionList));
      }
    }, [optionList]);
    
    // ------------------------------------------------------ //
    const addOption = (option, idx) => {
        setOptionList([...optionList, {idx: idx, option: option}]);
    }

    const removeOption = (option) => {
        setOptionList(optionList.filter((item) => item !== option));
    }

    return { optionList, setOptionList, addOption, removeOption };

}

export default useOption;
