import React, { useState } from "react";
import { nanoid } from "nanoid";
import useLocalStorageState from "use-local-storage-state";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Paper,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

//Card components takes in a prop called def, an object with the information required to display each card
// def= {
// word: a string of the word
// wordType: string of wordtype
// shortDef: an array of objects with definition and example(optional) as key [{definition: first definition },{definition: second definition, example: second example }]
// dict: string of source
// fullDef URL: string of the url for full definition
// id: string as identifier
// }

const CardCreator = (props) => {
  const [buttonState, setButtonState] = useState(false);
  const [books, setBooks] = useLocalStorageState("books", { defaultValue: [] });

  // definitionArray is an array that consist of react elements. Each array element contains a definition element and optionally an example element.
  // definitionArray is obtained by mapping shortDef and returning the definition and example elements respectively.
  const definitionArray = props.def.shortDef.map((element) => {
    return (
      <div key={nanoid()}>
        <li key={nanoid()} style={{ textAlign: "left" }}>
          <Typography variant="h6" sx={{ fontWeight: "400" }}>
            {element.definition}
          </Typography>
        </li>
        <Typography key={nanoid()} variant="body1">
          {element?.example}
        </Typography>
      </div>
    );
  });

  const definitionHandler = () => {
    let url = props.def.fullDef;
    if (url) window.open(props.def.fullDef);
  };

  const addHandler = (event) => {
    setButtonState(true);
    // get local storage
    // push to local storage

    const localMyWords = localStorage.getItem("myWords");
    if (!localMyWords) {
      localStorage.setItem("myWords", JSON.stringify([props.def]));
      console.log(`no local storage. created mywords`);
    } else {
      console.log(`there is existing`);
      const parsedLocal = JSON.parse(localMyWords);
      parsedLocal.push(props.def);
      localStorage.setItem("myWords", JSON.stringify(parsedLocal));
      console.log(`added`);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleAddToBook = (event, id) => {
    setBooks((prevState) => {
      let book = prevState.find((element) => element.id == id);
      let index = prevState.findIndex((element) => element.id == id);
      console.log(book);
      let newWords = [...book.words, props.def];
      console.log(newWords);
      let newState = JSON.parse(JSON.stringify(prevState));
      newState[index].words = JSON.parse(JSON.stringify(newWords));
      return newState;
    });
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item>
        <Paper>
          <Card
            sx={{ width: 500 }}
            // variant="outlined"
            elevation={10}
            xs={12}
            md={6}
            lg={4}
            xl={4}
          >
            <CardContent>
              <Typography variant="h3" component="div">
                {props.def.word}
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" color="text.secondary">
                {props.def.wordType}
              </Typography>
              <ol type="1">{definitionArray}</ol>
              <Typography variant="caption" align="left">
                Source: {props.def.dict}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              {props.removeHandler ? (
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => props.removeHandler(props.def)}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="outlined"
                  onClick={addHandler}
                  disabled={buttonState}
                >
                  Add to My Words
                </Button>
              )}
              {props.def.fullDef && (
                <Button
                  size="large"
                  variant="outlined"
                  onClick={definitionHandler}
                >
                  Learn More
                </Button>
              )}
              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={(event) => setAnchorEl(event.currentTarget)}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Add to
              </Button>
              <StyledMenu
                id="Add to"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {books.map((book) => {
                  return (
                    <MenuItem
                      onClick={(e) => handleAddToBook(e, book.id)}
                      disableRipple
                    >
                      <CircleIcon style={{ color: book.color }} />
                      {book.title}
                    </MenuItem>
                  );
                })}
              </StyledMenu>
            </CardActions>
          </Card>
        </Paper>
      </Grid>
    </>
  );
};
//InfoContainer contains the Word, wordtype and button to add to myword
//displays list of definitions as an ordered list starting from 1.
// Source to indicate source of definition.

export default CardCreator;
