import axios from "axios";

const getNominations = () => {
  return axios.get("https://omdb-movies-server.onrender.com/nominations");
};

const addNomination = (movie) => {
  return axios.post(
    "https://omdb-movies-server.onrender.com/nominations",
    movie
  );
};

const removeNomination = (movie) => {
  return axios.put(
    "https://omdb-movies-server.onrender.com/nominations",
    movie
  );
};

const getCategoryMovies = async (category) => {
  if (category === "Top Rated") {
    return await axios.get(
      "https://omdb-movies-server.onrender.com/category/toprated"
    );
  } else if (category === "Action") {
    return await axios.get(
      "https://omdb-movies-server.onrender.com/category/action"
    );
  } else if (category === "Comedy") {
    return await axios.get(
      "https://omdb-movies-server.onrender.com/category/comedy"
    );
  } else if (category === "Animated") {
    return await axios.get(
      "https://omdb-movies-server.onrender.com/category/animated"
    );
  }
};

export { getNominations, addNomination, removeNomination, getCategoryMovies };
