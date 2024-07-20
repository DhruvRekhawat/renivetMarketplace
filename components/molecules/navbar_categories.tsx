"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { WomenComponents,MenComponents,KidsComponents,AccessoriesComponents,HomeAndLivingComponents } from "@/components/molecules/categories"


export const WomenComponents: { title: string; href: string; }[] = 
[
  {
    title: "New Arrivals",
    href: "/categories/new-arrivals",
  },
  {
    title: "Blazers & Coats",
    href: "/categories/blazers-and-coats",
  },
  {
    title: "Co-ordinates",
    href: "/categories/co-ordinates",
  },
  {
    title: "Dresses",
    href: "/categories/dresses",
  },
  {
    title: "Dupattas",
    href: "/categories/dupattas",
  },
  {
    title: "Ethnic Wear",
    href: "/categories/ethnic-wear",
  },
  {
    title: "Sweatshirts & Hoodies",
    href: "/categories/sweatshirts-and-hoodies",
  },
  {
    title: "Jumpsuits",
    href: "/categories/jumpsuits",
  },
  {
    title: "Kaftaans",
    href: "/categories/kaftaans",
  },
  {
    title: "Pants & Trousers",
    href: "/categories/pants-and-trousers",
  },
  {
    title: "Sarees",
    href: "/categories/sarees",
  },
  {
    title: "Shirts",
    href: "/categories/shirts",
  },
  {
    title: "Shorts & Skirts",
    href: "/categories/shorts-and-skirts",
  },
  {
    title: "Shrugs",
    href: "/categories/shrugs",
  },
  {
    title: "Sports & Active Wear",
    href: "/categories/sports-and-active-wear",
  },
  {
    title: "Jackets",
    href: "/categories/jackets",
 },
  {
    title: "T-Shirts",
    href: "/categories/t-shirts",
  },
  {
    title: "Tops",
    href: "/categories/tops",
  },
  {
    title: "Swimwear",
    href: "/categories/swimwear",
  }
] 
export const MenComponents: { title: string; href: string; }[] = [
    {
      title: "Shirts",
      href: "/categories/shirts",
    },
    {
      title: "T-Shirts",
      href: "/categories/t-shirts",
    },
    {
      title: "Oversized T-Shirts",
      href: "/categories/oversized-t-shirts",
    },
    {
      title: "Jackets",
      href: "/categories/jackets",
    },
    {
      title: "Trousers",
      href: "/categories/trousers",
    },
    {
      title: "Hoodies",
      href: "/categories/hoodies",
    },
    {
      title: "Blazers & Coats",
      href: "/categories/blazers-and-coats",
    },
    {
      title: "Shorts",
      href: "/categories/shorts",
    },
    {
      title: "Co-ords",
      href: "/categories/co-ords",
    },
    {
      title: "Kurtas",
      href: "/categories/kurtas",
    },
    {
      title: "Sports & Active Wear",
      href: "/categories/sports-and-active-wear",
    }
  ]
  export const KidsComponents: { title: string; href: string; }[] = [
    {
      title: "Twinning Sets",
      href: "/categories/twinning-sets",
    },
    {
      title: "Girls Clothing",
      href: "/categories/girls-clothing",
    },
    {
      title: "Boys Clothing",
      href: "/categories/boys-clothing",
    },
    {
      title: "Infants",
      href: "/categories/infants",
    },
    {
      title: "Caps",
      href: "/categories/caps",
    },
    {
      title: "Sleeping Suits/Bags",
      href: "/categories/sleeping-suits-bags",
    },
    {
      title: "Booties/Socks",
      href: "/categories/booties-socks",
    },
    {
      title: "Gift Hampers",
      href: "/categories/gift-hampers",
    }
  ]
  export const AccessoriesComponents: { title: string; href: string; }[] = [
    {
      title: "New Arrivals",
      href: "/categories/new-arrivals",
    },
    {
      title: "Bags",
      href: "/categories/bags",
    },
    {
      title: "Tote Bags",
      href: "/categories/tote-bags",
    },
    {
      title: "Sling Bags",
      href: "/categories/sling-bags",
    },
    {
      title: "Handbags",
      href: "/categories/handbags",
    },
    {
      title: "Laptop Sleeves",
      href: "/categories/laptop-sleeves",
    },
    {
      title: "Clutches",
      href: "/categories/clutches",
    },
    {
      title: "Wallets",
      href: "/categories/wallets",
    }
  ]
  export const HomeAndLivingComponents: { title: string; href: string; }[] = [
    {
      title: "Home Décor",
      href: "/categories/home-decor",
    },
    {
      title: "Blankets & Bedsheets",
      href: "/categories/blankets-and-bedsheets",
    },
    {
      title: "Cushions & Pillows",
      href: "/categories/cushions-and-pillows",
    },
    {
      title: "Floor Mats And Dhurries",
      href: "/categories/floor-mats-and-dhurries",
    },
    {
      title: "Office & Stationery",
      href: "/categories/office-and-stationery",
    },
    {
      title: "Pooja Essentials",
      href: "/categories/pooja-essentials",
    },
    {
      title: "Storage & Organisers",
      href: "/categories/storage-and-organisers",
    },
    {
      title: "Travel Essentials",
      href: "/categories/travel-essentials",
    }
  ]

  export const ShopAllComponents: { title: string; href: string; }[] = [
    {
      title: "Save Sustainably",
      href: "/categories/save-sustainably",
    },
    {
      title: "New Arrivals",
      href: "/categories/new-arrivals",
    },
    {
      title: "Shop by Craft",
      href: "/categories/shop-by-craft",
    },
    {
      title: "Shop by Material",
      href: "/categories/shop-by-material",
    },
    {
      title: "Shop by Collection",
      href: "/categories/shop-by-collection",
    },
    {
      title: "Shop By Brand",
      href: "/categories/shop-by-brand",
    }
  ]



 

