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
  const movie11 = axios.get("http://localhost:8080/search/id/tt0137523");
  const movie12 = axios.get("http://localhost:8080/search/id/tt0109830");
  const movie13 = axios.get("http://localhost:8080/search/id/tt1375666");
  const movie14 = axios.get("http://localhost:8080/search/id/tt0167261");
  const movie15 = axios.get("http://localhost:8080/search/id/tt0080684");
  const movie16 = axios.get("http://localhost:8080/search/id/tt0133093");
  const movie17 = axios.get("http://localhost:8080/search/id/tt0099685");
  const movie18 = axios.get("http://localhost:8080/search/id/tt0073486");
  const movie19 = axios.get("http://localhost:8080/search/id/tt0047478");
  const movie20 = axios.get("http://localhost:8080/search/id/tt0118799");

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
    movie11,
    movie12,
    movie13,
    movie14,
    movie15,
    movie16,
    movie17,
    movie18,
    movie19,
    movie20,
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
