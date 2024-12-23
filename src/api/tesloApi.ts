import axios from "axios";
import { useAuthStore } from "../store/auth/auth.store";

const tesloApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default tesloApi;
