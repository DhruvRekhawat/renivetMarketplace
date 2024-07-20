"use client"
import Image from "next/image"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image1 from '@/assests/diego-ph-xW42e724p00-unsplash.jpg'
import Image2 from '@/assests/fujiphilm-Emls_8KNvN4-unsplash.jpg'
import Image3 from '@/assests/alex-muromtsev-3YvFGeUnKYw-unsplash.jpg'
import Image4 from '@/assests/jasmin-chew-JeKQiy307rA-unsplash.jpg'
import Image5 from '@/assests/karina.webp'
import Image6 from '@/assests/jakob-owens-uE_N2i6-TRM-unsplash.jpg'


type FilterType = 'color' | 'category';

interface Filters {
  color: string[];
  category: string[];
}


export default function Categories({params}:{params:{slug:string}}) {
  const slug = params.slug
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    color: [],
    category: [],
  })
  const handleFilterChange = (type: FilterType, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }));
  };

  const [sort, setSort] = useState("featured")
  const handleSort = (value:string) => {
    setSort(value)
  }
  const products = [
    {
      id: 1,
      name: "Acme Classic T-Shirt",
      description: "A timeless cotton t-shirt",
      price: 19.99,
      image: "/assests/diego-ph-xW42e724p00-unsplash.jpg",
      colors: ["black", "white", "gray"],
      category: ["tops", "tshirts"],
    },
    {
      id: 2,
      name: "Acme Skinny Jeans",
      description: "Slim-fit denim jeans",
      price: 49.99,
      image: "/Image2",
      colors: ["blue", "black", "gray"],
      category: ["bottoms", "jeans"],
    },
    {
      id: 3,
      name: "Acme Hoodie",
      description: "Soft and cozy pullover hoodie",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["black", "gray", "navy"],
      category: ["tops", "hoodies"],
    },
    {
      id: 4,
      name: "Acme Chino Shorts",
      description: "Lightweight and breathable shorts",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["khaki", "olive", "navy"],
      category: ["bottoms", "shorts"],
    },
    {
      id: 5,
      name: "Acme Leather Belt",
      description: "Durable and stylish leather belt",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["black", "brown", "tan"],
      category: ["accessories", "belts"],
    },
    {
      id: 6,
      name: "Acme Canvas Backpack",
      description: "Spacious and versatile backpack",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      colors: ["olive", "gray", "navy"],
      category: ["accessories", "bags"],
    },
  ]
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (
          selectedFilters.color.length > 0 &&
          !product.colors.some((color) => selectedFilters.color.includes(color))
        ) {
          return false
        }
        if (
          selectedFilters.category.length > 0 &&
          !selectedFilters.category.some((cat) => product.category.includes(cat))
        ) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        switch (sort) {
          case "featured":
            return b.id - a.id
          case "low":
            return a.price - b.price
          case "high":
            return b.price - a.price
          case "newest":
            return b.id - a.id
          default:
            return 0
        }
      })
  }, [selectedFilters, sort])

  function toCapitalCase(str:string):string{
    
    return "kdvj"
  }
  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-6 p-4 md:p-6 mt-40">
      <div className="flex flex-col gap-6">
        <div className="sticky top-4">
          <Input placeholder="Search products..." className="w-full" />
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="color">
            <AccordionTrigger className="text-base">Color</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {["black", "white", "gray", "blue", "khaki", "olive", "navy", "brown", "tan"].map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full cursor-pointer ${
                      selectedFilters.color.includes(color) ? "ring-2 ring-primary" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleFilterChange("color", color)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="category">
            <AccordionTrigger className="text-base">Category</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                {["tops", "tshirts", "hoodies", "bottoms", "jeans", "shorts", "accessories", "belts", "bags"].map(
                  (category) => (
                    <Label key={category} className="flex items-center gap-2 font-normal">
                      <Checkbox
                        checked={selectedFilters.category.includes(category)}
                        onCheckedChange={() => handleFilterChange("category", category)}
                      />
                      {category}
                    </Label>
                  ),
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl tracking-tight">{slug.replace("-"," ").toUpperCase()}</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products found</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto shrink-0">
                <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">Price: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high">Price: High to Low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative group bg-background rounded-lg shadow-lg flex flex-col">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View {product.name}</span>
              </Link>
              <Image
                src={Image3}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-t-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold tracking-tight text-sm">{product.name}</h3>
                  <small className="text-xs leading-none text-muted-foreground">{product.description}</small>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className={`w-6 h-6 rounded-full cursor-pointer ${
                          selectedFilters.color.includes(color) ? "ring-2 ring-primary" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleFilterChange("color", color)}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.category.map((category) => (
                      <span key={category} className="bg-muted px-2 py-1 rounded-md text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <h4 className="font-semibold text-sm">${product.price}</h4>
                  <Button size="sm" variant="outline" className="mt-2">
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArrowUpDownIcon(props:any) {
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
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
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