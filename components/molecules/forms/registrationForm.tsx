"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { registerBrand } from "@/actions/register.action"

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  confirmPassword: z.string().min(5, {
    message: "Password must be at least 2 characters.",
  }),
  
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
});

export default function RegisterationForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password:"",
            confirmPassword:"",
            email: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
            if(values.password===values.confirmPassword){
              console.log(values)
            }
      }

  return (
    <Form {...form}>
      <form action={registerBrand} className="space-y-2">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Confirm Password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" text-brand-offwhite w-full"> Register </Button>
        <p>Already Have An Account? <Link href="/brand" className="text-brand-brown underline">Login</Link></p>
      </form>
    </Form>
  )
}
