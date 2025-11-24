import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Pokédex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-background">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
