import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Merriam = (props) => {
  const navigate = useNavigate();
  const [APIdata, setAPIData] = useState("");
  const [processedArray, setProcessedArray] = useState([]);
  const API_KEY = "b4c04852-37ba-4237-a137-d1a1bbddd206";
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${props.word}?key=${API_KEY}`;

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
    if (typeof APIdata[0] == "string") {
      props.setSuggestionArray(APIdata);
      navigate("/suggest");
      return;
    }

    let filteredData = APIdata.filter(
      (element) => element.meta.id.split(":")[0] === props.word
    );

    if (filteredData.length == 0) filteredData[0] = APIdata[0];
    // console.log(filteredData);
    let soundURL = "";
    let pronounciation = "";

    if (filteredData[0].hwi.prs) {
      const soundObj = filteredData[0].hwi.prs[0].sound;
      const audio = soundObj.audio;

      let subdirectory = "";

      if (audio.startsWith("bix")) subdirectory = "bix";
      else if (audio.startsWith("gg")) subdirectory = "gg";
      else if (audio.match(/^(\W|_|[0-9])/g)) subdirectory = "number";
      else subdirectory = audio.split("")[0];

      soundURL = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audio}.mp3`;
      pronounciation = filteredData[0].hwi.prs[0].mw;
    } else {
      soundURL = "";
      pronounciation = "";
    }

    for (let i = 0; i < filteredData.length; i++) {
      console.log(`filtered data`);
      console.log(filteredData[i]);
      const shortDef = filteredData[i].shortdef.map((element) => {
        return { definition: element };
      });

      setProcessedArray((prevState) => [
        ...prevState,
        {
          word: filteredData[i].meta.id.split(":")[0],
          entry: filteredData[i].meta.id.split(":")[1],
          wordType: filteredData[i].fl,
          shortDef: shortDef,
          fullDef: filteredData[i].def,
          soundURL: soundURL,
          pronounciation: pronounciation,
          dict: "Merriam Webster",
          id: nanoid(),
        },
      ]);
    }
  };

  // Merriam to return the definition card
  return (
    <div>
      <h1>merriam: </h1>
      {processedArray.map((element) => {
        return <Card def={element} key={element.id} />;
      })}
    </div>
  );
};

export default Merriam;
