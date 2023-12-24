import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  CancelTokenStatic,
} from "axios";
import {
  transformRequestData,
  handleAxiosError,
  handleResponseError,
  handleBackendError,
} from "@/utils/service";
import type { BackendServiceResult } from "@/types/service";
import { getToken } from "@/utils/auth/user";

export default class RequestInstance {
  instance: AxiosInstance;
  private backendSuccessCode = 200;
  cancelToken: CancelTokenStatic;
  constructor(config: AxiosRequestConfig) {
    //本质还是创建axios实例
    this.instance = axios.create(config);
    this.cancelToken = axios.CancelToken;
    //给axios实例设置请求拦截和响应拦截
    this.setInterceptor();
  }
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config) => {
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers["Content-Type"] as string;
          handleConfig.data = await transformRequestData(
            handleConfig.data,
            contentType,
          );
          // 设置token
          handleConfig.headers.Authorization = getToken();
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { status } = response;
        if (status === 200 || status < 300 || status === 304) {
          const backendServiceResult = response.data as BackendServiceResult;
          if (backendServiceResult.code === this.backendSuccessCode) {
            return Promise.resolve(backendServiceResult.data);
          }
          const error = handleBackendError(backendServiceResult);
          return Promise.reject(error);
        }
        const error = handleResponseError(response);
        return Promise.reject(error);
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return Promise.reject(error);
      },
    );
  }
}
