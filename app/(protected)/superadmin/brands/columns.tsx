"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "brandName",
        header: "Name",
    },
    {
        accessorKey: "categories",
        header: "Categories",
    },
    {
        accessorKey: "description",
        header: "Product Description",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <Sheet>
          <SheetTrigger>
            <Button size={"sm"}>
                View Details
              </Button></SheetTrigger>
           <SheetContent style={{ maxWidth: '50vw' }}>
            <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
      )
    },
  },
]
