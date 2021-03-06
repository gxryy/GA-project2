import React, { useState, useContext } from "react";
import { nanoid } from "nanoid";
import CardCreator from "./CardCreator";
import { Container, Grid, Typography } from "@mui/material";
import BGContext from "./BGContext";
import useLocalStorageState from "use-local-storage-state";

const Favourites = () => {
  //get array from local storage and display
  const [localWords, setLocalWords] = useLocalStorageState("favourites", {
    defaultValue: [],
  });

  const imgCtx = useContext(BGContext);

  const removeHandler = (element) => {
    const newList = localWords.filter((obj) => obj.id != element.id);
    setLocalWords(newList);
    localStorage.setItem("favourites", JSON.stringify(newList));
  };

  return (
    <>
      <Container
        className="App"
        disableGutters
        maxWidth="false"
        height="100vh"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${
            imgCtx[Math.floor(Math.random()) * imgCtx.length]
          })`,
          backgroundAttachment: "fixed",
          // backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container
          sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          maxWidth="md"
          disableGutters
          maxWidth="false"
        >
          <Typography variant="h1">Favourites</Typography>
        </Container>
        <Container maxWidth="xl">
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
      </Container>
    </>
  );
};

export default Favourites;
