import auth from '@/store/auth/auth.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ParamLogin,
} from './auth.type';
import { axiosHandler } from '@/api/httpClient';
import AuthAPI from '@/store/auth/auth.api';
import axios from 'axios';

// login user and admin
const loginAction = createAsyncThunk('auth/loginAction', async (params: ParamLogin, thunkAPI) => {
  // try {
  //   const res: any = await AuthAPI.login(params);
  //   console.log(res)
  //   return res;
  // } catch (error: any) {
  //   return thunkAPI.rejectWithValue(null);
  // }
  try {
    // configure header's Content-Type as JSON
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`, params, config
    )
    // store user's token in local storage
    //localStorage.setItem('userToken', data.userToken)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(null)
  }

  // const { isSuccess, data } = await axiosHandler(() =>
  //   AuthAPI.login(params)
  // );
  // if (isSuccess) {
  //   return data;
  // }
  // return thunkAPI.rejectWithValue({ error: "error" });
});

export { loginAction };