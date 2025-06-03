import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";

export const metadata = {
  title: "Jean A. Silva – Portfolio",
  description: "Portfolio de Jean A. Silva.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" /* SEM a classe scroll-smooth ou outras classes aqui */>
      <body className="scroll-smooth antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
