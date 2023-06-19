import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Envap",
  description: "A simple environment manager",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="winter">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
