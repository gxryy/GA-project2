import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import { nanoid } from "nanoid";

// similar structure to Merriam.js. Refer to Merriam.js
const FreeDict = (props) => {
  const [APIdata, setAPIData] = useState("");
  const [processedArray, setProcessedArray] = useState([]);

  useEffect(() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${props.word}`;
    FetchAPI(url, {}, setAPIData);

    return () => {
      console.log(`cleanup code: component`);
    };
  }, []);

  useEffect(() => {
    if (APIdata) processData();
  }, [APIdata]);

  const processData = () => {
    for (let i = 0; i < APIdata.length; i++) {
      setProcessedArray((prevState) => [
        ...prevState,
        {
          word: APIdata[i].word,
          wordType: APIdata[i].meanings[0].partOfSpeech,
          shortDef: APIdata[i].meanings[0].definitions,
          soundURL: APIdata[i].phonetics[0].audio,
          pronounciation: APIdata[i].phonetics[0].text,
          fullDef: APIdata[i].sourceUrls[0],
          dict: "Free Dictionary",
          id: nanoid(),
        },
      ]);
    }
  };

  return (
    <div>
      <h3>FreeDict</h3>
      {processedArray.map((element) => {
        return <Card def={element} key={element.id} />;
      })}
    </div>
  );
};

export default FreeDict;
