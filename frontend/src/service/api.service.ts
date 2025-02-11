import {
  LoginSchema,
  RegistrationSchema,
} from "@/domain/schemas/registration.schema";
import { AxiosInstance } from "axios";
import { z } from "zod";
import { axiosClient } from "./axios.client";
import { toast } from "@/hooks/use-toast";

class ApiService {
  constructor(private readonly service: AxiosInstance) {
    this.service.interceptors.response.use(
      (response) => response,
      (error) => {
        const message =
          error.response?.data?.message || "An unexpected error occurred.";

        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });

        return Promise.reject({ message: error.message });
      },
    );
  }

  async registerUser(user: z.infer<typeof RegistrationSchema>) {
    return await this.service.post("auth/user-register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async loginUser(user: z.infer<typeof LoginSchema>) {
    return await this.service.post("auth/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async logoutUser() {
    return await this.service.get("auth/logout");
  }

  async createGroup(groupName: string) {
    console.log({ groupName });
  }
}

export const apiService = new ApiService(axiosClient);
