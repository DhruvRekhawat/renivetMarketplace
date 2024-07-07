"use client"

import { useState, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

// Define the Product type
type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string | File | null
  materials: string
  waterUsed: string
  sustainabilityInfo: string
  inStock: number
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Acme Circles T-Shirt",
    description: "60% combed ringspun cotton/40% polyester jersey tee.",
    price: 29.99,
    image: "/placeholder.svg",
    materials: "60% combed ringspun cotton, 40% polyester",
    waterUsed: "1,500 gallons",
    sustainabilityInfo: "Made using sustainable production methods and recycled materials.",
    inStock: 50,
  },
  {
    id: 2,
    name: "Gamer Gear Pro Controller",
    description: "High-performance gaming controller with customizable buttons.",
    price: 99.99,
    image: "/placeholder.svg",
    materials: "Plastic, silicone, metal",
    waterUsed: "500 gallons",
    sustainabilityInfo: "Designed for long-term use and easy repair.",
    inStock: 25,
  },
  {
    id: 3,
    name: "Bamboo Cutting Board",
    description: "Durable and eco-friendly cutting board made from sustainable bamboo.",
    price: 19.99,
    image: "/placeholder.svg",
    materials: "Bamboo",
    waterUsed: "200 gallons",
    sustainabilityInfo: "Made from renewable and biodegradable bamboo.",
    inStock: 75,
  },
]

export default function Component() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    image: null,
    materials: "",
    waterUsed: "",
    sustainabilityInfo: "",
    inStock: 0,
  })
  const [showDialog, setShowDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Product>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files ? e.target.files[0] : null,
    })
  }

  const handleAddProduct = () => {
    const productToAdd: Product = {
      ...newProduct,
      id: products.length + 1,
      price: Number(newProduct.price), // Ensure price is a number
      inStock: Number(newProduct.inStock) // Ensure inStock is a number
    } as Product

    setProducts([...products, productToAdd])
    setFilteredProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      image: null,
      materials: "",
      waterUsed: "",
      sustainabilityInfo: "",
      inStock: 0,
    })
    setShowDialog(false)
  }

  const handleEditProduct = (id: number) => {
    // Implement the logic for editing a product
  }

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id)
    setProducts(updatedProducts)
    setFilteredProducts(updatedProducts)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    filterProducts(e.target.value)
  }

  const handleSort = (field: keyof Product) => {
    const newSortDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newSortDirection)
    filterProducts(searchTerm, field, newSortDirection)
  }

  const filterProducts = (
    search: string = searchTerm,
    field: keyof Product = sortField,
    direction: "asc" | "desc" = sortDirection
  ) => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    
    filtered = filtered.sort((a, b) => {
      const aValue = a[field]
      const bValue = b[field]
  
      // Ensure that both values are valid and comparable
      if (aValue != null && bValue != null) {
        if (aValue < bValue) return direction === "asc" ? -1 : 1
        if (aValue > bValue) return direction === "asc" ? 1 : -1
      }
      // Handle cases where one or both values might be null or undefined
      if (aValue == null && bValue != null) return direction === "asc" ? -1 : 1
      if (aValue != null && bValue == null) return direction === "asc" ? 1 : -1
      return 0
    })
  
    setFilteredProducts(filtered)
  }
  

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 gap-8 px-6">
        <div className="flex items-center justify-between mb-4 ">
          <div className="relative w-full max-w-md ">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <h1 className="text-2xl text-brand-brown">Manage Products</h1>
            <p className="text-sm text-brand-brown/75 my-1"> Manage all your products here </p>
           
          </div>
          <div className=" flex flex-col gap-2 items-end">
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger>
              <Button>Add New Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" type="text" value={newProduct.name || ""} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProduct.description || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="number" value={newProduct.price?.toString() || ""} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" name="image" type="file" onChange={handleImageChange} />
                </div>
                <div>
                  <Label htmlFor="materials">Materials Used</Label>
                  <Input
                    id="materials"
                    name="materials"
                    type="text"
                    value={newProduct.materials || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="waterUsed">Water Used</Label>
                  <Input
                    id="waterUsed"
                    name="waterUsed"
                    type="text"
                    value={newProduct.waterUsed || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="inStock">In Stock</Label>
                  <Input
                    id="inStock"
                    name="inStock"
                    type="number"
                    value={newProduct.inStock?.toString() || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="sustainabilityInfo">Sustainability Information</Label>
                  <Textarea
                    id="sustainabilityInfo"
                    name="sustainabilityInfo"
                    value={newProduct.sustainabilityInfo || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddProduct}>Add Product</Button>
                <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ListOrderedIcon className="h-4 w-4 mr-2" />
                Sort by: {sortField} ({sortDirection})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sortField}>
                <DropdownMenuRadioItem value="name" onClick={() => handleSort("name")}>
                  Name
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price" onClick={() => handleSort("price")}>
                  Price
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="materials" onClick={() => handleSort("materials")}>
                  Materials
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="waterUsed" onClick={() => handleSort("waterUsed")}>
                  Water Used
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="inStock" onClick={() => handleSort("inStock")}>
                  In Stock
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          </div>
        </div>
        <div>
        <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 bg-white max-w-md"
              value={searchTerm}
              onChange={handleSearch}
            />
          <Table className="w-full my-2 rounded-md">
            <TableHeader>
              <TableRow className="bg-brand-brown rounded-md">
                <TableHead>Image</TableHead>
                <TableHead onClick={() => handleSort("name")}>
                  Name{" "}
                  {sortField === "name" && (
                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead onClick={() => handleSort("price")}>
                  Price{" "}
                  {sortField === "price" && (
                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort("materials")}>
                  Materials{" "}
                  {sortField === "materials" && (
                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort("waterUsed")}>
                  Water Used{" "}
                  {sortField === "waterUsed" && (
                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort("inStock")}>
                  In Stock{" "}
                  {sortField === "inStock" && (
                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead>Sustainability</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
  {product.image ? (
    typeof product.image === "string" ? (
      <img
        src={product.image}
        alt={product.name}
        className="rounded-md object-cover"
        width={100}
        height={100}
      />
    ) : (
      <img
        src={URL.createObjectURL(product.image)}
        alt={product.name}
        className="rounded-md object-cover"
        width={100}
        height={100}
      />
    )
  ) : (
    <img
      src="/placeholder.svg"
      alt="Placeholder"
      className="rounded-md object-cover"
      width={100}
      height={100}
    />
  )}
</TableCell>

                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.materials}</TableCell>
                  <TableCell>{product.waterUsed}</TableCell>
                  <TableCell>{product.inStock}</TableCell>
                  <TableCell>{product.sustainabilityInfo}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditProduct(product.id)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

// SVG Icon component type definition
type SVGProps = React.SVGProps<SVGSVGElement>

function ListOrderedIcon(props: SVGProps) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}
