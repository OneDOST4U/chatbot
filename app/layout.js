import "./globals.css";

export const metadata = {
  title: "DOST R02 Chatbot",
  description: "Chat about DOST Region II services, programs, and information"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
