import HttpClient from "@/api/httpClient";
import { ParamLogin } from "./auth.type";
import { instanceAxios } from "@/config/axios";

export default class AuthAPI {
  // static login(body: any) {
  //   return HttpClient.post("/auth/login", body);
  // }
  static login({ email, password }: ParamLogin): Promise<any> {
    const url = '/auth/login';
    return instanceAxios.post(url, {
      email,
      password,
    });
  }
}
