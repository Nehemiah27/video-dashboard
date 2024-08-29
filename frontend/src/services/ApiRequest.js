import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const post = async (url, data, config = {}) => {
  const authToken = localStorage.getItem("authToken"),
    api = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${authToken}`,
      },
    });
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("authUser");
      localStorage.removeItem("authUserLastName");
      localStorage.removeItem("authEmail");
      localStorage.removeItem("authID");
      localStorage.removeItem("authPhone");
      localStorage.removeItem("authAvatar");
      localStorage.removeItem("authBio");
      if (window.location.pathname !== "/login")
        window.location.href = "/login";
    }
    console.error("POST request failed:", error);
    throw error;
  }
};

export const get = async (url) => {
  const authToken = localStorage.getItem("authToken"),
    api = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${authToken}`,
      },
    });
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("authUser");
      localStorage.removeItem("authUserLastName");
      localStorage.removeItem("authEmail");
      localStorage.removeItem("authID");
      localStorage.removeItem("authPhone");
      localStorage.removeItem("authAvatar");
      localStorage.removeItem("authBio");
      if (window.location.pathname !== "/login")
        window.location.href = "/login";
    }
    console.error("GET request failed:", error);
    throw error;
  }
};
