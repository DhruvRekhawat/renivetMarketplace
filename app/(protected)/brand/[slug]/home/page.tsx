import Form from "@/components/molecules/forms/multi-step-form"
import { Card } from "@/components/ui/card"

const page = ({params}:{params:{slug:string}}) => {
  const slug = params.slug
    return (
      <main className="p-8 bg-brand-offwhite">
      <h1 className="text-2xl text-brand-brown"> Welcome Back Dhruv! </h1>
      <div className=" h-full w-full flex justify-center items-center">
      <Form></Form>
      </div>
      </main>
    )
  }
  
  export default page