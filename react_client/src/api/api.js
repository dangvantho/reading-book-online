import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 3000,
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
