import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { getToken } from './auth';
import router from '@/router';

// baseURL
const BASE_URL = window._CONFIG.BASE_URL as any;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 正确状态
    if (res.code === 200) {
      return res.result || true;
    }
    if (res.code === 401) {
      router.push('/login');
    }
    // 异常
    console.log(res.message);
    return undefined;
  },
  (error) => {
    console.log('err' + error); // for debug
    // 没权限时，不再重复提示
    if (error === '没有操作权限') return;
    console.log('网络超时，稍后再试吧');
  },
);

const request = <T = any>(
  config: AxiosRequestConfig | string,
  options?: AxiosRequestConfig,
): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      });
    } else {
      return instance.request<T, T>({
        url: config,
        ...options,
      });
    }
  } else {
    return instance.request<T, T>(config);
  }
};
export function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' }, options);
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'POST' }, options);
}

export default request;
export type { AxiosInstance, AxiosResponse };
