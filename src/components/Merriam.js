import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import fancy_MW from "../mock/fancy_MW";
import channel_MW from "../mock/channel_MW";
import overlook_MW from "../mock/overlook_MW";
import minute_MW from "../mock/minute_MW";

const Merriam = (props) => {
  const [APIdata, setAPIData] = useState("");
  const processedArray = [];
  const API_KEY = "b4c04852-37ba-4237-a137-d1a1bbddd206";
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${props.word}?key=${API_KEY}`;
  // let display = [];

  // useEffect to call API upon loading
  useEffect(() => {
    // FetchAPI(url, setAPIData);
    setAPIData(channel_MW);

    return () => {
      console.log(`cleanup code: component`);
    };
  }, []);

  // useEffect to process data it is returned
  useEffect(() => {
    if (APIdata) processData();
  }, [APIdata]);

  const processData = () => {
    const mockWord = "channel";

    const filteredData = APIdata.filter(
      (element) => element.meta.id.split(":")[0] === mockWord
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

    for (let i = 0; i < filteredData.length; i++) {
      processedArray.push({
        word: filteredData[i].meta.id.split(":")[0],
        entry: filteredData[i].meta.id.split(":")[1],
        wordType: filteredData[i].fl,
        shortDef: filteredData[i].shortdef,
        soundURL: soundURL,
      });
    }
    console.log(processedArray);

    // card should take in word, word type , shortDef, fullDef, pronounciation
  };

  // Merriam to return the definition card
  return (
    <div>
      <h1>This is the return from merriam</h1>

      {/* <Card /> */}
    </div>
  );
};

export default Merriam;
