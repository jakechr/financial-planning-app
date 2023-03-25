import { Request } from 'express';

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface JWT {
  public_key: Buffer;
  private_key: Buffer;
}

export interface Exception {
  status: number;
  message?: string;
  data?: any;
}

export interface UserInfo {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface JWTRequest extends Request {
  user: UserInfo;
}