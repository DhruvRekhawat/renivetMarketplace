import Image from "next/image"
import CategoryImage1 from '@/assests/whitewalk.jpg'
import CategoryImage2 from '@/assests/zahir-namane-TjUJJACTav4-unsplash.jpg'
import CategoryImage3 from '@/assests/vanessa-serpas-e6lWMBIgNso-unsplash.jpg'
import CategoryImage4 from '@/assests/marissa-grootes-D4jRahaUaIc-unsplash.jpg'
import Link from "next/link"
import { spectral } from "@/app/fonts";

const ShopByCategories = () => {
  return (
    <section className="flex flex-col space-y-4 w-full md:p-16 p-2 bg-brand-offwhite gap-6">
        <h2 className={"text-4xl  my-6" + " " + spectral.className}>Shop By Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 h-80 mt-4">
        <Link href="/categories/dress">
        <div className=" flex flex-col justify-center items-center gap-2 h-72 ">
        <Image src={CategoryImage1} alt="dress"></Image>
        <p className=" underline leading-4  ">Dress</p>
        </div>
        </Link>
        <Link href="/categories/shirts">
        <div className=" flex flex-col justify-center items-center gap-2 h-72 ">
        <Image src={CategoryImage2} alt="dress"></Image>
        <p className=" underline leading-4  ">Men&apos;s Shirts</p>
        </div>
        </Link>
        <Link href="/categories/infants">

        <div className=" flex flex-col justify-center items-center gap-2 h-72 ">
        <Image src={CategoryImage3} alt="dress"></Image>
        <p className=" underline leading-4"> Kids </p>
        </div>
        </Link>
        <Link href="/categories/bags">

        <div className=" flex flex-col justify-center items-center gap-2 h-72 ">
        <Image src={CategoryImage4} alt="dress" ></Image>
        <p className=" underline leading-4  ">Accessories</p>
        </div>
        </Link>
        </div>

    </section>
  )
}

export default ShopByCategories