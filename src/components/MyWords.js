import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import CardCreator from "./CardCreator";
import { Container, Grid, Typography } from "@mui/material";

const MyWords = () => {
  //get array from local storage and display
  const local = JSON.parse(localStorage.getItem("myWords"));
  const [localWords, setLocalWords] = useState(local);

  const removeHandler = (element) => {
    const newList = localWords.filter((obj) => obj.id != element.id);
    setLocalWords(newList);
    localStorage.setItem("myWords", JSON.stringify(newList));
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h1">My Words</Typography>
        <Grid
          container
          spacing={1}
          justifyContent="space-around"
          alignItems="center"
        >
          {localWords.map((element) => {
            return (
              <CardCreator
                def={element}
                key={nanoid()}
                removeHandler={removeHandler}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default MyWords;
