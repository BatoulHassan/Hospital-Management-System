import axios from "axios";

const API_URL = 'https://pk.jamous-tech.com/api';

const getToken = () => localStorage.getItem("token")

export const axiosInstance = axios.create({  
    baseURL: API_URL,  
  }); 

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${getToken()}`;
      console.log('sending the request')
      return config;
    },
    (error) => {
       if(error.reponse) {
        console.error("Request error: ", error.reponse.data)
        console.error("Status error: ", error.reponse.status)
       }
       else if(error.request){
        console.error("No response received:", error.request)
       }
       else {
        console.error("error setting up request: ", error.message)
       }
       return Promise.reject(error)
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('request has been received')
      return response;
    },
  
    (error) => {
      console.log(error)
    }
  );

  export default axiosInstance