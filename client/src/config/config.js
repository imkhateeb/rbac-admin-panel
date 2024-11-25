const AUTH_TOKEN = localStorage.getItem("authToken");

export const config = {
  API_URL: import.meta.env.VITE_BASE_URL,
  AUTH_TOKEN,
};
