import { useState, useEffect } from "react";

function useOption(finish) {
  const [optionList, setOptionList] = useState(
    (JSON.parse(
      localStorage.getItem("optionList")) ||
      {safety_behaviour: [], worst_fear: [], txt_Q1: "", txt_Q2: "", txt_Q3: ""}
    )
  );
  const [activityList, setActivityList] = useState(
    JSON.parse(localStorage.getItem("activityList") || "[]")
  );

  // localStorage used to store items on page refresh
  // ----------------localStorage part--------------------- //
  // useEffect(() => {
  //   const optionList = JSON.parse(localStorage.getItem("optionList"));
  //   if (optionList) {
  //     setOptionList(optionList);
  //   }
  // }, []);
  useEffect(() => {
    // console.log("activityList: ", activityList);
    localStorage.setItem("activityList", JSON.stringify(activityList));
    
  }, [activityList]);
  
  useEffect(() => {
    // console.log("optionList: ", optionList);

    localStorage.setItem("optionList", JSON.stringify(optionList));
    
  }, [optionList]);
  // useEffect(() => {
  //   if (!finish) {
  //     console.log("updated");
  //     localStorage.setItem("optionList", JSON.stringify(optionList));
  //     localStorage.setItem("activityList", JSON.stringify(activityList));
  //   }
  // }, [optionList, activityList, finish]);

  // ------------------------------------------------------ //
  const addActivity = (activity, optionIdx) => {
    setActivityList([
      ...activityList,
      { activity: activity, selected: false, optionIdx: optionIdx },
    ]);
  };

  const addOption = (option, optionIdx, question) => {
    switch (question) {
      case "What would be your likely safety behaviour":
        setOptionList({...optionList, safety_behaviour:[
          ...optionList["safety_behaviour"],
          { option: option, optionIdx: optionIdx, selected: false },
        ]});
        break;
        
      case "What is your worst fear?":
        setOptionList({...optionList, worst_fear:[
          ...optionList["worst_fear"],
          { option: option, optionIdx: optionIdx, selected: false },
        ]});
        break;

      default:
        break;
    }
  };
  
  const addText = (option, questionIdx) => {
    setOptionList({...optionList, [`txt_Q${questionIdx-1}`]: option})
  };

  const removeActivity = (currentIdx) => {
    const newList = activityList.filter(
      (item) => item.optionIdx !== currentIdx
    );
    setActivityList(newList);
    // localStorage.setItem("activityList", JSON.stringify(newList));
  };

  const removeOption = (currentIdx, question) => {
    switch(question) {
      case "What would be your likely safety behaviour":
        setOptionList({...optionList, safety_behaviour: optionList["safety_behaviour"].filter((item) => item.optionIdx !== currentIdx)});
        break;
      case "What is your worst fear?":
        setOptionList({...optionList, worst_fear: optionList["worst_fear"].filter((item) => item.optionIdx !== currentIdx)});
        break;
      default:
        break;
    }
  };

  const selectActivity = (optionIdx) => {
    const newList = activityList.map((item) => {
      item.selected = false;
      return item;
    });
    newList.map((item) => {
      if (item.optionIdx === optionIdx) {
        item.selected = true;
      }
      return item;
    });
    setActivityList(newList);
  };
  const selectOption = (optionIdx) => {
    // const newList = optionList["safety_behaviour"].map((item) => {
    //   if (item.optionIdx === optionIdx) {
    //     return { ...item, selected: !item.selected };
    //   }
    //   return item;
    // });
    const newList = {...optionList, safety_behaviour: optionList["safety_behaviour"].map((item) => {
      if (item.optionIdx === optionIdx) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }
    )};
    setOptionList(newList);
    localStorage.setItem("optionList", JSON.stringify(newList));
  };

  return {
    optionList,
    activityList,
    setOptionList,
    addOption,
    removeOption,
    removeActivity,
    selectOption,
    addText,
    selectActivity,
    addActivity,
  };
}

export default useOption;
