import axios from "axios";
import { toast } from "react-toastify";

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
      // Simulate a log entry
      console.log("[ERROR] ", error);

      // Simulate a friendly error message
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
