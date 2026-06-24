import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/login.service";
import { toast } from "sonner";

export function useLoginForm() {
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Login feito com sucesso");
      console.log("Login realizado com sucesso:", data);
    },
    onError: (error) => {
      toast.error("Erro ao fazer login");

      console.error(error);
    },
  });

  return { loginMutation };
}
