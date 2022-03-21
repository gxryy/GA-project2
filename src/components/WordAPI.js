import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import { nanoid } from "nanoid";
import keys from "../keys";

// similar structure to Merriam.js. Refer to Merriam.js
const WordAPI = (props) => {
  const [APIdata, setAPIData] = useState("");
  const [processedArray, setProcessedArray] = useState([]);

  useEffect(() => {
    const API_KEY = keys.WordAPI;
    const url = `https://wordsapiv1.p.rapidapi.com/words/${props.word}`;
    const params = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    };
    FetchAPI(url, params, setAPIData);

    return () => {
      console.log(`cleanup code: component`);
    };
  }, []);

  useEffect(() => {
    if (APIdata) processData();
  }, [APIdata]);

  const processData = () => {
    let shortdef = [];

    for (let i = 0; i < APIdata.results.length; i++) {
      setProcessedArray((prevState) => [
        ...prevState,
        {
          word: APIdata.word,
          entry: i + 1,
          wordType: APIdata.results[i].partOfSpeech,
          shortDef: [{ definition: APIdata.results[i].definition }],
          dict: "Word API",
          id: nanoid(),
        },
      ]);
    }
  };

  return (
    <div>
      <h1>This is the return from Word API</h1>
      {processedArray.map((element) => {
        return <Card def={element} key={element.id} />;
      })}
    </div>
  );
};

export default WordAPI;
