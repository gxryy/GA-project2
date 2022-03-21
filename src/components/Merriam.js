import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import { nanoid } from "nanoid";
import fancy_MW from "../mock/fancy_MW";
import channel_MW from "../mock/channel_MW";
import overlook_MW from "../mock/overlook_MW";
import minute_MW from "../mock/minute_MW";

const Merriam = (props) => {
  const [APIdata, setAPIData] = useState("");
  const [processedArray, setProcessedArray] = useState([]);
  const API_KEY = "b4c04852-37ba-4237-a137-d1a1bbddd206";
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${props.word}?key=${API_KEY}`;

  // useEffect to call API upon loading
  useEffect(() => {
    FetchAPI(url, setAPIData);
    // setAPIData(channel_MW);
    // console.log(channel_MW);

    return () => {
      console.log(`cleanup code: component`);
    };
  }, []);

  // useEffect to process data it is returned
  useEffect(() => {
    if (APIdata) processData();
  }, [APIdata]);

  const processData = () => {
    // const mockWord = "channel";
    // console.log(APIdata);

    const filteredData = APIdata.filter(
      (element) => element.meta.id.split(":")[0] === props.word
    );
    // console.log(filteredData);

    const soundObj = filteredData[0].hwi.prs[0].sound;
    const audio = soundObj.audio;

    let subdirectory = "";
    if (audio.startsWith("bix")) subdirectory = "bix";
    else if (audio.startsWith("gg")) subdirectory = "gg";
    else if (audio.match(/^(\W|_|[0-9])/g)) subdirectory = "number";
    else subdirectory = audio.split("")[0];

    const soundURL = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audio}.mp3`;
    const pronounciation = filteredData[0].hwi.prs[0].mw;
    for (let i = 0; i < filteredData.length; i++) {
      setProcessedArray((prevState) => [
        ...prevState,
        {
          word: filteredData[i].meta.id.split(":")[0],
          entry: filteredData[i].meta.id.split(":")[1],
          wordType: filteredData[i].fl,
          shortDef: filteredData[i].shortdef,
          fullDef: filteredData[i].def,
          soundURL: soundURL,
          pronounciation: pronounciation,
          source: "Merriam Webster",
          id: nanoid(),
        },
      ]);
    }

    // console.log(processedArray);
  };

  // Merriam to return the definition card
  return (
    <div>
      <h1>Merriam: {props.word}</h1>
      {processedArray.map((element) => {
        return <Card def={element} key={element.id} />;
      })}
    </div>
  );
};

export default Merriam;
