import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import CardCreator from "./CardCreator";

const MyWords = () => {
  //get array from local storage and display
  const local = JSON.parse(localStorage.getItem("myWords"));
  const [localWords, setLocalWords] = useState(local);

  const removeHandler = (element) => {
    const newList = localWords.filter((obj) => obj.id != element.id);
    setLocalWords(newList);
    localStorage.setItem("myWords", JSON.stringify(newList));
  };

  return (
    <div>
      <h1> this is the my words component</h1>
      <div>
        {localWords.map((element) => {
          return (
            <CardCreator
              def={element}
              key={nanoid()}
              removeHandler={removeHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyWords;
