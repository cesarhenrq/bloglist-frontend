import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (blog, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const request = axios.post(baseUrl, blog, config);

  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
