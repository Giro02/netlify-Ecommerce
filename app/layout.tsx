import type { Metadata } from "next";
import "./globals.css";
import Layout from "../components/LayoutQi";

export const metadata: Metadata = {
  title: "Essência Qi",
  description: "Encontre produtos para a melhorar a sua qualidade de vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
