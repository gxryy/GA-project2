import React from "react";
import { useNavigate } from "react-router-dom";
import styledComponents from "styled-components";
import { Typography } from "@mui/material";

const Suggestion_MW = (props) => {
  const navigate = useNavigate();

  const clickHandler = (event) => {
    event.preventDefault();
    props.setWord(event.target.innerText);
    props.setSource({
      Merriam: true,
      FreeDict: true,
      WordAPI: true,
    });
    navigate("/results");
  };

  return (
    <>
      <Typography variant="h1">Did you mean...</Typography>
      {props.suggestionArray.map((element) => {
        return (
          <Typography onClick={clickHandler} key={Math.random()} variant="h2">
            {element}
          </Typography>
        );
      })}
    </>
  );
};

export default Suggestion_MW;
