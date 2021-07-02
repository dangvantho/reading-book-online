import axios from "axios";

const baseURL='https://reading-book-truyen-full.herokuapp.com/api'
//'http://localhost:3001/api'
const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
  },
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  return {
    ...config,
    headers: {
      token,
      ...config.headers,
    },
  };
});
instance.interceptors.response.use(
  async (res) => {
    if (res && res.data) {
      const { data, token, user } = res.data;
      return { data, token, user };
    }
  },
  (err) => {
    throw new Error(err);
  }
);
export default instance;
