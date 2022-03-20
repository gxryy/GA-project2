import React from "react";

const Card = (props) => {
  console.log(`in card`);
  return (
    <div>
      <h1> this is a card</h1>
      <p>{props.word}</p>
      <p>something goes here</p>
    </div>
  );
};

export default Card;
