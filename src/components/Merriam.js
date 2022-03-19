import React, { useEffect } from "react";
import fish from "./fish";

const Merriam = (props) => {
  const API_KEY = "b4c04852-37ba-4237-a137-d1a1bbddd206";

  useEffect(() => {
    // const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${props.word}?key=${API_KEY}`;
    // fetchDict(url);
    console.log(fish);
  }, []);

  const fetchDict = async function (url) {
    try {
      const response = await fetch(url);
      if (response.status !== 200) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <div></div>;
};

export default Merriam;
