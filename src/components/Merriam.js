import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import keys from "../keys";

const Merriam = (props) => {
  const navigate = useNavigate(); // for redirecting to suggestion route
  const [APIdata, setAPIData] = useState(""); // state to store JSON parsed API data. only used by FetchAPI function
  const [processedArray, setProcessedArray] = useState([]); // State to store processed API data for ensure consistent format for Card component

  // initiate API parameters on page load.
  useEffect(() => {
    const API_KEY = keys.MW;
    const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${props.word}?key=${API_KEY}`;
    FetchAPI(url, {}, setAPIData); //custom function that takes in url, fetch params, and lifting method.

    return () => {
      console.log(`cleanup code: component`);
    };
  }, []);

  // initiate processData function upon APIdata state change
  useEffect(() => {
    if (APIdata) processData();
  }, [APIdata]);

  // function to destructure APIdata, process and parse required information to ensure consistent format with Card component.
  // processed information is stored in processedArray
  const processData = () => {
    // Merriam returns an array of strings instead of objects when there is a slight mismatch in query text.
    // Upon receiving text array, set the lift the suggestion array and redirect to suggestion page.
    if (typeof APIdata[0] == "string") {
      props.setSuggestionArray(APIdata);
      navigate("/suggest");
      return;
    }

    // Filtering to remove irrelevent results returned from Merriam. Matches the result words to the queried word.
    let filteredData = APIdata.filter(
      (element) => element.meta.id.split(":")[0] == props.word
    );

    // allow 1 result if the filtering yields no results.
    if (filteredData.length == 0) filteredData[0] = APIdata[0];

    if (!filteredData[0]) {
      console.log(`no results`);
      return;
    }

    let soundURL = "";
    let pronounciation = "";
    // API object schema
    if (filteredData[0].hwi.prs) {
      const soundObj = filteredData[0].hwi.prs[0].sound;
      const audio = soundObj.audio;

      // subdirectory requirements based on Merriam API. Refer to documentation
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

    props.setPhonetics({ pronounciation, soundURL });

    // parsing filtered data, and setting processed array state. Refer to API documentation and Card requirements.
    for (let i = 0; i < filteredData.length; i++) {
      // shortDef to be an array of objects consisting of definition
      const shortDef = filteredData[i].shortdef.map((element) => {
        return { definition: element };
      });
      let word = filteredData[i].meta.id.split(":")[0];
      setProcessedArray((prevState) => [
        ...prevState,
        {
          word: word,
          wordType: filteredData[i].fl,
          shortDef: shortDef,
          soundURL: soundURL,
          pronounciation: pronounciation,
          fullDef: `https://www.merriam-webster.com/dictionary/${word}`,
          dict: "Merriam Webster",
          id: nanoid(),
        },
      ]);
    }
  };

  return (
    <div>
      <h3>Merriam </h3>
      <div className="</div>">
        {processedArray.map((element) => {
          return <Card def={element} key={element.id} />;
        })}
      </div>
    </div>
  );
};

export default Merriam;
