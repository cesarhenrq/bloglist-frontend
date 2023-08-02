import axios from "axios";
const baseUrl = "/api/login";

const authenticate = (credentials) => {
  const request = axios.post(`${baseUrl}`, credentials);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { authenticate };
