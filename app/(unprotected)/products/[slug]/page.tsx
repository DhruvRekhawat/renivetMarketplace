import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import Image1 from '@/assests/jakob-owens-uE_N2i6-TRM-unsplash.jpg'
import Image2 from '@/assests/joeyy-lee-qOhSUmbbymw-unsplash.jpg'
import Image3 from '@/assests/yellowapple.jpg'
export default function ProductPage({params}:{params:{slug:string}}) {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 mt-40">
      <div className="grid gap-4 ">
        <Carousel className="w-full rounded-lg overflow-hidden">
          <CarouselContent>
            <CarouselItem>
              <Image
                src={Image1}
                alt="Product Image 1"
                width={800}
                height={800}
                className="aspect-square object-cover"
              ></Image>
            </CarouselItem>
            <CarouselItem>
              <Image
                src={Image2}
                alt="Product Image 2"
                width={800}
                height={800}
                className="aspect-square object-cover"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={Image3}
                alt="Product Image 3"
                width={800}
                height={800}
                className="aspect-square object-cover"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="grid grid-cols-5 gap-3 items-start sm:hidden md:flex">
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <Image
              src={Image1}
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 1</span>
          </button>
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <Image
              src={Image2}
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 2</span>
          </button>
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <Image
              src={Image3}
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 3</span>
          </button>
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <Image
              src={Image1}
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 4</span>
          </button>
          <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
            <Image
              src="/placeholder.svg"
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 5</span>
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-2">
          <h1 className="font-bold text-3xl lg:text-4xl">Acme Prism T-Shirt</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <div className="text-muted-foreground">(12 reviews)</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">₹3,499</div>
            <div className="text-sm text-muted-foreground line-through">₹4,199</div>
            <div className="bg-primary px-2 py-1 rounded-md text-primary-foreground text-sm font-medium">20% off</div>
          </div>
        </div>
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label htmlFor="color" className="text-base">
              Color
            </Label>
            <RadioGroup id="color" defaultValue="black" className="flex items-center gap-2">
              <Label
                htmlFor="color-black"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="color-black" value="black" />
                Black
              </Label>
              <Label
                htmlFor="color-white"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="color-white" value="white" />
                White
              </Label>
              <Label
                htmlFor="color-blue"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="color-blue" value="blue" />
                Blue
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="size" className="text-base">
              Size
            </Label>
            <RadioGroup id="size" defaultValue="m" className="flex items-center gap-2">
              <Label
                htmlFor="size-xs"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="size-xs" value="xs" />
                XS
              </Label>
              <Label
                htmlFor="size-s"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="size-s" value="s" />
                S
              </Label>
              <Label
                htmlFor="size-m"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="size-m" value="m" />
                M
              </Label>
              <Label
                htmlFor="size-l"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="size-l" value="l" />
                L
              </Label>
              <Label
                htmlFor="size-xl"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="size-xl" value="xl" />
                XL
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-base">
              Quantity
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg">Add to cart</Button>
            <Button size="lg" variant="outline">
              <HeartIcon className="w-4 h-4 mr-2" />
              Add to wishlist
            </Button>
          </div>
        </form>
        <Separator />
        <div className="grid gap-4 text-sm leading-loose">
          <h2 className="font-bold text-xl">Product Details</h2>
          <p>
            Introducing the Acme Prism T-Shirt, a perfect blend of style and comfort for the modern individual. This tee
            is crafted with a meticulous composition of 60% combed ringspun cotton and 40% polyester jersey, ensuring a
            soft and breathable fabric that feels gentle against the skin.
          </p>
          <p>
            The design of the Acme Prism T-Shirt is as striking as it is comfortable. The shirt features a unique
            prism-inspired pattern that adds a modern and eye-catching touch to your ensemble.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-lg">Key Features</h3>
              <ul className="list-disc pl-4">
                <li>60% combed ringspun cotton, 40% polyester jersey</li>
                <li>Prism-inspired pattern design</li>
                <li>Soft and breathable fabric</li>
                <li>Machine washable</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg">Care Instructions</h3>
              <ul className="list-disc pl-4">
                <li>Machine wash cold, gentle cycle</li>
                <li>Tumble dry low</li>
                <li>Do not bleach</li>
                <li>Iron on low heat if needed</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid gap-4 text-sm leading-loose">
          <h2 className="font-bold text-xl">Reviews</h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p>
                  I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been
                  a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some
                  healthier options.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-medium">Alex Smith</div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <p>
                  I recently purchased the SparkleShine Home Cleaning Robot, and it has been a game-changer in my life.
                  I used to spend hours every weekend cleaning my house, but now I can simply turn on this little robot
                  and let it do the work. It's incredibly efficient, navigating around obstacles with ease. The only
                  reason I didn't give it a perfect 5-star rating is that it occasionally gets stuck under low
                  furniture. Overall, it's been a great addition to my home, saving me time and effort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeartIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function StarIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand-brown"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}