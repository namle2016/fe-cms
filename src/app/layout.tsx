import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";
import "../assets/styles/globals.scss";
import Head from "next/head";
import StyledComponentsRegistry from "@/store/AntdRegistry";
import ToastProvider from "@/store/ToastProvider";
import UserProvider from "@/shared/userContext";
import AuthProvider from "@/store/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yaly Men Emporium",
  description: "Yaly Men Emporium",
  icons: {
    icon: 'favicon.ico'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ReduxProvider >
            <ToastProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </ToastProvider>
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
