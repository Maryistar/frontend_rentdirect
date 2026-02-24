import { apiRequest } from "../../infrastructure/api/apiClient";

export const loginService = (credentials) => {
  return apiRequest("/auth/login", "POST", credentials);
};