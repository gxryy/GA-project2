import React, { useEffect, useState } from "react";
import fish from "./fish";
import useFetchAPI from "./FetchAPI";
import FetchAPI from "./FetchAPI";
const Merriam = (props) => {
  const [data, setData] = useState([]);
  const API_KEY = "b4c04852-37ba-4237-a137-d1a1bbddd206";
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${props.word}?key=${API_KEY}`;

  useEffect(() => {
    //  FetchAPI(url, setData);
    setData(fish);

    const one = data[0];
    console.log(one);

    return () => {
      console.log(`cleanup code`);
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
