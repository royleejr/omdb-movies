import axios from "axios";

const getNominations = () => {
  return axios.get("https://omdb-movie-server.herokuapp.com/nominations");
};

const addNomination = (movie) => {
  return axios.post(
    "https://omdb-movie-server.herokuapp.com/nominations",
    movie
  );
};

const removeNomination = (movie) => {
  return axios.put(
    "https://omdb-movie-server.herokuapp.com/nominations",
    movie
  );
};

export { getNominations, addNomination, removeNomination };
