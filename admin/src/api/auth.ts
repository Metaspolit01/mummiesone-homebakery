import client from "./client";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await client.post<LoginResponse>("/admin/login", payload);
  return data;
}
