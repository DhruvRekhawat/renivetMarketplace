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

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  
})

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password:"",
            email: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values)
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        
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
        <Button type="submit" className=" text-brand-offwhite w-full"> Submit</Button>
        <p>New Here? <Link href="/register" className="text-brand-brown underline">Create an Account</Link></p>
        <p>Lost Password? <Link href="/recoverPass" className="text-brand-brown underline">Recover Password</Link></p>

      </form>
    </Form>
  )
}
