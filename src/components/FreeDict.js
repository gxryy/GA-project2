import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import { nanoid } from "nanoid";

const FreeDict = (props) => {
  const [APIdata, setAPIData] = useState("");
  const [processedArray, setProcessedArray] = useState([]);
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${props.word}`;

  // useEffect to call API upon loading
  useEffect(() => {
    FetchAPI(url, setAPIData);

    return () => {
      console.log(`cleanup code: component`);
    };
  }, []);

  // useEffect to process data it is returned
  useEffect(() => {
    if (APIdata) processData();
  }, [APIdata]);

  const processData = () => {
    console.log(APIdata);

    for (let i = 0; i < APIdata.length; i++) {
      setProcessedArray((prevState) => [
        ...prevState,
        {
          word: APIdata[i].word,
          entry: i + 1,
          wordType: APIdata[i].meanings[0].partOfSpeech,
          shortDef: APIdata[i].meanings[0].definitions,
          // fullDef: 'no full definition available',
          soundURL: APIdata[i].phonetics[0].audio,
          pronounciation: APIdata[i].phonetics[0].text,
          dict: "Free Dictionary",
          id: nanoid(),
        },
      ]);
    }
  };

  return (
    <div>
      <h1>This is the return from FreeDict</h1>
      {processedArray.map((element) => {
        return <Card def={element} key={element.id} />;
      })}
    </div>
  );
};

export default FreeDict;
