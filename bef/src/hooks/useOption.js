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
  const addOption = (option, questionIdx, optionIdx) => {
    setOptionList([
      ...optionList,
      { questionIdx: questionIdx, option: option, optionIdx: optionIdx },
    ]);
  };

  const removeOption = (currentIdx) => {
    const newList = optionList.filter((item) => item.optionIdx !== currentIdx);
    setOptionList(optionList.filter((item) => item.optionIdx !== currentIdx));
    localStorage.setItem("optionList", JSON.stringify(newList));
  };

  return { optionList, setOptionList, addOption, removeOption };
}

export default useOption;
