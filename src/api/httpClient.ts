import Axios, { AxiosResponse } from "axios";
import __get from 'lodash/get';
import Cookies from "js-cookie";
//import { useAppSelector } from "@/store";

//const { accessToken } = useAppSelector((state) => state.auth);

const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 80000,
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + Cookies.get('accessToken') || '',
      },
    };
    return newConfig;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const { response = {} } = error;

    if (response.status === 401) {
      // TODO
    } else if (response.status === 403) {
      //  message.error(response?.data?.message);
    } else if (response.status === 500) {
      // message.error(response?.data?.message);
    } else {
      return error.response || error.request || error.message;
    }
  }
);

export const axiosHandler = (service: any) => {
  return new Promise<any>(async (resolve) => {
    const response: AxiosResponse = await service();
    const data = __get(response, "data", null);
    const files = __get(response, "data.data", null);
    const httpStatus = __get(response, "status", 500);
    if (data === "" || (response && response.status >= 500)) {
      resolve({ isSuccess: false, isInternalServerError: true });
    }

    const status: number = __get(response, "status", 400);
    const errors: any = __get(response, "data.message", []);

    const isSuccess = status >= 200 && status < 300;
    const isFailure = !isSuccess;
    resolve({
      data,
      status,
      httpStatus,
      errors,
      isSuccess,
      isFailure,
      response,
      isInternalServerError: false,
      files,
    });
  });
};

export default axiosClient;
