import React, { useState } from "react";
import {
  Card,
  Grid,
  Button,
  Container,
  Modal,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useLocalStorageState from "use-local-storage-state";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardCreator from "./CardCreator";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyWords = () => {
  const [myWords, setMyWords] = useLocalStorageState("mywords", {
    defaultValue: [],
  });
  const [modalOpen, setModalOpen] = useState(false);

  const clickHandler = () => {
    console.log(`in add handler`);
    setModalOpen(true);
    // pop up modal to add word
  };

  const addHandler = (event) => {
    event.preventDefault();
    setModalOpen(false);

    console.log(event.target);
    console.log(event.target.wordInput.value);
    console.log(event.target.wordTypeInput.value);
    console.log(event.target.definitionInput.value);

    const def = {
      word: event.target.wordInput.value,
      wordType: event.target.wordTypeInput.value,
      shortDef: [{ definition: event.target.definitionInput.value }],
      dict: "My Words",
    };

    setMyWords((prevState) => [def, ...prevState]);
  };

  return (
    <>
      <Container>
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Card xs={12} md={8} lg={4} xl={4}>
              <Button
                variant="outlined"
                onClick={clickHandler}
                style={{
                  //   maxWidth: "30px",
                  //   maxHeight: "30px",
                  //   minWidth: "30px",
                  //   minHeight: "30px",
                  width: "260px",
                  height: "260px",
                }}
                startIcon={
                  <AddIcon
                    style={{
                      width: "80px",
                      height: "100px",
                    }}
                  />
                }
              ></Button>
              <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    New Word
                  </Typography>
                  <form onSubmit={addHandler}>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      id="wordInput"
                      label="Word"
                      variant="outlined"
                      size="large"
                      margin="normal"
                    ></TextField>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      id="wordTypeInput"
                      label="WordType"
                      variant="outlined"
                      size="large"
                      margin="normal"
                    ></TextField>
                    <TextField
                      fullWidth
                      autoFocus
                      required
                      multiline
                      minRows="3"
                      id="definitionInput"
                      label="Definition"
                      variant="outlined"
                      size="large"
                      margin="normal"
                    ></TextField>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      endIcon={<ArrowForwardIosIcon />}
                      sx={{ margin: "2em 0em" }}
                    >
                      Add
                    </Button>
                  </form>
                </Box>
              </Modal>
            </Card>
          </Grid>

          {myWords.map((word) => {
            return <CardCreator def={word} />;
          })}
        </Grid>
      </Container>
    </>
  );
};

export default MyWords;
