"use client"


import Image from "next/image"
import Link from "next/link"
import LoginImage from '@/assests/brownrose.jpg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/actions/login.action"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const initialState = {
  type: '',
  message: '',
  errors: null,
};


function BrandLogin() {
  
  const router = useRouter();
  const [state, formAction] = useFormState<any>(login as any, initialState);

  if (state?.type === 'success') {
    toast.success(state.message);
    router.push(`/brand/${state.email}/home`);
  }

  if (state?.type === 'error') {
    toast.error(state.message);
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to login to your account
            </p>
          </div>
          <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"

              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required name="password"/>
            </div>
            <Button type="submit" className="w-full">
             Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/#becomeapartner" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-brand lg:block">
        <Image
          src={LoginImage}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          loading="eager"
          placeholder="blur"
        />
      </div>
    </div>
  )
}
export default BrandLogin