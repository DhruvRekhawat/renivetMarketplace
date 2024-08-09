"use client"
import Image from "next/image"
import Logo from '@/assests/PrimaryName-Logo.svg'
import { Heart, X,Menu,ShoppingCart,Search,User2,ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

import { CategoriesNavbar } from "./navbar_categories"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Subscribe from "./forms/subscribeform"
import Login from "./forms/userAuthLoginForm"



const Navbar = () => {
  const [isOpen,setIsOpen] = useState(false)
  return (
    <nav className="fixed w-full z-50 shadow-lg top-0 bg-brand-offwhite">
    <div className="bg-black text-white text-sm flex h-8 justify-center items-center w-full p-2">We Are Coming Soon <Heart className="text-white h-4"></Heart></div>
    <div  className=" grid h-14 w-full grid-cols-3 px-4 md:px-16 bg-brand-offwhite place-items-center">
      
        
        <ul className="gap-4 text-md font-bold hover:cursor-pointer justify-self-start hidden md:flex text-sm  " >
            <Link href='#howitworks' className = "hover:-translate-y-0.5 transition-all"><li>How it Works </li></Link>
            <Link href='#subscribe' className = "hover:-translate-y-0.5 transition-all"><li>Subscribe</li></Link>
            <Link href='#contact' className = "hover:-translate-y-0.5 transition-all"><li>Contact</li></Link>
        </ul>
        <Link href="/"><Image src={Logo} alt="logo" height={20} className=""></Image></Link>
        <ul className="gap-8 text-md font-bold hover:cursor-pointer justify-self-end hidden md:flex text-sm " >
            <Link href='#howitworks' className = "hover:-translate-y-0.5 transition-all hover:bg-zinc-100 p-1 rounded-md"><Search className=""></Search></Link>
            <HoverCard>
              <HoverCardTrigger><User2></User2></HoverCardTrigger>
              <HoverCardContent className="w-96">
                <p className="text-lg text-brand-brown my-4"> Login To My Account </p>
                <Login></Login>
              </HoverCardContent>
            </HoverCard>
            <Link href='#subscribe' className = "hover:-translate-y-0.5 transition-all hover:bg-zinc-100 p-1 rounded-md "><ShoppingCart></ShoppingCart></Link>
        </ul>
        <div className="absolute top-10 right-0 md:hidden">
        {isOpen?
        <div><Button size="icon" onClick={()=>setIsOpen(false)} className="absolute right-2 bg-brand-darkgreen">
          <X></X>
        </Button>
        <Card className="absolute z-40 top-12 h-screen right-0 w-screen m-0 animate-navbar">
          <CardContent className="flex flex-col w-full justify-start items-start text-xl list-none gap-6 py-8 h-full">
            <h1 className="text-sm text-zinc-600">Shop By Categories</h1>
            <Link href='#contact' className = "hover:-translate-y-0.5 transition-all w-full"    onClick={()=>setIsOpen(false)}><li className="flex justify-between w-full">Women<ArrowRight className="text-black"></ArrowRight> </li></Link>
            <Link href='#contact' className = "hover:-translate-y-0.5 transition-all w-full"    onClick={()=>setIsOpen(false)}><li className="flex justify-between w-full">Men<ArrowRight className="text-black"></ArrowRight> </li></Link>
            <Link href='#contact' className = "hover:-translate-y-0.5 transition-all w-full"    onClick={()=>setIsOpen(false)}><li className="flex justify-between w-full">Kids<ArrowRight className="text-black"></ArrowRight> </li></Link>
            <Link href='#contact' className = "hover:-translate-y-0.5 transition-all w-full"    onClick={()=>setIsOpen(false)}><li className="flex justify-between w-full">Accessories<ArrowRight className="text-black"></ArrowRight> </li></Link>
            <Link href='#contact' className = "hover:-translate-y-0.5 transition-all w-full"    onClick={()=>setIsOpen(false)}><li className="flex justify-between w-full">Home and Living<ArrowRight className="text-black"></ArrowRight> </li></Link>

            <Link href='#howitworks' className = "hover:-translate-y-0.5 transition-all" onClick={()=>setIsOpen(false)}><li>How it Works</li></Link>
            <Link href='#subscribe' className = "hover:-translate-y-0.5 transition-all"  onClick={()=>setIsOpen(false)}><li>Subscribe</li></Link>
            <Link href='#contact' className = "hover:-translate-y-0.5 transition-all"    onClick={()=>setIsOpen(false)}><li>Contact</li></Link>

            </CardContent>
      </Card>
      </div>:
        <div className="">
        <Button size="icon" onClick={()=>setIsOpen(true)} className="absolute right-2 bg-brand-darkgreen">
          <Menu></Menu>
        </Button>
        
        </div>
        }
        </div>

    </div>
     <div className="w-screen fixed bg-brand-offwhite md:flex justify-center hidden shadow-md">   
       {/* <CategoriesNavbar></CategoriesNavbar> */}
   </div>

    </nav>
  )
}

export default Navbar