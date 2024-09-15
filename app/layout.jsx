import { Inter } from "next/font/google";
import "./globals.css";
import NavbarPage from "@/components/ui/navbar";
import PopUpOpener from "@/components/popup/popup";
import PopUpOpenerVideo from "@/components/popup/popupVideo";
import PopUpOpenerCdl from "@/components/popup/popupCld";
import BottonBar from "@/components/ui/bottonBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PIXELART",
  description: "MEDIA PERSONAL LIBRARY",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="sticky top-0 w-full z-10">
          <NavbarPage />
        </nav>
        <div className="fixed bottom-0 w-full z-20 ">
          <BottonBar />
        </div>
        <main className="flex flex-col ">

          {children}
          <div className="max-lg:hidden z-20">
            <PopUpOpenerCdl />
            <PopUpOpener />
            <PopUpOpenerVideo />
          </div>

        </main>
        

      </body>
    </html>
  );
}
