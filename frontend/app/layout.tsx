import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Pokemon App",
  description: "Browse and explore Pokemon from the Pokemon API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}

