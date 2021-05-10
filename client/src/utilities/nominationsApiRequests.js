import axios from "axios";

const topRatedRequest = [
  axios.get("http://localhost:8080/search/id/tt0111161"),
  axios.get("http://localhost:8080/search/id/tt0068646"),
  axios.get("http://localhost:8080/search/id/tt0071562"),
  axios.get("http://localhost:8080/search/id/tt0468569"),
  axios.get("http://localhost:8080/search/id/tt0050083"),
  axios.get("http://localhost:8080/search/id/tt0108052"),
  axios.get("http://localhost:8080/search/id/tt0167260"),
  axios.get("http://localhost:8080/search/id/tt0110912"),
  axios.get("http://localhost:8080/search/id/tt0060196"),
  axios.get("http://localhost:8080/search/id/tt0120737"),
  axios.get("http://localhost:8080/search/id/tt0137523"),
  axios.get("http://localhost:8080/search/id/tt0109830"),
  axios.get("http://localhost:8080/search/id/tt1375666"),
  axios.get("http://localhost:8080/search/id/tt0167261"),
  axios.get("http://localhost:8080/search/id/tt0080684"),
  axios.get("http://localhost:8080/search/id/tt0133093"),
  axios.get("http://localhost:8080/search/id/tt0099685"),
  axios.get("http://localhost:8080/search/id/tt0073486"),
  axios.get("http://localhost:8080/search/id/tt0047478"),
  axios.get("http://localhost:8080/search/id/tt0118799"),
];

const actionRequest = [
  axios.get("http://localhost:8080/search/id/tt0172156"),
  axios.get("http://localhost:8080/search/id/tt019033"),
  axios.get("http://localhost:8080/search/id/tt159634"),
  axios.get("http://localhost:8080/search/id/tt0070034"),
  axios.get("http://localhost:8080/search/id/tt0103064"),
  axios.get("http://localhost:8080/search/id/tt0082971"),
  axios.get("http://localhost:8080/search/id/tt0266697"),
  axios.get("http://localhost:8080/search/id/tt0440963"),
  axios.get("http://localhost:8080/search/id/tt0133093"),
  axios.get("http://localhost:8080/search/id/tt0093409"),
  axios.get("http://localhost:8080/search/id/tt0117060"),
  axios.get("http://localhost:8080/search/id/tt1386932"),
  axios.get("http://localhost:8080/search/id/tt0111503"),
  axios.get("http://localhost:8080/search/id/tt0462499"),
  axios.get("http://localhost:8080/search/id/tt0371746"),
  axios.get("http://localhost:8080/search/id/tt0088944"),
  axios.get("http://localhost:8080/search/id/tt0029843"),
  axios.get("http://localhost:8080/search/id/tt1392190"),
  axios.get("http://localhost:8080/search/id/tt0067116"),
  axios.get("http://localhost:8080/search/id/tt0095016"),
];

const comedyRequest = [
  axios.get("http://localhost:8080/search/id/tt0116483"),
  axios.get("http://localhost:8080/search/id/tt0910936"),
  axios.get("http://localhost:8080/search/id/tt0118655"),
  axios.get("http://localhost:8080/search/id/tt0942385"),
  axios.get("http://localhost:8080/search/id/tt1637725"),
  axios.get("http://localhost:8080/search/id/tt0105793"),
  axios.get("http://localhost:8080/search/id/tt0109040"),
  axios.get("http://localhost:8080/search/id/tt0163651"),
  axios.get("http://localhost:8080/search/id/tt0405422"),
  axios.get("http://localhost:8080/search/id/tt0196229"),
  axios.get("http://localhost:8080/search/id/tt0364725"),
  axios.get("http://localhost:8080/search/id/tt0087332"),
  axios.get("http://localhost:8080/search/id/tt0107048"),
  axios.get("http://localhost:8080/search/id/tt0829482"),
  axios.get("http://localhost:8080/search/id/tt0109686"),
  axios.get("http://localhost:8080/search/id/tt9484998"),
  axios.get("http://localhost:8080/search/id/tt1119646"),
  axios.get("http://localhost:8080/search/id/tt0357413"),
  axios.get("http://localhost:8080/search/id/tt0381707"),
  axios.get("http://localhost:8080/search/id/tt0093748"),
];

const animatedRequest = [
  axios.get("http://localhost:8080/search/id/tt1979376"),
  axios.get("http://localhost:8080/search/id/tt2096673"),
  axios.get("http://localhost:8080/search/id/tt2380307"),
  axios.get("http://localhost:8080/search/id/tt2294629"),
  axios.get("http://localhost:8080/search/id/tt4468740"),
  axios.get("http://localhost:8080/search/id/tt0317705"),
  axios.get("http://localhost:8080/search/id/tt2948356"),
  axios.get("http://localhost:8080/search/id/tt0032910"),
  axios.get("http://localhost:8080/search/id/tt0266543"),
  axios.get("http://localhost:8080/search/id/tt1490017"),
  axios.get("http://localhost:8080/search/id/tt3521164"),
  axios.get("http://localhost:8080/search/id/tt0892769"),
  axios.get("http://localhost:8080/search/id/tt0382932"),
  axios.get("http://localhost:8080/search/id/tt0115433"),
  axios.get("http://localhost:8080/search/id/tt0101414"),
  axios.get("http://localhost:8080/search/id/tt0198781"),
  axios.get("http://localhost:8080/search/id/tt0245429"),
  axios.get("http://localhost:8080/search/id/tt0110357"),
  axios.get("http://localhost:8080/search/id/tt0103639"),
  axios.get("http://localhost:8080/search/id/tt0097757"),
];
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
    return await axios.all(topRatedRequest);
  } else if (category === "Action") {
    return await axios.all(actionRequest);
  } else if (category === "Comedy") {
    return await axios.all(comedyRequest);
  } else if (category === "Animated") {
    return await axios.all(animatedRequest);
  }
};

export { getNominations, addNomination, removeNomination, getCategoryMovies };
