import React, { useState } from "react";
import Form from "./components/Form";
import FreeDict from "./components/FreeDict";
import Merriam from "./components/Merriam";

export default function App() {
  const [word, setWord] = useState("");

  return (
    <div className="App">
      <Form setWord={setWord}></Form>

      {/* Merriam webster */}
      <Merriam word={"fish"}></Merriam>
      <FreeDict word={"fish"}></FreeDict>
    </div>
  );
}
