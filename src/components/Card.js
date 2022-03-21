import React from "react";

const Card = (props) => {
  console.log(`in card`);
  console.log(props.def);

  return (
    <div>
      <h1> this is a card</h1>
      {/* <p>{props.element}</p> */}
      <p>something goes here</p>
    </div>
  );
};

export default Card;
