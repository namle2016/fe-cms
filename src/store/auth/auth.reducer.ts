import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from './auth.type';
//import { loginAction } from './auth.action';

const initialState: AuthState = {
  user: {
    email: '',
    avatar: '',
    role: ''
  },
  accessToken: '',
  error: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<User>) => ({
      ...state,
      user: action.payload,
    }),
    setToken: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      accessToken: action.payload,
    }),
  },

  extraReducers: (builder) => {
    // builder
    //   .addCase(loginAction.pending, (state: AuthState) => ({
    //     ...state,
    //     token: {
    //       expiresIn: 0,
    //       accessToken: '',
    //       refreshToken: '',
    //     },
    //     user: {
    //       data: {
    //         email: '',
    //         fullname: '',
    //         avatar: '',
    //         password: '',
    //         role: ''
    //       },
    //       accessToken: ''
    //     },
    //     error: '',
    //     loading: true,
    //   }))
    //   .addCase(loginAction.fulfilled, (state: AuthState, action: any) => {
    //     const user = action.payload;
    //     // khi đăng nhập thành công thì lưu vào local ở dạng string
    //     localStorage.setItem(
    //       'persist:auth-yaly-fabric',
    //       JSON.stringify({
    //         token: user.access_token,
    //         user: user.data,
    //       })
    //     );
    //     // return tự động đồng bộ persist auth ở dạng json object
    //     return {
    //       ...state,
    //       user: user,
    //       error: '',
    //       loading: false,
    //     };
    //   })
    //   .addCase(loginAction.rejected, (state: AuthState, action: any) => {
    //     return {
    //       ...state,
    //       user: {
    //         data: {
    //           email: '',
    //           fullname: '',
    //           avatar: '',
    //           password: '',
    //           role: ''
    //         },
    //         accessToken: ''
    //       },
    //       error: 'error',
    //       loading: false,
    //     };
    //   })
  },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
