import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Initialize the Inter font (Standard for modern SaaS)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SupportIQ | AI Customer Support Agent",
  description: "Turn your documentation into an intelligent chatbot in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Render the specific page/layout content */}
        {children}
        
        {/* Global Toast Notifications */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}