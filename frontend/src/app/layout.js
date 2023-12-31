import "./global.css";
import "./home.css";
import "./create-machine/createMachines.css";
import "./sign-in/signIn.css";
import Navbar from "@/components/Navbar";
import { SessionContextProvider } from "@/app/context/session";

export const metadata = {
  title: "Envap",
  description: "A simple environment manager",
  icons: {
    icon: "logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionContextProvider>
          <Navbar />
          <div className="px-36 py-[12vh] h-full shadow">{children}</div>
        </SessionContextProvider>
      </body>
    </html>
  );
}
