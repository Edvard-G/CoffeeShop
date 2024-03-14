import axios from "axios";
import { LoginFormSchema } from "../validations/ValidationSchema";

const server_url: string = import.meta.env.VITE_API_URL!;

if (!server_url) {
  throw Object.assign(new Error("Missing API URL"), { code: 500 });
}

const login = (data: LoginFormSchema) => {
  return axios.post(`${server_url}/api/users/login`, data);
};

export { login };
