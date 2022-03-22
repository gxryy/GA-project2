import React, { useState } from "react";
import Merriam from "./Merriam";
import FreeDict from "./FreeDict";
import WordAPI from "./WordAPI";
import styled from "styled-components";

const Header = styled.div`
  background: lightblue;
`;
const Word = styled.h1`
  font-size: 4em;
`;

const Phonetics = styled.h2`
  font-size: 2em;
`;

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
    <div id="resultsPage">
      <Header>
        <Word>{props.word}</Word>
        <Phonetics>{phonetics.pronounciation}</Phonetics>
        <input type="button" value="Sound" onClick={playSound} />
      </Header>

      {merriamList}
      {freeDictList}
      {WordAPIList}
    </div>
  );
};

export default Results;
