import React from "react";
import { useState, useEffect } from "react";

function useOption() {
    // ----------------localStorage part needs fixing--------------------- //
    const [optionList, setOptionList] = useState([]);
    useEffect(() => {
        const optionList = JSON.parse(localStorage.getItem("optionList"));
        if (optionList) {
          setOptionList(optionList);
        }
      }, []);
    
    useEffect(() => {
    localStorage.setItem("optionList", JSON.stringify(optionList));
    }, [optionList]);
    // ------------------------------------- //
    const addOption = (option, idx) => {
        setOptionList([...optionList, {idx: idx, option: option}]);
    }

    const removeOption = (option) => {
        setOptionList(optionList.filter((item) => item !== option));
    }

    return { optionList, setOptionList, addOption, removeOption };

}

export default useOption;
