import axios from 'axios';
const baseUrl = '/api/login';

const authenticate = async (credentials) => {
  const user = await axios.post(`${baseUrl}`, credentials);

  return user.data;
};

const authService = { authenticate };

export default authService;
