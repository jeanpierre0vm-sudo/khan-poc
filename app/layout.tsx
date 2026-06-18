import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Screener Submission - Project Manager, Content Operations",
  description: "An AI-powered video metadata pipeline built as a screener submission for Khan Academy. Proof of concept by Victor Meinert.",
  openGraph: {
    title: "Screener Submission - Project Manager, Content Operations",
    description: "An AI-powered video metadata pipeline built as a screener submission for Khan Academy. Proof of concept by Victor Meinert.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-950">
          <div className="sticky top-0 z-50 bg-gray-950">
            <header className="border-b border-gray-800 px-8 py-5">
              <div className="max-w-6xl mx-auto flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold tracking-tight text-white">Screener Submission - Project Manager, Content Operations</p>
                  <div className="mt-2">
                    <Nav />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0 ml-8">
                  <p className="text-xs text-gray-500">Built by Victor Meinert</p>
                  <a href="mailto:jeanpierre0vm@gmail.com" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">jeanpierre0vm@gmail.com</a>
                  <a href="https://www.linkedin.com/in/victormeinert" className="text-xs text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">linkedin.com/in/victormeinert</a>
                </div>
              </div>
            </header>
          </div>
          {children}
        </body>
    </html>
  );
}
