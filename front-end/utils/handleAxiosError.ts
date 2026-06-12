import axios, { AxiosError } from "axios";

export function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ||
      axiosError.message ||
      "Erro inesperado na requisição";
    throw new Error(message);
  }
  throw new Error("Erro desconhecido");
}
