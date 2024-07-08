"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { SearchIcon } from "lucide-react";

// Define the shape of an Order object
interface Order {
  orderNumber: string;
  location: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  image: string;
}

export default function Component() {
  // Define states and their types
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof Order>("location");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Sample orders data
  const orders: Order[] = [
    {
      orderNumber: "ORD001",
      location: "New York, NY",
      orderDate: "2023-05-01",
      totalAmount: 99.99,
      status: "New",
      image: "/placeholder.svg",
    },
    {
      orderNumber: "ORD002",
      location: "Los Angeles, CA",
      orderDate: "2023-05-02",
      totalAmount: 149.99,
      status: "New",
      image: "/placeholder.svg",
    },
    {
      orderNumber: "ORD003",
      location: "Chicago, IL",
      orderDate: "2023-05-03",
      totalAmount: 79.99,
      status: "New",
      image: "/placeholder.svg",
    },
    {
      orderNumber: "ORD004",
      location: "Miami, FL",
      orderDate: "2023-05-04",
      totalAmount: 199.99,
      status: "New",
      image: "/placeholder.svg",
    },
    {
      orderNumber: "ORD005",
      location: "Seattle, WA",
      orderDate: "2023-05-05",
      totalAmount: 59.99,
      status: "New",
      image: "/placeholder.svg",
    },
  ];

  // Filter and sort orders based on search term and sorting criteria
  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sorting by column
  const handleSort = (column: keyof Order) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handle view details action
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl text-brand-brown">New Orders</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand-brown">
              <TableHead className="cursor-pointer" onClick={() => handleSort("orderNumber")}>
                Order Number
                {sortColumn === "orderNumber" && <ChevronsUpDownIcon className="ml-2 h-4 w-4" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                Location
                {sortColumn === "location" && <ChevronsUpDownIcon className="ml-2 h-4 w-4" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("orderDate")}>
                Order Date
                {sortColumn === "orderDate" && <ChevronsUpDownIcon className="ml-2 h-4 w-4" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("totalAmount")}>
                Total Amount
                {sortColumn === "totalAmount" && <ChevronsUpDownIcon className="ml-2 h-4 w-4" />}
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>{order.location}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={order.status === "New" ? "secondary" : "outline"}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedOrder && (
        <Sheet>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Order Details</SheetTitle>
              <SheetDescription>View more information about the selected order.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 p-6">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <img
                  src={selectedOrder.image}
                  alt={`Order ${selectedOrder.orderNumber}`}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div>
                  <div className="font-semibold">{selectedOrder.orderNumber}</div>
                  <div className="text-sm text-muted-foreground">{selectedOrder.orderDate}</div>
                </div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <MapPinIcon className="w-6 h-6" />
                <div className="text-sm text-muted-foreground">{selectedOrder.location}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <DollarSignIcon className="w-6 h-6" />
                <div className="font-semibold">${selectedOrder.totalAmount.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <FlagIcon className="w-6 h-6" />
                <Badge variant={selectedOrder.status === "New" ? "secondary" : "outline"}>{selectedOrder.status}</Badge>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

// Define types for the icons
interface IconProps {
  className?: string;
  [key: string]: any;
}

// Functional components for icons
function ChevronsUpDownIcon(props: IconProps) {
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
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

function DollarSignIcon(props: IconProps) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h.5" />
      <path d="M17 19H7.5a3.5 3.5 0 0 1 0-7H17" />
    </svg>
  );
}

function MapPinIcon(props: IconProps) {
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
      <circle cx="12" cy="11" r="3" />
      <path d="M17.8 14.6L19 22 12 19l-7 3 1.2-7.4" />
    </svg>
  );
}

function FlagIcon(props: IconProps) {
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
      <path d="M6 4v16M6 9h14M6 12h14M6 15h14" />
    </svg>
  );
}
