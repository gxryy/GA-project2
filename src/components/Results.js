import React, { useState, useEffect } from "react";
import Merriam from "./Merriam";
import FreeDict from "./FreeDict";
import WordAPI from "./WordAPI";
import { Typography, Container, Stack, Box } from "@mui/material";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import keys from "../keys";
import FetchAPI from "./FetchAPI";

const Results = (props) => {
  const [phonetics, setPhonetics] = useState({});
  const [APIdata, setAPIData] = useState("");
  const [bg, setBG] = useState("");

  let merriamList;
  let freeDictList;
  let WordAPIList;

  useEffect(() => {
    const API_KEY = keys.unsplash;
    const url = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=1&orientation=portrait&query=${props.word} `;
    FetchAPI(url, {}, setAPIData);
  }, []);

  useEffect(() => {
    if (APIdata) setBG(APIdata[0].urls.full);
  }, [APIdata]);

  // if Merriam is checked, call <Merriam/> and prop in word and lifting state to set suggestion array. setSuggestionArray is called when there is a slight mismatch between user query and Merriam's database.
  // Merriam will return possible words/phrases as an array.
  // return element is stored in merriamList and displayed at returned below
  if (props.source.Merriam) {
    merriamList = (
      <Merriam
        word={props.word}
        setSuggestionArray={props.setSuggestionArray}
        setPhonetics={setPhonetics}
        origin={props.origin}
        setWord={props.setWord}
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
    let soundTrack = new Audio(phonetics.soundURL);
    soundTrack.play();
  };

  return (
    <>
      <Box
        className="App"
        disableGutters
        maxWidth="false"
        height="100vh"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bg})`,
          backgroundAttachment: "fixed",
          // backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container
          disableGutters
          maxWidth="false"
          style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
        >
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
      </Box>
    </>
  );
};

export default Results;
