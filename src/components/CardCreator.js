import React, { useState } from "react";
import { nanoid } from "nanoid";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";

//Card components takes in a prop called def, an object with the information required to display each card
// def= {
// word: a string of the word
// wordType: string of wordtype
// shortDef: an array of objects with definition and example(optional) as key [{definition: first definition },{definition: second definition, example: second example }]
// dict: string of source
// fullDef URL: string of the url for full definition
// id: string as identifier
// }

const CardCreator = (props) => {
  const [buttonState, setButtonState] = useState(false);

  // definitionArray is an array that consist of react elements. Each array element contains a definition element and optionally an example element.
  // definitionArray is obtained by mapping shortDef and returning the definition and example elements respectively.
  const definitionArray = props.def.shortDef.map((element) => {
    return (
      <div key={nanoid()}>
        <li key={nanoid()} style={{ textAlign: "left" }}>
          <Typography variant="h6" sx={{ fontWeight: "400" }}>
            {element.definition}
          </Typography>
        </li>
        <Typography key={nanoid()} variant="body1">
          {element?.example}
        </Typography>
      </div>
    );
  });

  const definitionHandler = () => {
    let url = props.def.fullDef;
    if (url) window.open(props.def.fullDef);
  };

  const addHandler = (event) => {
    setButtonState(true);
    // get local storage
    // push to local storage

    const localMyWords = localStorage.getItem("myWords");
    if (!localMyWords) {
      localStorage.setItem("myWords", JSON.stringify([props.def]));
      console.log(`no local storage. created mywords`);
    } else {
      console.log(`there is existing`);
      const parsedLocal = JSON.parse(localMyWords);
      parsedLocal.push(props.def);
      localStorage.setItem("myWords", JSON.stringify(parsedLocal));
      console.log(`added`);
    }
  };

  return (
    <>
      <Grid item>
        <Card sx={{ minWidth: 350, maxWidth: 800 }} variant="outlined">
          <CardContent>
            <Typography variant="h3" component="div">
              {props.def.word}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
              {props.def.wordType}
            </Typography>
            <ol type="1">{definitionArray}</ol>
            <Typography variant="caption" align="left">
              Source: {props.def.dict}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            {props.removeHandler ? (
              <Button
                size="large"
                variant="outlined"
                onClick={() => props.removeHandler(props.def)}
              >
                Remove
              </Button>
            ) : (
              <Button
                size="large"
                variant="outlined"
                onClick={addHandler}
                disabled={buttonState}
              >
                Add to My Words
              </Button>
            )}
            {props.def.fullDef && (
              <Button
                size="large"
                variant="outlined"
                onClick={definitionHandler}
              >
                Learn More
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
//InfoContainer contains the Word, wordtype and button to add to myword
//displays list of definitions as an ordered list starting from 1.
// Source to indicate source of definition.

export default CardCreator;
