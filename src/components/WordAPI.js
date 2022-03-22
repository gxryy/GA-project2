import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import Card from "./Card";
import { nanoid } from "nanoid";
import keys from "../keys";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// similar structure to Merriam.js. Refer to Merriam.js
const WordAPI = (props) => {
  const [APIdata, setAPIData] = useState("");
  const [processedArray, setProcessedArray] = useState([]);

  useEffect(() => {
    const API_KEY = keys.WordAPI;
    const url = `https://wordsapiv1.p.rapidapi.com/words/${props.word}`;
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
    console.log(APIdata);
    if (APIdata) processData();
    else console.log(`no data from Word API`);
  }, [APIdata]);

  const processData = () => {
    let shortdef = [];

    for (let i = 0; i < APIdata.results.length; i++) {
      setProcessedArray((prevState) => [
        ...prevState,
        {
          word: APIdata.word,
          entry: i + 1,
          wordType: APIdata.results[i].partOfSpeech,
          shortDef: [{ definition: APIdata.results[i].definition }],
          dict: "Word API",
          id: nanoid(),
        },
      ]);
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Word API</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {processedArray.map((element) => {
              return <Card def={element} key={element.id} />;
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* <h3>Word API</h3>
      <div className="defineCardContainer">
        {processedArray.map((element) => {
          return <Card def={element} key={element.id} />;
        })}
      </div> */}
    </>
  );
};

export default WordAPI;
