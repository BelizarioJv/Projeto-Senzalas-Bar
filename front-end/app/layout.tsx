// app/layout.tsx
import "./globals.css";
import { Providers } from "./providers"; // Importa o provider que criamos acima

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* O QueryClientProvider agora engloba o app inteiro */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
