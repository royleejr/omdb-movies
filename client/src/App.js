import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/App.scss";

import SearchPage from "./pages/SearchPage/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NominationsPage from "./pages/NominationsPage/NominationsPage";

function App() {
  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  // const fetchMovies = () => {
  //   Axios.get(`http://localhost:8080/search/${"ram"}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/movie/:movieId" exact component={MovieDetailsPage} />
        <Route path="/nominations" exact component={NominationsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
