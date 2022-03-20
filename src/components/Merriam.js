import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import fancy_MW from "../mock/fancy_MW";
import channel_MW from "../mock/channel_MW";
import overlook_MW from "../mock/overlook_MW";
import minute_MW from "../mock/minute_MW";

const Merriam = (props) => {
  const [data, setData] = useState("");
  const API_KEY = "b4c04852-37ba-4237-a137-d1a1bbddd206";
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${props.word}?key=${API_KEY}`;
  // let display = [];

  // useEffect to call API upon loading
  useEffect(() => {
    // FetchAPI(url, setData);
    setData(channel_MW);

    return () => {
      console.log(`cleanup code: component`);
    };
  }, []);

  // useEffect to process data it is returned
  useEffect(() => {
    if (data) processData();
  }, [data]);

  const processData = () => {
    const mockWord = "channel";

    const one = data[0];

    const filteredData = data.filter(
      (element) => element.meta.id.split(":")[0] === mockWord
    );
    console.log(filteredData);

    const word = one.meta.id.split(":")[0];
    const entry = one.meta.id.split(":")[1];
    const wordType = one.fl;
    const shortDef = one.shortdef;
    const pronounciation = one.hwi.prs[0].sound;

    console.log(`word is ${word}`);
    console.log(`entry is ${entry}`);
    console.log(`wordType is ${wordType}`);
    console.log(`shortDef is ${shortDef}`);
    console.log(`pronounciation is ${pronounciation}`);

    // card should take in word, word type , shortDef, fullDef, pronounciation
  };

  // Merriam to return the defination card
  return (
    <div>
      <h1>This is the return from merriam</h1>

      {/* <Card /> */}
    </div>
  );
};

export default Merriam;
