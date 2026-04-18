import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "OncoVision | AI Tumor Intelligence",
  description: "AI brain tumor progression forecasting web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={cn("h-screen w-screen overflow-hidden bg-background font-sans antialiased text-foreground")}>
        <div className="flex h-full w-full">
          {/* Sidebar Area */}
          <div className="hidden md:flex h-full shrink-0">
            <Sidebar />
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