export function CategoriesNavbar() {

  return (
    <NavigationMenu className="">
      <NavigationMenuList className="py-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-brand-offwhite" >Shop All</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >

                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-brand-offwhite">Women</NavigationMenuTrigger>
          <NavigationMenuContent className="mx-4">
            <ScrollArea className="h-[20rem] w-[50vw]">
            <ul className="grid gap-3 p-4 w-[50vw] md:grid-cols-2">
              {WomenComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                </ListItem>
              ))}
            </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-brand-offwhite">Men</NavigationMenuTrigger>
          <NavigationMenuContent className="mx-4">
            <ScrollArea className="h-[20rem] w-[50vw]">
            <ul className="grid gap-3 p-4 w-[50vw] md:grid-cols-2">
              {MenComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                </ListItem>
              ))}
            </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-brand-offwhite">Kids</NavigationMenuTrigger>
          <NavigationMenuContent className="mx-4">
            <ScrollArea className="h-64 w-[50vw]">
            <ul className="grid gap-3 p-4 w-[50vw] md:grid-cols-2">
              {KidsComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                </ListItem>
              ))}
            </ul>
            </ScrollArea>
          </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-brand-offwhite">Accessories</NavigationMenuTrigger>
          <NavigationMenuContent className="mx-4">
            <ScrollArea className="h-64 w-[50vw]">
            <ul className="grid gap-3 p-4 w-[50vw] md:grid-cols-2">
              {AccessoriesComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                </ListItem>
              ))}
            </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-brand-offwhite">Home and Living</NavigationMenuTrigger>
          <NavigationMenuContent className="mx-4">
            <ScrollArea className="h-64 w-[50vw]">
            <ul className="grid gap-3 p-4 w-[50vw] md:grid-cols-2">
              {HomeAndLivingComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                </ListItem>
              ))}
            </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>



        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className="bg-brand-offwhite">
              <p className="text-red-600 font-semibold">Sale</p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
