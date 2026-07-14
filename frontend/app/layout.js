import "./globals.css";

export const metadata = {
  title: "Estuda+",
  description: "Organização de tarefas escolares",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}