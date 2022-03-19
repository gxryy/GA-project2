import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Results from "./components/Results";
import NavBar from "./components/Brand";

export default function App() {
  const [word, setWord] = useState("");
  const [source, setSource] = useState([]);

  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={<Form setWord={setWord} setSource={setSource} />}
        />
        <Route path="/results" element={<Results source={source} />} />
        {/* <Route path="/myWords" element={<></>} /> */}
      </Routes>
    </div>
  );
}
