export type ParamLogin = {
  email: string;
  password: string;
  type?: string;
};
export type User = {
  email: string,
  avatar: string,
  role: string,
};

export type AuthState = {
  user: User
  accessToken: string
  error: string
  loading: boolean
};