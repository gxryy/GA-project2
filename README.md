# [Word Buddy](https://wordbuddy.netlify.app/)

This app was developed for my General Assembly Software Engineering Immersive Project 2. Build using **React** and **Material UI**, Word Buddy is a simple front end app for users to lookup definitions of words/phrases across various sources.

## Features

- Lookup word / phrases across multiple sources
  - Option to select multiple APIs to query for definition
  - Background image based on queried word
  - Option to read up full definition via learn more button
  - Pronounciation of searched word based on Merriam Webster pronounciation data
  - Suggestion for misspelt words based on Merriam Webster API return data
  - Examples of word usage (Free Dict)
- Favourite words
  - Bookmark word definitions on local storage
  - Serve as a place for user to review saved words
- Random word
  - Generates a random word based on Word API random
  - Gets definition from Merriam Webster
- User defined book section
  - Allows user to add book titles and save word definitions to it
- Custom Dictionary
  - User defined word
  - Required fields: Word, WordType and Definition
- Quiz
  - Ability to select source of word collections (My Words or user's collection of book)
  - Generates a quiz of maximum 10 questions
  - Score tracking system

## APIs

- [Merriam Webster Dictionary API](https://www.dictionaryapi.com/)
- [Free Dictionary API](https://dictionaryapi.dev/)
- [Word API](https://www.wordsapi.com/)
- [Unsplash Images](https://unsplash.com/developers)

## Tech

### [React](https://reactjs.org/)

#### Router

- React Router 6

#### Hooks

- useState
- useEffect
- useContext
- useNavigate
- [useLocalStorageState](https://www.npmjs.com/package/use-local-storage-state)

#### Components

##### Page

- Form.js
  Basic form on landing page with Textfield, checkbox and submit button. Sets lifting state regarding the word searched and the sources checked before navigating to results page.
- Results.js
  Call onto the respective dictionary components depending on user sources checked. Formats the Result page, and conditionally render the pronouciation, and dictionary returns. Calls on unsplash API to query for related images.
- Favourites.js
  Gets favourite list from local storage and renders each entry with CardCreator. Handles the removal of word based on lifting sate to CardCreator.
- MyBooks.js
  Gets book list from local storage and displays on left drawer. Upon selection of book, render word in book list with CardCreator. Handles adding of books and the removal of words in book by setting local storage and state.
- MyWords.js
  Gets user defined list from local storage and renders each entry with CardCreator. Handles the addition of new words through a modal and removal of word based on lifting sate from CardCreator.
- NavBar.js
  Basic Navigtion bar with routing to features
- Quiz.js
  creates cards based on my words and books defined. upon selection of book, randomly select word and definiton with shuffle function. conditionally render the quiz card based on quizList>0. Handles the next button click that changes the state of the progress, definition and answer, then, check if the user input answer is correct before setting the correct count state.
- Random.js
  Calls WordAPI for a random word, and queries Merriam for the returned word.
  \*\* this is due to Word API returning words with no definition.
- Suggestion_MW.js
  Suggestion page for misspelt words based on Merriams API return.

##### Dictionary

- Merriam.js
  Calls FetchAPI with merriams url and API key. if api data is an array of string, lift to suggestion_array and navigate to suggestion page. else, filter and parse data to common object format recognised by CardCreator. Then call CardCreator to render each definition in the Merriam Accordion.

- FreeDictAPI.js
  Calls on FetchAPI with url and API key. Then filter and parse data to common object format recognised by CardCreator. Then call CardCreator to render each definition in the FreeDict Accordion.

- WordAPI.js
  Calls on FetchAPI with url and API key. Then filter and parse data to common object format recognised by CardCreator. Then call CardCreator to render each definition in the FreeDict Accordion.

##### Tools

- CardCreator
  Creates card based in props. Card actions include favourite, learn more and add to books. triggering favourite button will add the word into local storage. Learn more is conditionally rendered if the API has a url for the full definition of word. Add to buttons gets the current books in local storage and handles the adding of words.

- FetchAPI
  Generic fetch given a url, parameters and lifting state to set API data.

### [Material UI](https://mui.com/)

Used exclusively and extensively throughout the app.
Components used include Icons, Typography, Card, Button, Grid, Menu, AppBar, Modal, Container, Box, Stack, Checkbox, FormGroup, Textfield and more..

## Known Issues

- Background images do not load the full length of page

## Future Works

- validation for form.js
- ability to search from user defined dictionary
- Edit / Delete user defined dictionary
- Edit / Delete book title
- Edit / Delete book entries
- Revamp of random word word generator.

## Deployment

[Word Buddy](https://wordbuddy.netlify.app/)
