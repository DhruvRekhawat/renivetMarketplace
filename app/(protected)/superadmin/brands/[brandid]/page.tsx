import { Card, CardContent } from "@/components/ui/card"
import prisma from "@/lib/db"
import Logo from '@/assests/icons/R-PrimaryIcon.svg'
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Facebook, Globe, Instagram, Mail, Phone, TwitterIcon, User } from "lucide-react"

const BrandDetailsPage = async({params}:{params:{brandid:string}}) => {
  
    const brandid = params.brandid

        const brandDetails = await prisma.brand.findUnique({
            where: {
              id: parseInt(brandid),
            },
          })






    return (
    <main className="flex flex-col justify-start items-start p-4 px-8 w-full">
        <div className="flex gap-4 justify-center items-center ">
        <Image src={Logo} alt="logo" height={40} ></Image>
        <div>
        <h1 className="text-4xl font-bold">{brandDetails?.brandName}</h1><p className="text-zinc-500 text-sm">Brand ID:&nbsp; {brandDetails?.id}</p>

        </div>
        </div>
        <div>

            {/* Contact Details */}
            <Card className="p-4 m-4 ">
                <h2>Contact Details</h2> 
                <Separator></Separator>
                <div className="flex gap-2">
                <CardContent className="p-4 flex flex-col justify-start items-start gap-4">
                <p className="flex justify-center items-center gap-2"><User className="h-5"></User>{brandDetails?.contactName}</p>
                <p className="flex justify-center items-center gap-2"><Mail className="h-5"></Mail>{brandDetails?.email}</p>
                <p className="flex justify-center items-center gap-2"><Phone className="h-5"></Phone>{brandDetails?.phoneNumber}</p>
                <p className="flex justify-center items-center gap-2"><Globe className="h-5"></Globe>{brandDetails?.websiteUrl}</p>
                </CardContent>
                <CardContent className="p-4 flex flex-col justify-start items-start gap-4">
                <p className="flex justify-center items-center gap-2"><Facebook className="h-5"></Facebook>{brandDetails?.socialMedia_facebook}</p>
                <p className="flex justify-center items-center gap-2"><Instagram className="h-5"></Instagram>{brandDetails?.socialMedia_instagram}</p>
                <p className="flex justify-center items-center gap-2"><TwitterIcon className="h-5"></TwitterIcon>{brandDetails?.socialMedia_twitter}</p>
                </CardContent>
                </div>
                 
            </Card>

            <Card className="p-4 m-4 ">
                Brand Details
                <Separator></Separator>
                <CardContent className="p-4 flex flex-col justify-start items-start gap-4">
                    <p>Brand Story:</p>
                    <p>{brandDetails?.brandStory}</p>
                    <p></p>
                </CardContent>
            </Card>
        </div>
    </main>
  )
}

export default BrandDetailsPage