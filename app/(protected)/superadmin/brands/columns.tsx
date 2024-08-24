"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import prisma from "@/lib/db"

export type Brand = {
  id: number;
  brandName?: string | null;
  contactName?: string | null;
  countryOfRegistration?: string | null; 
  categories?: string[]; 
  status: string;
}

export const columns: ColumnDef<Brand>[] = [
    {
        accessorKey: "brandName",
        header: "Name",
    },
    {
        accessorKey: "contactName",
        header: "Contact Name",
    },
    {
        accessorKey: "categories",
        header: "Categories",
    },
    {
        accessorKey: "countryOfRegistration",
        header: "Country",
    },
    
    {
      accessorKey: "status",
      header: "Status",
    },
    {
    id: "actions",
    header:"Actions",
    cell: ({ row }) => {
      const brand = row.original
      const brandid = row.original.id
     
      async function updateBrandStatus(id:number, newStatus:String) {
        try {
          const response = await fetch('/api/approve-brand', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, status: newStatus }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update brand status');
          }
      
          const updatedBrand = await response.json();
          console.log('Brand status updated:', updatedBrand);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      return (
        <div className="flex gap-4">
        <Link href={`/superadmin/brands/${brandid}`}>
          <Button size={"sm"} >View Details</Button>
        </Link>
        <Button onClick={()=>updateBrandStatus(brandid,"APPROVED")} size={"sm"} variant={"secondary"} className="bg-green-600 text-white hover:bg-green-600/75">Approve</Button>
        <Button onClick={()=>updateBrandStatus(brandid,"REMOVED")} size={"sm"} variant={"destructive"} >Reject</Button>
        </div>
      )
    },
  },
]
