import React from "react";
import FetchAPI from "./FetchAPI";
import CardCreator from "./CardCreator";
import { nanoid } from "nanoid";
import keys from "../keys";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Random = (props) => {
  const navigate = useNavigate();
  const [APIdata, setAPIData] = useState("");

  useEffect(() => {
    const API_KEY = keys.WordAPI;
    const url = `https://wordsapiv1.p.rapidapi.com/words/?random=true`;
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
    else {
      return;
    }
  }, [APIdata]);

  const processData = () => {
    props.setWord(APIdata.word.split(" ")[0]);
    props.setSource({
      Merriam: true,
      FreeDict: false,
      WordAPI: false,
    });
    props.setOrigin("random");
    navigate("/results");
  };

  return <div></div>;
};

export default Random;
