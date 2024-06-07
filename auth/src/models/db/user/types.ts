export interface User {
  id: number;
  email: string;
  password: string;
}

export interface userPayload extends Omit<User, "password"> {}
