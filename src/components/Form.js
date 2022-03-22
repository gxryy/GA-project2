import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Container,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Form = (props) => {
  const navigate = useNavigate();

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
    <form onSubmit={submitHandler}>
      <Container maxWidth="sm">
        <TextField
          fullWidth
          autoFocus
          id="searchBox"
          label="Search for..."
          variant="outlined"
          size="medium"
          margin="normal"
        ></TextField>

        <FormGroup sx={{ marginBottom: "2em" }}>
          <Container>
            <FormControlLabel
              control={<Checkbox defaultChecked id="Merriam" />}
              labelPlacement="bottom"
              label="Merriam webster"
            />
            <FormControlLabel
              control={<Checkbox id="FreeDict" />}
              labelPlacement="bottom"
              label="FreeDict"
            />
            <FormControlLabel
              control={<Checkbox id="WordAPI" />}
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
        >
          Define
        </Button>
      </Container>
    </form>
  );
};

export default Form;
