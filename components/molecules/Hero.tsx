import Image from "next/image"
import Image1 from"@/assests/drew-dizzy-graham-cTKGZJTMJQU-unsplash.jpg"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { spectral } from "@/app/fonts"
const Hero = () => {
    // const FADE_UP_ANIMATION_VARIANTS = {
    //     hidden: { opacity: 0, y: 10 },
    //     show: { opacity: 1, y: 0, transition: { type: "spring" } }, 
    //   }
  return (
    <section className="grid grid-cols-1  h-[75vh] w-full place-items-center bg-transparent mt-16"> 
      <div className="h-full w-full -z-10 absolute md:top-20 top-0">
      <Image src={Image1} layout="fill"
      objectFit="cover"        
    quality={100} loading="eager" placeholder="blur" alt="coverImage" className="brightness-50"></Image>
    </div>
    <div
    
    className="flex flex-col items-center justify-start">  
    <h1  className={`text-2xl md:text-4xl md:w-2/3 text-white px-2 md:px-8 text-center font-bold animate-fadeinup-1`+" "+(spectral.className)}>RENIVET<br /><span className="text-white">SEE THE DIFFERENCE : MAKE THE DIFFERENCE</span></h1>
    <p  className="text-brand-offwhite text-md px-2 md:px-8 py-4 text-center animate-fadeinup-2">We are revolutionizing the way you shop for Fashion & Accessories </p>
    <Link href='#subscribe'><Button className= "text-white hover:text-brand-offwhite animate-fadeinup-3"> Step up and Subscribe</Button></Link>
    </div> 
      </section>
  )
}

export default Hero