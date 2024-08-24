import { Button } from "@/components/ui/button";
import BlogCarousel from "@/components/molecules/blogCarousel";
import Link from "next/link";
import Hero from "@/components/molecules/Hero";
import HowitWorks from "@/components/molecules/HowitWorks";
import JointheCommunity from "@/components/molecules/JointheCommunity";
import Navbar from "@/components/molecules/navbar";
import  X  from "@/assests/icons/twitter.png"
import  FB  from "@/assests/icons/facebook.png"
import  IG  from "@/assests/icons/instagram.png"
import Image from "next/image"
import RegisterationForm from "@/components/molecules/forms/registrationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { spectral } from "./fonts";
import ShopByCategories from "@/components/molecules/shopByCategories";
import { SessionProvider } from "next-auth/react"

export default function Home() {

  
  return (
    <>
    <Navbar></Navbar>
    <main className="flex flex-col items-center justify-center">
       <Hero></Hero> 
      

        <ShopByCategories></ShopByCategories>
        <HowitWorks></HowitWorks>
        <section className="flex flex-col space-y-4 w-full md:p-8 p-2 bg-brand-offwhite">
          <h1 className={`text-start text-4xl  mt-16` + " "+(spectral.className)}>Latest Stories</h1>
          <h3><Link href="/blogs"><u>View all</u></Link></h3>
          <BlogCarousel></BlogCarousel>
        </section>
        <JointheCommunity></JointheCommunity>
        <section className=" bg-brand-offwhite py-8" id="becomeapartner" >
          <h1 className={`text-4xl  text-center my-2`+ " "+ spectral.className}>Become a Partner</h1>
          <p className="text-center mx-auto my-2 md:w-2/3 p-2">Do you have a product that is Conscious, Ethical and Natural? Do you want to know your impact of the product? Is it Plastic-free? Do you work with artisans to revive their craft and livelihood?

           Join Us, We&apos;re looking for you!</p>
          <div className="w-full flex flex-wrap justify-center gap-6 items-center mb-16">

            <Dialog>
  <DialogTrigger><Button size={"lg"} className="bg-brand-brown">Apply Here</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-brand-brown text-xl">Be a part of the change!</DialogTitle>
      <DialogDescription className="text-brand-brown/75 text-sm">Register below with your email and password!</DialogDescription>
    </DialogHeader>
    <RegisterationForm></RegisterationForm>

  </DialogContent>
</Dialog>
          </div>
        </section>
        {/* <section className=" bg-brand-offwhite py-8" id="contact" >
          <h1 className="text-4xl  text-center my-2">Contact Us</h1>
          <p className="text-center mx-auto my-2 md:w-2/3 p-2">Whether you&apos;re a conscious consumer with questions about our products or a brand interested in collaborating on sustainable fashion, we&apos;d love to connect. Your feedback, ideas, and inquiries are invaluable to us, and we&apos;re committed to fostering meaningful relationships. Contact us today and let&apos;s start a conversation. Together, we can create a more sustainable future for fashion.</p>
          <div className="w-full flex flex-wrap justify-center gap-6 items-center mb-16">
            <Button>Concious Consumer</Button>
            <Button>Brand Collaboration</Button>
          </div>
        </section> */}
        
    </main>
    <footer className="bg-brand-darkgreen w-full px-8 py-4 flex flex-col md:flex-row justify-center items-center text-white">
          <div className="grid grid-cols-2 md:grid-cols-3 md:gap-24 gap-6 w-full md:w-2/3 justify-center">
            <ul className="text-brand-offwhite">
              <h1 className="text-lg text-brand-orangewhite">Important Links</h1>
              <li>About</li>
              <li>How it Works</li>
              <li>Subscribe</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
            <ul className="text-brand-offwhite">
              <h1 className="text-lg text-brand-orangewhite">Follow Us On:</h1>
              <div className="flex gap-4 justify-start items-center my-2">
              <li><Image src={FB} height={25} alt="social" ></Image></li>
              <li><Image src={IG} height={25} alt="social"></Image></li>
              <li><Image src={X} height={25} alt="social"></Image></li>
              </div>
                           
            </ul>
            <ul className="text-brand-offwhite">
              <h1 className="text-lg text-brand-orangewhite">Contact Us</h1>
              
              <li>Email: services@renivet.com</li>
              
            </ul>
            
            <p className="md:col-span-3 col-span-2 text-brand-offwhite">&copy; Renivet Solutions Pvt. Ltd.</p>
          </div>
        </footer>
    
    </>
  );
}

