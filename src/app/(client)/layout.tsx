import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import type { Metadata } from "next";
import { Fragment } from "react";


export const metadata: Metadata = {
  title: "Yaly Men Emporium",
  description: "Yaly Men Emporium",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}