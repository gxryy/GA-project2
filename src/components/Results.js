import React from "react";

const Results = (props) => {
  console.log(props.source);
  return (
    <div>
      <h1>This is the results page</h1>

      {/* Merriam webster */}
      {/* <Merriam word={"fish"}></Merriam> */}
      {/* <FreeDict word={"fish"}></FreeDict> */}
    </div>
  );
};

export default Results;
