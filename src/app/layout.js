import "./globals.css";

export const metadata = {
  title: "Envap",
  description: "A simple environment manager",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
