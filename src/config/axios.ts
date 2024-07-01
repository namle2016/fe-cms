import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

// url nào không nằm trong array thì sẽ refresh token
const routerNotRefreshed = ['reset-password', '/auth/login', '/favorites/me/only-product-id'];

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const instanceAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('persist:auth-yaly-fabric') ?? '';
  // khi đăng nhập thì userInfo có kiểu string, những lần sau sẽ là object json
  const persist = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
  const tokenInfo = typeof persist.token === 'object' ? persist.token : JSON.parse(persist.token);

  if (tokenInfo.accessToken) {
    const modifiedConfig = { ...config };
    modifiedConfig.headers.Authorization = `Bearer ${tokenInfo.accessToken}`;
    return modifiedConfig;
  }
  return config;
});

instanceAxios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;
    const persist = JSON.parse(localStorage.getItem('persist:auth-yaly-fabric') ?? '');
    const tokenInfo = JSON.parse(persist.token ?? '');
    const currentURL = new URL(window.location.href);
    // khi api bị lỗi 401
    if (
      error.response?.status === 401 &&
      !routerNotRefreshed.includes(originalRequest.url as string)
    ) {
      // kiểm tra có accessToken hoặc refreshToken khong
      if (!tokenInfo?.refreshToken || !tokenInfo?.accessToken) {
        localStorage.setItem(
          'persist:auth-yaly',
          JSON.stringify({
            token: '',
            user: '',
          })
        );
        if (currentURL.pathname.includes('admin')) {
          window.location.href = `${currentURL.origin}/admin/dang-nhap`;
        }
      }
      const decodedRefreshToken =
        tokenInfo?.refreshToken && jwtDecode(tokenInfo?.refreshToken || '');
      // nếu refreshToken hết hạn thì đăng nhập lại
      if (decodedRefreshToken.exp! * 1000 < new Date().getTime()) {
        if (currentURL.pathname.includes('admin')) {
          localStorage.setItem(
            'persist:auth-yaly',
            JSON.stringify({
              token: '',
              user: '',
            })
          );
          window.location.href = `${currentURL.origin}/admin/dang-nhap`;
        }
      }
      const headersWithRefreshToken = {
        refreshToken: `${tokenInfo.refreshToken}`,
      };
      if (!routerNotRefreshed.includes(originalRequest.url as string)) {
        return axios
          .post(`${baseURL}auth/refresh-token`, null, { headers: headersWithRefreshToken })
          .then((response) => {
            localStorage.setItem(
              'persist:auth-yaly',
              JSON.stringify({
                token: response.data.data,
                user: persist.user,
              })
            );

            return instanceAxios(originalRequest);
          })
          .catch((err) => {
            if (
              err?.response?.data?.message === 'USER_NOT_FOUND' &&
              currentURL.pathname.includes('admin')
            ) {
              localStorage.setItem(
                'persist:auth-yaly',
                JSON.stringify({
                  token: '',
                  user: '',
                })
              );
              // window.location.href = `${currentURL.origin}/admin/dang-nhap`;
            }
            return Promise.reject(err);
          })
          .finally(() => { });
      }
    }
    return Promise.reject(error);
  }
);
