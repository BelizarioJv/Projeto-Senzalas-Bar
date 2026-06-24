"use client";
import { LoginForm } from "@/types/login";
import { useRouter } from "next/navigation";
import { useLoginForm } from "@/hooks/login/useLogin";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Beer } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation } = useLoginForm();

  const form = useForm<LoginForm>({
    defaultValues: {
      user: "",
      password: "",
    },
  });

  function onSubmit(values: LoginForm) {
    loginMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Bem-vindo ao Senzalas Bar!");
        router.replace("/");
      },
      onError: (error: any) => {
        console.error("Erro ao fazer login", error);
        toast.error(
          error?.response?.data?.message || "Não foi possível fazer login",
        );
      },
    });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4">
      {/* Card de login */}
      <Card className="w-full max-w-md border border-slate-800 bg-slate-900 shadow-xl rounded-xl">
        <CardHeader className="space-y-6 pb-6 text-center">
          {/* Logo / Branding */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
              <Beer size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-amber-400">SENZALAS BAR</h1>
          <CardDescription className="text-slate-400 text-2xl">
            Controle administrativo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Campo Usuário */}
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-2xl text-slate-200 font-extrabold block mb-2">
                      Usuário
                    </label>
                    <FormControl>
                      <Input
                        placeholder="Digite seu usuário"
                        type="text"
                        disabled={loginMutation.isPending}
                        className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 rounded-md focus:border-amber-500 focus:ring-amber-500 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              {/* Campo Senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-2xl text-slate-200 font-medium">
                        Senha
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-sm text-amber-500/70 hover:text-amber-400 transition-colors">
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </button>
                    </div>

                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          disabled={loginMutation.isPending}
                          className="bg-slate-800 border border-slate-700  text-white placeholder:text-slate-500 rounded-md focus:border-amber-500 focus:ring-amber-500 transition-colors pr-10"
                          {...field}
                        />
                      </FormControl>

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                        {showPassword ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              {/* Mensagem de erro geral */}
              {loginMutation.isError && (
                <div className="bg-red-950/30 border border-red-500/20 text-red-300 text-sm px-3 py-2 rounded-md">
                  {loginMutation.error?.message || "Erro ao fazer login"}
                </div>
              )}

              {/* Botão de submissão */}
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2 rounded-md transition-all duration-200 shadow-lg hover:shadow-amber-500/20 disabled:opacity-70 disabled:cursor-not-allowed">
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-slate-500 text-xs">
        <p>
          &copy; {new Date().getFullYear()} Senzalas Bar. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
