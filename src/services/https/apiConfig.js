import axios from "axios";
import {BASE_URL} from "../../config";

const instance = axios.create({
  baseURL: `${BASE_URL}api`
});

const handleSuccessResponse = (response) =>{
    return response.data;
}

const handleErrorResponse = error => {
    try {
      // console.log(error.response);
      return Promise.reject(error.response.data)
    } catch (e) {
      return Promise.reject({ message: 'Network Error' })
    }
};


export const setHeaderConfigAxios = (token) => {
    if(token) {
      instance.defaults.headers.common["Authorization"] = token
        ? "Bearer " + token
        : "";
    }else {
      delete instance.defaults.headers.common["Authorization"];
    }
  };
  
instance.interceptors.response.use(handleSuccessResponse,handleErrorResponse);
  
export default instance;