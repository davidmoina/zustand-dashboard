import { AxiosError } from "axios";
import tesloApi from "../api/tesloApi";

interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const { data } = await tesloApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);

      throw new Error("Unable to login");
    }
  }

  static async checkStatus(): Promise<LoginResponse> {
    try {
      const { data } = await tesloApi.get<LoginResponse>("/auth/check-status");
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Unauthorized");
    }
  }
}
