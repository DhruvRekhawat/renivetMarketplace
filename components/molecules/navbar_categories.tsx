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
    href: "/shop-by-products/new-arrivals",
  },
  {
    title: "Blazers & Coats",
    href: "/shop-by-products/blazers-and-coats",
  },
  {
    title: "Co-ordinates",
    href: "/shop-by-products/co-ordinates",
  },
  {
    title: "Dresses",
    href: "/shop-by-products/dresses",
  },
  {
    title: "Dupattas",
    href: "/shop-by-products/dupattas",
  },
  {
    title: "Ethnic Wear",
    href: "/shop-by-products/ethnic-wear",
  },
  {
    title: "Sweatshirts & Hoodies",
    href: "/shop-by-products/sweatshirts-and-hoodies",
  },
  {
    title: "Jumpsuits",
    href: "/shop-by-products/jumpsuits",
  },
  {
    title: "Kaftaans",
    href: "/shop-by-products/kaftaans",
  },
  {
    title: "Pants & Trousers",
    href: "/shop-by-products/pants-and-trousers",
  },
  {
    title: "Sarees",
    href: "/shop-by-products/sarees",
  },
  {
    title: "Shirts",
    href: "/shop-by-products/shirts",
  },
  {
    title: "Shorts & Skirts",
    href: "/shop-by-products/shorts-and-skirts",
  },
  {
    title: "Shrugs",
    href: "/shop-by-products/shrugs",
  },
  {
    title: "Sports & Active Wear",
    href: "/shop-by-products/sports-and-active-wear",
  },
  {
    title: "Jackets",
    href: "/shop-by-products/jackets",
 },
  {
    title: "T-Shirts",
    href: "/shop-by-products/t-shirts",
  },
  {
    title: "Tops",
    href: "/shop-by-products/tops",
  },
  {
    title: "Swimwear",
    href: "/shop-by-products/swimwear",
  }
] 
export const MenComponents: { title: string; href: string; }[] = [
    {
      title: "Shirts",
      href: "/shop-by-products/shirts",
    },
    {
      title: "T-Shirts",
      href: "/shop-by-products/t-shirts",
    },
    {
      title: "Oversized T-Shirts",
      href: "/shop-by-products/oversized-t-shirts",
    },
    {
      title: "Jackets",
      href: "/shop-by-products/jackets",
    },
    {
      title: "Trousers",
      href: "/shop-by-products/trousers",
    },
    {
      title: "Hoodies",
      href: "/shop-by-products/hoodies",
    },
    {
      title: "Blazers & Coats",
      href: "/shop-by-products/blazers-and-coats",
    },
    {
      title: "Shorts",
      href: "/shop-by-products/shorts",
    },
    {
      title: "Co-ords",
      href: "/shop-by-products/co-ords",
    },
    {
      title: "Kurtas",
      href: "/shop-by-products/kurtas",
    },
    {
      title: "Sports & Active Wear",
      href: "/shop-by-products/sports-and-active-wear",
    }
  ]
  export const KidsComponents: { title: string; href: string; }[] = [
    {
      title: "Twinning Sets",
      href: "/shop-by-products/twinning-sets",
    },
    {
      title: "Girls Clothing",
      href: "/shop-by-products/girls-clothing",
    },
    {
      title: "Boys Clothing",
      href: "/shop-by-products/boys-clothing",
    },
    {
      title: "Infants",
      href: "/shop-by-products/infants",
    },
    {
      title: "Caps",
      href: "/shop-by-products/caps",
    },
    {
      title: "Sleeping Suits/Bags",
      href: "/shop-by-products/sleeping-suits-bags",
    },
    {
      title: "Booties/Socks",
      href: "/shop-by-products/booties-socks",
    },
    {
      title: "Gift Hampers",
      href: "/shop-by-products/gift-hampers",
    }
  ]
  export const AccessoriesComponents: { title: string; href: string; }[] = [
    {
      title: "New Arrivals",
      href: "/shop-by-products/new-arrivals",
    },
    {
      title: "Bags",
      href: "/shop-by-products/bags",
    },
    {
      title: "Tote Bags",
      href: "/shop-by-products/tote-bags",
    },
    {
      title: "Sling Bags",
      href: "/shop-by-products/sling-bags",
    },
    {
      title: "Handbags",
      href: "/shop-by-products/handbags",
    },
    {
      title: "Laptop Sleeves",
      href: "/shop-by-products/laptop-sleeves",
    },
    {
      title: "Clutches",
      href: "/shop-by-products/clutches",
    },
    {
      title: "Wallets",
      href: "/shop-by-products/wallets",
    }
  ]
  export const HomeAndLivingComponents: { title: string; href: string; }[] = [
    {
      title: "Home Décor",
      href: "/shop-by-products/home-decor",
    },
    {
      title: "Blankets & Bedsheets",
      href: "/shop-by-products/blankets-and-bedsheets",
    },
    {
      title: "Cushions & Pillows",
      href: "/shop-by-products/cushions-and-pillows",
    },
    {
      title: "Floor Mats And Dhurries",
      href: "/shop-by-products/floor-mats-and-dhurries",
    },
    {
      title: "Office & Stationery",
      href: "/shop-by-products/office-and-stationery",
    },
    {
      title: "Pooja Essentials",
      href: "/shop-by-products/pooja-essentials",
    },
    {
      title: "Storage & Organisers",
      href: "/shop-by-products/storage-and-organisers",
    },
    {
      title: "Travel Essentials",
      href: "/shop-by-products/travel-essentials",
    }
  ]

  export const ShopAllComponents: { title: string; href: string; }[] = [
    {
      title: "Save Sustainably",
      href: "/shop-by-products/save-sustainably",
    },
    {
      title: "New Arrivals",
      href: "/shop-by-products/new-arrivals",
    },
    {
      title: "Shop by Craft",
      href: "/shop-by-products/shop-by-craft",
    },
    {
      title: "Shop by Material",
      href: "/shop-by-products/shop-by-material",
    },
    {
      title: "Shop by Collection",
      href: "/shop-by-products/shop-by-collection",
    },
    {
      title: "Shop By Brand",
      href: "/shop-by-products/shop-by-brand",
    }
  ]



 

export function CategoriesNavbar() {

  return (
    <NavigationMenu className="">
      <NavigationMenuList className="py-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop All</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Women</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Men</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Kids</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Home and Living</NavigationMenuTrigger>
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
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
