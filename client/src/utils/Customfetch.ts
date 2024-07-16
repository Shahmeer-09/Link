import axios from "axios";
import { AxiosResponse } from "axios";

export interface AxiosError {
  response?: AxiosResponse;
  message: string;
}
const Customfetch = axios.create({
  baseURL: "/api",
});

Customfetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.statusCode === 401) {
      console.log(error.response);

      window.location.href = "/auth";
   
      Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default Customfetch;
