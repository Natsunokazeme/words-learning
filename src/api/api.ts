import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface AxiosConfig extends Omit<AxiosRequestConfig, 'data' | 'baseUrl' | 'url' | 'timeout' | 'method'> {}

let requestCount = 0;


const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://34.92.228.125:3010',
  timeout: 20000,
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

export const get = <T>(url: string, config?: AxiosConfig): Promise<T> => {
  return axiosInstance.get(url, config);
};

export const post = <T>(url: string, data?: any, config?: AxiosConfig): Promise<T> => {
  return axiosInstance.post(url, data, config);
};

export const put = <T>(url: string, data?: any, config?: AxiosConfig): Promise<T> => {
  return axiosInstance.put(url, data, config);
};

export const del = <T>(url: string, config?: AxiosConfig): Promise<T> => {
  return axiosInstance.delete(url, config);
};

export default axiosInstance;

