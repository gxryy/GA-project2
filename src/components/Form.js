import React from "react";

const Form = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.setWord(event.target.searchBox.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <h1>Dictionary</h1>
      <label htmlFor="searchBox">Search Here:</label>
      <input
        type="text"
        name="searchBox"
        id="searchBox"
        placeholder="search word"
      ></input>
      <input type="submit"></input>
    </form>
  );
};

export default Form;
