import type { Metadata } from "next";
import { Merriweather,Karla,Spectral,Lora } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Navbar from "@/components/molecules/navbar";
import Head from "next/head";
import Image from "next/image";
import FB from "@/assests/icons/facebook.png"
import IG from "@/assests/icons/instagram.png"
import X from  "@/assests/icons/twitter.png"
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/molecules/SessionWrapper"

const merriweather = Merriweather({subsets:["latin"],weight:['300','400','700']})
const karla = Karla({subsets:["latin"]})
const spectral = Spectral({subsets:["latin"],weight:['600']})
export const metadata: Metadata = {
  title: "Renivet",
  description: "Renivet - An Innovative Marketplace for Sustainable Brands",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.jpg" type="image/x-icon" />
      </Head>
      <body className={karla.className}>

      {children}

        <SpeedInsights></SpeedInsights>
        <Toaster richColors position="top-center"></Toaster>
      </body>
    </html>
    </SessionWrapper>
  );
}
