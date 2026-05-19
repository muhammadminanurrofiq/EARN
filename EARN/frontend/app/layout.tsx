import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import MqttProvider from "@/components/MqttProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project EARN - Smart RVM Dashboard",
  description: "Eco Action & Reward Network - Real-time Reverse Vending Machine Monitoring",
  keywords: ["RVM", "Eco", "Reward", "MQTT", "IoT", "Dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable} ${hankenGrotesk.variable}`}>
      <body className="antialiased bg-[color:var(--surface-primary)] text-[color:var(--text-primary)]">
        <MqttProvider>
          <div className="flex min-h-screen h-screen overflow-hidden">
            {/* Sidebar (Fixed width) */}
            <div className="w-60 flex-shrink-0 border-r border-[color:var(--border-subtle)] bg-[color:var(--surface-secondary)]">
              <Sidebar />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[color:var(--surface-primary)]">
              <Header />
              {children}
            </div>
          </div>
        </MqttProvider>
      </body>
    </html>
  );
}
