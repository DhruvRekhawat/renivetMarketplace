import Form from "@/components/molecules/forms/multi-step-form"
import { Card } from "@/components/ui/card"

const page = ({params}:{params:{slug:string}}) => {
  const slug = params.slug
    return (
      <main className="p-8">
      <h1 className="text-2xl text-brand-brown"> Welcome Back! </h1>
      <p className="text-sm text-brand-brown/75 my-1"> Please complete the onboarding form to become a Renivet Partner</p>
      <div className=" h-full w-full flex justify-center items-center">
      <Form></Form>
      </div>
      </main>
    )
  }
  
  export default page