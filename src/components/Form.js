import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledLabel = styled.label`
  margin: 0.5em 1em 0.5em 0.5em;
`;
const StyledTextbox = styled.input`
  margin: 0.5em;
  width: 30%;
`;
const StyledCheckbox = styled.input`
  margin: 0.5em;
`;

const Form = (props) => {
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    props.setWord(form.searchBox.value);
    if (form.Merriam.checked)
      props.setSource((prevState) => [...prevState, "Merriam"]);
    if (form.FreeDict.checked)
      props.setSource((prevState) => [...prevState, "FreeDict"]);
    navigate("/results");
  };

  return (
    <form onSubmit={submitHandler}>
      <StyledLabel htmlFor="searchBox">Search Here:</StyledLabel>
      <StyledTextbox
        type="text"
        name="searchBox"
        id="searchBox"
        placeholder="search word"
      ></StyledTextbox>
      <br />
      <StyledCheckbox type="checkbox" id="Merriam" name="Merriam" />
      <StyledLabel htmlFor="Merriam"> Merriam webster</StyledLabel>
      <StyledCheckbox type="checkbox" id="FreeDict" name="FreeDict" />
      <StyledLabel htmlFor="FreeDict"> FreeDict</StyledLabel>
      <input type="submit"></input>
    </form>
  );
};

export default Form;
