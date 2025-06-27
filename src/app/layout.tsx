import type { Metadata } from "next";
import { Kumbh_Sans, Nunito_Sans } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/Providers/TanstackProvider";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Catholic Archdioceses of Owerri",
  description: "...Handling Data effectively",
};

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${kumbhSans.variable} text-cblack ${nunitoSans.className} antialiased`}>
          <TanstackProvider>
            {children}
          </TanstackProvider>
      </body>
    </html>
  );
}
