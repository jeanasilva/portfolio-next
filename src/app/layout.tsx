import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";

export const metadata = {
  title: "Jean A. Silva – Portfolio",
  description: "Portfolio de Jean A. Silva.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Script para aplicar tema antes do carregamento do JavaScript */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldBeDark = theme === 'dark' || (!theme && systemPrefersDark);
                
                if (shouldBeDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                // Em caso de erro, usar preferência do sistema
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              }
            `,
          }}
        />
      </head>
      <body className="scroll-smooth antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}