import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title: "Yatharth Rathi | Frontend Developer",
  description:
    "Portfolio of Yatharth Rathi, a passionate Frontend Developer specializing in React, Next.js, and modern web design. Explore projects, skills, and experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
