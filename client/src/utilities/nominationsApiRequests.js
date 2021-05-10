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

const getCategoryMovies = async (category) => {
  if (category === "Top Rated") {
    return await axios.get(
      "https://omdb-movie-server.herokuapp.com/category/toprated"
    );
  } else if (category === "Action") {
    return await axios.get(
      "https://omdb-movie-server.herokuapp.com/category/action"
    );
  } else if (category === "Comedy") {
    return await axios.get(
      "https://omdb-movie-server.herokuapp.com/category/comedy"
    );
  } else if (category === "Animated") {
    return await axios.get(
      "https://omdb-movie-server.herokuapp.com/category/animated"
    );
  }
};

export { getNominations, addNomination, removeNomination, getCategoryMovies };
