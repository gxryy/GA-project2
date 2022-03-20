import React from "react";
import Merriam from "./Merriam";
import FreeDict from "./FreeDict";

const Results = (props) => {
  let merriamList;
  let freeDictList;

  // call on merriam component that is expected to return an array of word definations
  if (props.source.Merriam) {
    merriamList = <Merriam word={props.word} />;
    // console.log(merriamList);
  }

  if (props.source.FreeDict) {
    freeDictList = <FreeDict word={props.word} />;
  }

  return (
    <div>
      <h1>This is the results page</h1>

      {merriamList}
      {freeDictList}
    </div>
  );
};

export default Results;
