import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
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