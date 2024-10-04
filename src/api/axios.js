import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import useLoginRedirect from "../hooks/useLoginRedirect";

class CustomError extends Error {
  status;

  constructor(message, status) {
      super(message);
      this.status = status;
  }
}

const api = axios.create({
    baseURL : 'http://localhost:8008/v1'
});


api.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken != null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;   

    },
    error => {
      return Promise.reject(error);
    }
  );
  
api.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originalRequest = error.config;
      if(error.message == "expired access token"){
        try {
          await useRefreshToken();          
          return api(originalRequest);
        } catch (refreshError) {
            useLoginRedirect();
            return Promise.reject(refreshError);            
        }        
      }
      if(error.status == 401) useLoginRedirect();
 
      return Promise.reject(error);
    }
  );

export default api;