import { isAxiosError } from "axios";

interface ErrorMessageI {
  error: string;
  message: string;
}

export const checkResponseErrors = (error: unknown): string => {
  const errorMessages: ErrorMessageI[] = [
    { error: "Invalid refresh token", message: "session expired" },
    { error: "Not refresh token provided", message: "session expired" },
    { error: "Invalid credentials", message: "Invalid credentials" },
    { error: "User already exists", message: "User already exists" },
    { error: "Failed to create user", message: "Failed to create user" },
  ];

  if (isAxiosError(error)) {
    if (error.code === "ECONNABORTED") return "Request timed out";

    const message = errorMessages.find((err) => {
      return error.response?.data.message === err.error;
    });
    if (message) return message.message;
  }

  return "An unexpected error occurred when trying to communicate with the server";
};
