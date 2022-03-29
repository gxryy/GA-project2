import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import CardCreator from "./CardCreator";
import { nanoid } from "nanoid";
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
    const API_KEY = process.env.REACT_APP_WordAPI_KEY;
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
    if (APIdata) processData();
    else {
      console.log(`no data from Word API`);
      return;
    }
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

    console.log(processedArray.length);
    if (processedArray.length == 0) return;
  };

  return (
    <>
      {processedArray.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Word API</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              spacing={5}
              justifyContent="space-evenly"
              alignItems="center"
            >
              {processedArray.map((element) => {
                return <CardCreator def={element} key={element.id} />;
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default WordAPI;
