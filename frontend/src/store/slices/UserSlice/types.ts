export interface User {
  id: number;
  username: string;
  email: string;
}

export interface RegisterReq {
  email: string;
  password: string;
  username: string;
}

export interface LoginReq {
  email: string;
  password: string;
}
