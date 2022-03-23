import React, { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Results from "./components/Results";
import NavBar from "./components/NavBar";
import Suggestion_MW from "./components/Suggestion_MW";
import MyWords from "./components/MyWords";
import MyBooks from "./components/MyBooks";
import FetchAPI from "./components/FetchAPI";
import keys from "./keys";
import BGContext from "./components/BGContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#fefefe",
    },
  },
  typography: {
    fontFamily: "Quicksand,Roboto,Arial",
  },
});

export default function App() {
  const [word, setWord] = useState("");
  const [source, setSource] = useState({});
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [APIdata, setAPIData] = useState("");
  const [imgArray, setImgArray] = useState([]);
  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1519882189396-71f93cb4714b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMTI0MzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDgwMDA4OTE&ixlib=rb-1.2.1&q=85"
  );

  useEffect(() => {
    const API_KEY = keys.unsplash1;
    const url = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=25&orientation=portrait `;
    FetchAPI(url, {}, setAPIData);
  }, []);

  useEffect(() => {
    if (APIdata) processData();
  }, [APIdata]);

  const processData = () => {
    console.log(APIdata);
    setImgArray(
      APIdata.map((element) => {
        return element.urls.regular;
      })
    );
  };

  return (
    <BGContext.Provider value={imgArray}>
      <ThemeProvider theme={theme}>
        <div>
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

            <Route path="/mywords" element={<MyWords />} />
            <Route path="/mybooks" element={<MyBooks />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BGContext.Provider>
  );
}
