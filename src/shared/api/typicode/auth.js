import { apiInstance } from "./base";

const BASE_URL = "/auth";

export const Register = (params) => {
  return apiInstance.post(BASE_URL + "/register", { params });
};
