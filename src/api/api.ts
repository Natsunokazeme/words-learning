import axios, { AxiosInstance } from 'axios';

// export interface IApi {
//   get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
//   post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
//   put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
//   delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
// }

let requestCount = 0;


const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3010',
  timeout: 10000,
});

const decreaseRequestCount = () => {
  requestCount--;
  if (requestCount === 0) {
    // hide loading
    document.dispatchEvent(new CustomEvent('ShowLoading', { detail: false }));
  }
};


axiosInstance.interceptors.request.use(
  (config) => {
    requestCount++;
    if (requestCount === 1) {
      // show loading
      document.dispatchEvent(new CustomEvent('ShowLoading', { detail: true }));
    }
    //todo set config and add loading
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    decreaseRequestCount();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    decreaseRequestCount()
    return response;
  },
  (error) => {
    decreaseRequestCount()
    return Promise.reject(error);
  }
);

export const get = <T>(url: string, config?: any): Promise<T> => {
  return axiosInstance.get(url, config);
};

export const post = <T>(url: string, data?: any, config?: any): Promise<T> => {
  return axiosInstance.post(url, data, config);
};

export const put = <T>(url: string, data?: any, config?: any): Promise<T> => {
  return axiosInstance.put(url, data, config);
};

export const del = <T>(url: string, config?: any): Promise<T> => {
  return axiosInstance.delete(url, config);
};

export default axiosInstance;

