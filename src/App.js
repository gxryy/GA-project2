import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Results from "./components/Results";
import NavBar from "./components/NavBar";
import Suggestion_MW from "./components/Suggestion_MW";

export default function App() {
  const [word, setWord] = useState("");
  const [source, setSource] = useState({});
  const [suggestionArray, setSuggestionArray] = useState([]);

  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={<Form setWord={setWord} setSource={setSource} />}
        />
        <Route
          path="/results"
          element={
            <Results
              source={source}
              word={word}
              setSuggestionArray={setSuggestionArray}
            />
          }
        />
        <Route
          path="/suggest"
          element={
            <Suggestion_MW
              suggestionArray={suggestionArray}
              setWord={setWord}
              setSource={setSource}
            />
          }
        />
        {/* <Route path="/myWords" element={<></>} /> */}
      </Routes>
    </div>
  );
}
