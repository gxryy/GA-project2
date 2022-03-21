import React from "react";
import { useNavigate } from "react-router-dom";
import styledComponents from "styled-components";

const Suggestion_MW = (props) => {
  const navigate = useNavigate();

  const clickHandler = (event) => {
    event.preventDefault();
    props.setWord(event.target.innerText);
    props.setSource({
      Merriam: true,
      FreeDict: true,
    });
    navigate("/results");
  };

  return (
    <>
      <h1>Did you mean...</h1>
      {props.suggestionArray.map((element) => {
        return (
          <h4 onClick={clickHandler} key={Math.random()}>
            {element}
          </h4>
        );
      })}
    </>
  );
};

export default Suggestion_MW;
