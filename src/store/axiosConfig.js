import axios from "axios";

// ─── Axios Instance 1: Spring Boot Backend ────────────────────────────────────
export const backendAxios = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Axios Instance 2: OMDB API ───────────────────────────────────────────────
export const omdbAxios = axios.create({
  baseURL: "https://www.omdbapi.com",
  timeout: 10000,
  params: {
    apikey: "d2c413b9", // default param on every OMDB request
  },
});

// ─── Request Interceptor (Backend) ───────────────────────────────────────────
// Runs before every request to Spring Boot
backendAxios.interceptors.request.use(
  (config) => {
    console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// ─── Response Interceptor (Backend) ──────────────────────────────────────────
// Runs after every response from Spring Boot
backendAxios.interceptors.response.use(
  (response) => {
    console.log(`[API RESPONSE] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const status  = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 400) console.error("[API 400] Bad Request:", message);
    if (status === 404) console.error("[API 404] Not Found:", message);
    if (status === 500) console.error("[API 500] Server Error:", message);

    return Promise.reject(error);
  }
);

// ─── Request Interceptor (OMDB) ───────────────────────────────────────────────
omdbAxios.interceptors.request.use(
  (config) => {
    console.log(`[OMDB REQUEST] ${config.baseURL}?i=${config.params?.i}`);
    return config;
  },
  (error) => Promise.reject(error)
);