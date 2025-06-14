import { BASE_API_URL } from "@/constants";
import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.token) {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      (Array.isArray(error.response?.data?.message)
        ? error.response?.data?.message[0]
        : error.response?.data?.message) ||
      error.message ||
      "Une erreur est survenue";

    toast.error(errorMessage, {
      position: "bottom-center",
    });

    return Promise.reject(error);
  }
);

export default api;
