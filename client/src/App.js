import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/App.scss";

import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NominationsPage from "./pages/NominationsPage/NominationsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact render={(props) => <SearchPage {...props} />} />
        <Route
          path="/movie/:movieId"
          render={(props) => <MovieDetailsPage {...props} />}
        />
        <Route
          path="/nominations"
          render={(props) => <NominationsPage {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
