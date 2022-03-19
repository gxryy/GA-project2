import React, { useEffect } from "react";

const FreeDict = (props) => {
  useEffect(() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${props.word}`;
    fetchDict(url);
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

export default FreeDict;
