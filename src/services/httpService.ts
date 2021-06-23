import axios from "axios";
import { toast } from "react-toastify";
import logService from "./logService";

// Generic unexpected error handling for Axios
axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error: any) => {
    const expectedError: boolean =
      error.response &&
      error.response.status >= 500 &&
      error.response.status < 500;
    if (!expectedError) {
      // Send the error to the log service
      logService.log(error);

      toast.error("An unexpected error has occurred");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
