import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Navbar from "@/components/molecules/navbar";
import Head from "next/head";
import Image from "next/image";
import FB from "@/assests/icons/facebook.png"
import IG from "@/assests/icons/instagram.png"
import X from  "@/assests/icons/twitter.png"

const merriweather = Merriweather({subsets:["latin"],weight:['300','400','700']})
export const metadata: Metadata = {
  title: "Renivet",
  description: "Renivet - A innovative marketplace for sustainable brands",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.jpg" type="image/x-icon" />
      </Head>
      <body className={merriweather.className}>

      {children}

        <SpeedInsights></SpeedInsights>
      </body>
    </html>
  );
}
