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

export { getNominations, addNomination, removeNomination };
