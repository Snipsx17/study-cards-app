/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  LoginSchema,
  RegistrationSchema,
} from "@/domain/schemas/registration.schema";
import { AxiosInstance } from "axios";
import { z } from "zod";
import { axiosClient } from "./axios.client";
import { toast } from "@/hooks/use-toast";

class ApiService {
  private readonly PROTECTED_ROUTES = ["card/", "group/"];
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

    // request and set jwt token
    this.service.interceptors.request.use(
      async (config) => {
        if (
          config.url &&
          this.PROTECTED_ROUTES.some((route) => {
            return config.url?.startsWith(route);
          })
        ) {
          const response = await this.service.get("/auth/refresh-token");

          if (response.data.token) {
            config.headers.Authorization = `Bearer ${response.data.token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
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
    try {
      return await this.service.post("auth/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  }

  async logoutUser() {
    try {
      return await this.service.get("auth/logout");
    } catch (error) {}
  }

  async createGroup(groupName: string) {
    return await this.service.post(
      "group/new",
      { groupName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  async getAllGroups() {
    return await this.service.get("group/all");
  }
}

export const apiService = new ApiService(axiosClient);
