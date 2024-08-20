import { Inter } from "next/font/google";
import "./globals.css";
import NavbarPage from "@/components/ui/navbar";
import PopUpOpener from "@/components/popup/popup";
import PopUpOpenerVideo from "@/components/popup/popupVideo";
import PopUpOpenerCdl from "@/components/popup/popupCld";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PIXELART",
  description: "MEDIA PERSONAL LIBRARY",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col ">
          <nav>
            <NavbarPage />
          </nav>
          {children}
          <PopUpOpenerCdl/>
          <PopUpOpener />
          <PopUpOpenerVideo />
        </main>

      </body>
    </html>
  );
}
