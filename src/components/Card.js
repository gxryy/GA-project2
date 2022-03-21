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

const Example = styled.p`
  color: grey;
  text-align: left;
`;

const Card = (props) => {
  const definitionArray = props.def.shortDef.map((element) => {
    return (
      <div key={nanoid()}>
        <Definition key={nanoid()}>{element.definition}</Definition>
        <Example key={nanoid()}>{element?.example}</Example>
      </div>
    );
  });

  return (
    <StyledDiv className="centered">
      <InfoContainer>
        <Word> {props.def.word}</Word>
        <WordType>{props.def.wordType}</WordType>
        {/* <input type="button" value="Add to my words" /> */}
      </InfoContainer>
      <ol type="1">{definitionArray}</ol>

      <Source>Source: {props.def.dict}</Source>
    </StyledDiv>
  );
};

export default Card;
