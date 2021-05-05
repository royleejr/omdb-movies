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

const getTopRated = async () => {
  const movie1 = axios.get("http://localhost:8080/search/id/tt0111161");
  const movie2 = axios.get("http://localhost:8080/search/id/tt0068646");
  const movie3 = axios.get("http://localhost:8080/search/id/tt0071562");
  const movie4 = axios.get("http://localhost:8080/search/id/tt0468569");
  const movie5 = axios.get("http://localhost:8080/search/id/tt0050083");
  const movie6 = axios.get("http://localhost:8080/search/id/tt0108052");
  const movie7 = axios.get("http://localhost:8080/search/id/tt0167260");
  const movie8 = axios.get("http://localhost:8080/search/id/tt0110912");
  const movie9 = axios.get("http://localhost:8080/search/id/tt0060196");
  const movie10 = axios.get("http://localhost:8080/search/id/tt0120737");

  return await axios.all([
    movie1,
    movie2,
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
    movie8,
    movie9,
    movie10,
  ]);
};

//shawshank - tt0111161
//godfather - tt0068646
//godfather 2 - tt0071562
//dark knight - tt0468569
//12 angry men - tt0050083

//schindlers - tt0108052

//lotr return of the king - tt0167260

//"Pulp Fiction", Year: "1994", imdbID: "tt0110912"
//The Good, the Bad and the Ugly", Year: "1966", imdbID: "tt0060196"
//lotr fellowship - "tt0120737"

export { getNominations, addNomination, removeNomination, getTopRated };
