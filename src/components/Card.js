import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

const StyledDiv = styled.div`
  background: beige;
  border-radius: 2em;
  width: 80%;
  margin: 1em auto;
  padding: 1em 3em 0em 3em;
`;

const Word = styled.h3`
  color: blue;
  display: inline-block;
  margin-left: 0em;
  text-align: left;
`;

const WordType = styled.h4`
  font-style: italic;
  color: grey;
  display: inline-block;
  margin-left: 3em;
  text-align: left;
`;

const Definition = styled.li`
  color: black;
  // display: block;
  text-align: left;
`;

const Source = styled.p`
  font-size: 12px;
  text-align: left;
  padding: 1em;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const Card = (props) => {
  // console.log(props.def);

  const definitionArray = props.def.shortDef.map((element) => (
    <Definition key={nanoid()}>{element}</Definition>
  ));

  return (
    <StyledDiv className="centered">
      <InfoContainer>
        <Word> {props.def.word}</Word>
        <WordType>{props.def.wordType}</WordType>
        {/* <input type="button" value="Add to my words" /> */}
      </InfoContainer>
      <ol type="1">{definitionArray}</ol>

      <Source>Source: {props.def.source}</Source>
    </StyledDiv>
  );
};

export default Card;
