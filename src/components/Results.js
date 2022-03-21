import React from "react";
import Merriam from "./Merriam";
import FreeDict from "./FreeDict";
import WordAPI from "./WordAPI";

const Results = (props) => {
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

  return (
    <div id="resultsPage">
      <h1>This is the results page</h1>
      {merriamList}
      {freeDictList}
      {WordAPIList}
    </div>
  );
};

export default Results;
