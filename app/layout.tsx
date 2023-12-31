import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/provider/modal-provider";
import { ToasterProvider } from '@/provider/toast-provider';
import { ThemeProvider } from "@/provider/theme-provider"

const font = Poppins({weight: "400", subsets: ["latin"]}); // Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Megalinks admin Dashboard",
  description: "Share editing resources with everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
