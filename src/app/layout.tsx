import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import PageTransition from "@/components/transition/page-trans";
import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/footer";
import { AuthProvider } from '@/components/auth/AuthProvider';
import AuthGuard from '@/components/auth/AuthGuard';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard da Horta da Fatec PANC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <Nav />
          <AuthGuard>{children}</AuthGuard>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
