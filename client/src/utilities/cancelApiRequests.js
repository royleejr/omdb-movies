import axios from "axios";

const cancel = () => {
  let token;

  return async (query) => {
    if (token) {
      token.cancel();
    }
    token = axios.CancelToken.source();
    try {
      const res = await axios.get(query, { cancelToken: token.token });
      const result = res.data;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Cancelled the request");
      } else {
        console.log("Error: ", error.message);
      }
    }
  };
};

export const cancelApiRequests = cancel();
