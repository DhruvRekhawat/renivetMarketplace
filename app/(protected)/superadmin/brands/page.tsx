import { Brand, columns } from "./columns"
import { DataTable } from "./data-table"
import prisma from "@/lib/db"

async function getData(): Promise<Brand[]> {
  const brands = await prisma.brand.findMany()
  return brands
  
}

const ManageBrands = async() => {

  const data = await getData()
  return (
    <main className='p-4'>
      <h1 className='text-2xl w-full text-start font-bold'>Manage Brands</h1>
      <section>
      <DataTable columns={columns} data={data} />
      </section>
    </main>
  )
}

export default ManageBrands