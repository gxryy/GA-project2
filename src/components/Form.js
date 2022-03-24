import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import BGContext from "./BGContext";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Form = (props) => {
  const navigate = useNavigate();
  const imgCtx = useContext(BGContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    props.setWord(form.searchBox.value);
    props.setSource({
      Merriam: form.Merriam.checked,
      FreeDict: form.FreeDict.checked,
      WordAPI: form.WordAPI.checked,
    });
    navigate("/results");
  };

  return (
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
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        height: `calc(100vh - 80px)`,
      }}
    >
      <form onSubmit={submitHandler}>
        <Container
          maxWidth="sm"
          style={{
            backgroundColor: "rgba(255 , 255, 255, 0.7)",
          }}
        >
          <Typography variant="h1">Define..</Typography>

          <TextField
            fullWidth
            autoFocus
            id="searchBox"
            label="Search for..."
            variant="outlined"
            size="medium"
            margin="normal"
          ></TextField>

          <FormGroup sx={{ margin: "2em" }}>
            <Container>
              <FormControlLabel
                control={<Checkbox defaultChecked id="Merriam" />}
                labelPlacement="bottom"
                label="Merriam webster"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked id="FreeDict" />}
                labelPlacement="bottom"
                label="FreeDict"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked id="WordAPI" />}
                labelPlacement="bottom"
                label="Word API"
              />
            </Container>
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
            sx={{ marginBottom: "3em" }}
          >
            Define
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default Form;
