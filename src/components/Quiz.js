import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Grid,
  Button,
  Container,
  Modal,
  Typography,
  Box,
  CardContent,
  CardActions,
  TextField,
  Divider,
} from "@mui/material";
import useLocalStorageState from "use-local-storage-state";
import BGContext from "./BGContext";

const Quiz = () => {
  const imgCtx = useContext(BGContext);

  const [myWords, setMyWords] = useLocalStorageState("mywords", {
    defaultValue: [],
  });
  const [books, setBooks] = useLocalStorageState("books", { defaultValue: [] });
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [rawWordList, setRawWordList] = useState(null);
  const [quizList, setQuizList] = useState([]);
  const [progress, setProgress] = useState({ current: 1, max: 0 });
  const [correct, setCorrect] = useState(0);
  const [current, setCurrent] = useState({
    definition: [],
    word: "",
    progress: 0,
  });
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (selectedQuiz) {
      selectedQuiz == "myWords"
        ? setRawWordList(myWords)
        : setRawWordList(
            books[books.findIndex((book) => book.id == selectedQuiz)].words
          );
    }
    setProgress({ current: 1, max: 0 });
    setCurrent({
      definition: [],
      word: "",
      progress: 0,
    });
  }, [selectedQuiz]);

  useEffect(() => {
    if (rawWordList) shuffleWords();
  }, [rawWordList]);

  useEffect(() => {
    if (quizList.length > 0) {
      setCurrent({
        definition: quizList[0].shortDef,
        word: quizList[0].word,
        progress: 1,
      });
    }
  }, [quizList]);

  const shuffleWords = () => {
    let totalNum = 0;
    let newList = [];
    const rawList = JSON.parse(JSON.stringify(rawWordList));
    rawList.length < 10 ? (totalNum = rawList.length) : (totalNum = 10);
    setProgress((prevState) => {
      return { ...prevState, max: totalNum };
    });
    for (let i = 0; i < totalNum; i++) {
      let index = Math.floor(Math.random() * rawList.length);
      newList.push(rawList[index]);
      rawList.splice(index, 1);
    }
    setQuizList(newList);
  };

  const nextHandler = (event) => {
    event.preventDefault();
    let response = event.target.answer.value.toUpperCase();
    let answer = current.word.toUpperCase();

    if (progress.current < progress.max) {
      setProgress((prevState) => {
        return { ...prevState, current: prevState.current + 1 };
      });
      setCurrent((prevState) => {
        return {
          definition: quizList[prevState.progress].shortDef,
          word: quizList[prevState.progress].word,
          progress: prevState.progress + 1,
        };
      });
      if (progress.current + 1 == progress.max)
        event.target.button.innerText = "SUBMIT";
    } else {
      setQuizList([]);
    }
    if (response === answer) setCorrect((prevState) => prevState + 1);
    event.target.answer.value = null;
  };

  return (
    <>
      <Box
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
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
          marginBottom={5}
        >
          <Grid item>
            <Card xs={12} md={8} lg={4} xl={4}>
              <Button
                variant="outlined"
                onClick={() => setSelectedQuiz("myWords")}
                style={{
                  width: "200px",
                  height: "200px",
                }}
              >
                <Typography>My Words</Typography>
              </Button>
            </Card>
          </Grid>
          {books.map((book) => {
            return (
              <Grid item>
                <Card xs={12} md={8} lg={4} xl={4}>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedQuiz(book.id)}
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  >
                    <Typography>{book.title}</Typography>
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Divider />
        {quizList.length > 0 && (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            marginTop={5}
            // maxWidth="lg"
            // minWidth={"50vw"}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card>
                <form onSubmit={nextHandler}>
                  <CardContent sx={{ width: "60vw" }}>
                    <Container>
                      <Typography variant="h3">Definition</Typography>
                      <Typography align="right" variant="h5">
                        Progress: {progress.current} / {progress.max}
                      </Typography>
                    </Container>
                    {current.definition.map((line) => {
                      return <Typography>{line.definition}</Typography>;
                    })}

                    <TextField
                      fullWidth
                      autoFocus
                      id="answer"
                      label="Answer"
                      variant="outlined"
                      size="medium"
                      margin="normal"
                    ></TextField>
                  </CardContent>
                  <CardActions style={{ justifyContent: "right" }}>
                    <Button
                      variant="outlined"
                      size="large"
                      id="button"
                      type="submit"
                      disabled={buttonState}
                    >
                      Next
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </Grid>
          </Grid>
        )}

        {correct > 0 && (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            marginTop={5}
            // maxWidth="lg"
            // minWidth={"50vw"}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card>
                <Typography variant="h1">Score: {correct}</Typography>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Quiz;
