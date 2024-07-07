import Navbar from "@/components/molecules/navbar"
import  X  from "@/assests/icons/twitter.png"
import  FB  from "@/assests/icons/facebook.png"
import  IG  from "@/assests/icons/instagram.png"
import Image from "next/image"
export default function UnprotectedLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Navbar></Navbar>
   
        {children}
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
      </section>
    )
  }