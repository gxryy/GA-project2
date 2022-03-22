import React, { useState } from "react";
import Merriam from "./Merriam";
import FreeDict from "./FreeDict";
import WordAPI from "./WordAPI";
import { Typography, Container, Stack } from "@mui/material";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

const Results = (props) => {
  const [phonetics, setPhonetics] = useState({});
  let merriamList;
  let freeDictList;
  let WordAPIList;

  // if Merriam is checked, call <Merriam/> and prop in word and lifting state to set suggestion array. setSuggestionArray is called when there is a slight mismatch between user query and Merriam's database.
  // Merriam will return possible words/phrases as an array.
  // return element is stored in merriamList and displayed at returned below
  if (props.source.Merriam) {
    merriamList = (
      <Merriam
        word={props.word}
        setSuggestionArray={props.setSuggestionArray}
        setPhonetics={setPhonetics}
      />
    );
  }

  // if Merriam is checked in form, call <Merriam/> and prop in word
  // return element is stored in freeDictList and displayed at returned below

  if (props.source.FreeDict) {
    freeDictList = <FreeDict word={props.word} />;
  }

  // if WordAPI is checked, call <Merriam/> and prop in word
  // return element is stored in WordAPIList and displayed at returned below

  if (props.source.WordAPI) {
    WordAPIList = <WordAPI word={props.word} />;
  }

  const playSound = () => {
    // console.log(phonetics.soundURL);
    let soundTrack = new Audio(phonetics.soundURL);
    soundTrack.play();
  };

  return (
    <>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={10}
          alignItems="baseline"
        >
          <Typography variant="h1" sx={{ fontWeight: "500" }}>
            {props.word}
          </Typography>
          <Typography variant="h3"> {phonetics.pronounciation}</Typography>
          {phonetics.soundURL && (
            <VolumeUpRoundedIcon onClick={playSound} fontSize="large" />
          )}
        </Stack>
      </Container>
      <Container maxWidth="xl">
        {merriamList}
        {freeDictList}
        {WordAPIList}
      </Container>
    </>
  );
};

export default Results;
