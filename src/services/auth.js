import axios from "axios";
const baseUrl = "/api/login";

const authenticate = async (credentials) => {
  const user = await axios.post(`${baseUrl}`, credentials);

  return user.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { authenticate };
