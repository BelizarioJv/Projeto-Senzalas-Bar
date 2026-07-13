import { api } from "./api";
import { LoginForm } from "@/types/login";
import Cookies from "js-cookie";
import { handleAxiosError } from "@/utils/handleAxiosError";

export async function login(data: LoginForm) {
  try {
    const response = await api.post("/login", data);
    Cookies.set("token", response.data.token, { expires: 0.1 });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
