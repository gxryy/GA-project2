import React, { useEffect, useState } from "react";
import useFetchAPI from "./FetchAPI";
import FetchAPI from "./FetchAPI";
import fancy_MW from "../mock/fancy_MW";
import channel_MW from "../mock/channel_MW";
import overlook_MW from "../mock/overlook_MW";
import minute_MW from "../mock/minute_MW";

const Merriam = (props) => {
  const [data, setData] = useState("");
  const API_KEY = "b4c04852-37ba-4237-a137-d1a1bbddd206";
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${props.word}?key=${API_KEY}`;

  useEffect(() => {
    // FetchAPI(url, setData);
    setData(channel_MW);

    return () => {
      console.log(`cleanup code: component`);
    };
  }, []);

  useEffect(() => {
    // check hwi.hw if hw === word
    const one = data[0];
    console.log(data);

    const headword = one?.hwi.hw;
    console.log(`headword is ${headword}`);
    return () => {
      console.log(`cleanup code: data dependant`);
    };
  }, [data]);

  // Merriam to return the defination card
  return (
    <div>
      <h1>This is the return from merriam</h1>
    </div>
  );
};

export default Merriam;
