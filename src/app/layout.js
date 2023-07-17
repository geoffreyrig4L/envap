import "./global.css";
import "./home.css";
import "./signIn/signIn.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Envap",
  description: "A simple environment manager",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <div className="py-16 px-36">{children}</div>
      </body>
    </html>
  );
}
