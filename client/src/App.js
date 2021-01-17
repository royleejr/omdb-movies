import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/App.scss";

import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NominationsPage from "./pages/NominationsPage/NominationsPage";

function App() {
  const [nominations, setNominations] = useState([
    {
      Title: "The Avengers",
      Year: "2012",
      imdbID: "tt0848228",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Infinity War",
      Year: "2018",
      imdbID: "tt4154756",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Endgame",
      Year: "2019",
      imdbID: "tt4154796",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    },
    {
      Title: "Captain America: The First Avenger",
      Year: "2011",
      imdbID: "tt0458339",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg",
    },
    {
      Title: "The Toxic Avenger",
      Year: "1984",
      imdbID: "tt0090190",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzViNmQ5MTYtMmI4Yy00N2Y2LTg4NWUtYWU3MThkMTVjNjk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    },
  ]);

  const addNomination = (movie) => {
    setNominations(nominations.concat(movie));
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <SearchPage {...props} addNomination={addNomination} />
          )}
        />
        <Route
          path="/movie/:movieId"
          render={(props) => (
            <MovieDetailsPage {...props} addNomination={addNomination} />
          )}
        />
        <Route
          path="/nominations"
          render={(props) => (
            <NominationsPage {...props} nominations={nominations} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
