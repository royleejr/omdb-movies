import axios from "axios";

const getNominations = () => {
  return axios.get("http://localhost:8080/nominations");
};

const addNomination = (movie) => {
  return axios.post("http://localhost:8080/nominations", movie);
};

const removeNomination = (movie) => {
  return axios.put("http://localhost:8080/nominations", movie);
};

const getCategoryMovies = async (category) => {
  if (category === "Top Rated") {
    return await axios.get("http://localhost:8080/category/toprated");
  } else if (category === "Action") {
    return await axios.get("http://localhost:8080/category/action");
  } else if (category === "Comedy") {
    return await axios.get("http://localhost:8080/category/comedy");
  } else if (category === "Animated") {
    return await axios.get("http://localhost:8080/category/animated");
  }
};

export { getNominations, addNomination, removeNomination, getCategoryMovies };
