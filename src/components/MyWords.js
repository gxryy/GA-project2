import React, { useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";
import CardCreator from "./CardCreator";
import { Container, Grid, Typography } from "@mui/material";
import BGContext from "./BGContext";

const MyWords = () => {
  //get array from local storage and display
  const local = JSON.parse(localStorage.getItem("myWords"));
  const [localWords, setLocalWords] = useState(local);

  const imgCtx = useContext(BGContext);

  const removeHandler = (element) => {
    const newList = localWords.filter((obj) => obj.id != element.id);
    setLocalWords(newList);
    localStorage.setItem("myWords", JSON.stringify(newList));
  };

  return (
    <>
      {console.log(imgCtx)}
      <div
        className="App"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${
            imgCtx[Math.floor(Math.random()) * imgCtx.length]
          })`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // height: "100vh",
        }}
      >
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
      </div>
    </>
  );
};

export default MyWords;
