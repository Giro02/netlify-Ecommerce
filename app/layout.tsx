import "./globals.css";
import Layout from "../components/LayoutQi";
import CookiePopup from "@/components/CookiePopup";

export const metadata = {
  title: "CONECTA + | Automação Residencial e Industrial",
  description: "Encontre produtos para a melhorar a sua qualidade de vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="16x16"></link>
      </head>

      <body>
        <Layout>{children}</Layout>
        <CookiePopup></CookiePopup>
      </body>
    </html>
  );
}
