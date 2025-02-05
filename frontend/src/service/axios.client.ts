import { envs } from "@/config/envs.plugin";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: envs.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
