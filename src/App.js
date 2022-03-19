import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import FreeDict from "./components/FreeDict";
import Merriam from "./components/Merriam";

export default function App() {
  const [word, setWord] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Form setWord={setWord}></Form>} />
        {/* <Route path="/results" element={<> </>} /> */}
        {/* <Route path="/myWords" element={<></>} /> */}
      </Routes>

      {/* Merriam webster */}
      {/* <Merriam word={"fish"}></Merriam> */}
      {/* <FreeDict word={"fish"}></FreeDict> */}
    </div>
  );
}
