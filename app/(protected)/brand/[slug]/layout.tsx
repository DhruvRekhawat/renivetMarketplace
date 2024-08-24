"use client"

import Image from "next/image"
import Logo from '@/app/icon.png'
import Link from "next/link"
import {
  File,
  Gift,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  Pen,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  Video,
  Store,
} from "lucide-react"

 import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useParams } from "next/navigation"
import prisma from "@/lib/db"
import { usePathname } from 'next/navigation'
import {useSession,signOut} from 'next-auth/react'
import { useEffect, useState } from "react"


interface Brand {
  id?: number;
  brandName?: string;
  contactName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  websiteUrl?: string | null;
  businessType?: "Sole_Proprietorship" | "Partnership" | "Corporation" | "LLC" | string;
  businessRegistrationNumber?: string;
  countryOfRegistration?: string;
  gstNumber?: string;
  productDescription?: string;
  categories?: string[];
  materials?: string;
  sustainabilityCertifications?: string[];
  unSdgs?: string[];
  brandStory?: string;
  socialMedia_facebook?: string | null;
  socialMedia_instagram?: string | null;
  socialMedia_twitter?: string | null;
  totalProductionPerYear?: number;
  numberOfSuppliers?: number;
  supplyChainDescription?: string;
  manufacturingProcesses?: string;
  electricityConsumption?: number;
  waterConsumption?: number;
  wastePercentage?: number;
  recycledPercentage?: number;
  packagingMaterials?: string;
  brandLogo?: string;
  certifications?: string;
  productCatalog?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED" | string;
}


function BrandLayout(
  {
    children, 
  }: {
    children: React.ReactNode
  },

) 
{
    const params = useParams<{ slug:string }>()
    const slug = params.slug
    const path = usePathname();
    const { data: session, status } = useSession()
    const [brandData, setBrandData] = useState<Brand>();
    const [error, setError] = useState(null);
    const [isDisabled,setIsDisabled] = useState(false)

    useEffect(() => {
      async function getBrandStatus(email: string) {
        try {
          const response = await fetch(`/brand/${session?.user?.name}/api/getBrand`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch brand status");
          }
  
          const data = await response.json();
          setBrandData(data); // Store the fetched data in state
        } catch (error:any) {
          console.error("Error fetching brand status:", error);
          setError(error.message); // Store the error in state
        }
      }
  
      if (session?.user?.email) {
        getBrandStatus(session.user.email);
         if(brandData?.status === "DRAFT" || brandData?.status === "PENDING"){
          setIsDisabled(true)
         }
      }
    }, [session?.user?.email]);
  
    
    
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
              
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">

          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Image src={Logo} alt="logo"></Image>
            
          </Link>
          <TooltipProvider>
            
          <Tooltip>
            <TooltipTrigger asChild>
            <Button size="icon" variant={"outline"}  className="border-none">
              <Link
                href={`/brand/${slug}/home`}
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
                
              </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
       
          <Tooltip>
            <TooltipTrigger asChild>
            <Button size="icon" variant={"outline"} disabled={isDisabled} className="border-none">

              <Link
                href={`/brand/${slug}/orders`}
                className="flex h-9 w-9 items-center justify-center  rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button size="icon" variant={"outline"} disabled={isDisabled} className="border-none">

              <Link
                href={`/brand/${slug}/products`}
                className="flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Store className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button size="icon" variant={"outline"} disabled={isDisabled} className="border-none">

              <Link
                href={`/brand/${slug}/analytics`}
                className="flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button size="icon" variant={"outline"} disabled={isDisabled} className="border-none">

              <Link
                href={`/brand/${slug}/settings`}
                className="flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>

              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Image src={Logo} alt="logo" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href={`/brand/${slug}/home`}
                  className="flex items-center gap-4 px-2.5  hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  href={`/brand/${slug}/products`}
                  className="flex items-center gap-4 px-2.5  hover:text-foreground"
                >
                  <Store className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href={`/brand/${slug}/orders`}
                  className="flex items-center gap-4 px-2.5  hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href={`/brand/${slug}/analytics`}
                  className="flex items-center gap-4 px-2.5  hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
          {children}
        
      </div>
    </div>
  )
}


export default BrandLayout