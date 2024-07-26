import Image from "next/image"
import CategoryImage1 from '@/assests/whitewalk.jpg'
import CategoryImage2 from '@/assests/zahir-namane-TjUJJACTav4-unsplash.jpg'
import CategoryImage3 from '@/assests/vanessa-serpas-e6lWMBIgNso-unsplash.jpg'
import CategoryImage4 from '@/assests/marissa-grootes-D4jRahaUaIc-unsplash.jpg'
import CategoryImage5 from '@/assests/hutomo-abrianto-nPdsMgvL9QM-unsplash.jpg'
import Link from "next/link"
import { spectral } from "@/app/layout";

const ShopByCategories = () => {
  return (
    <section className="flex flex-col space-y-4 w-full md:p-8 p-2 bg-brand-offwhite">
        <h2 className={"text-4xl  my-6" + " " + spectral.className}>Shop By Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 h-80">
        <Link href="/categories/dresses">
        <div className=" flex flex-col justify-center items-center gap-2 h-72 ">
        <Image src={CategoryImage1} alt="dress"></Image>
        <p className=" underline leading-4  ">Dress</p>
        </div>
        </Link>
        <Link href="/categories/t-shirts">
        <div className=" flex flex-col justify-center items-center gap-2 h-72 ">
        <Image src={CategoryImage2} alt="dress"></Image>
        <p className=" underline leading-4  ">Men's Shirts</p>
        </div>
        </Link>
        <Link href="/categories/twinning-set">

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
        <Link href="/categories/home-decor">

        <div className=" flex flex-col justify-center items-center gap-2 h-72">
        <Image src={CategoryImage5} alt="dress"></Image>
        <p className=" underline leading-4  ">Home Decor</p>
        </div>
        </Link>

        </div>

    </section>
  )
}

export default ShopByCategories