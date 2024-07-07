"use server"

import { CredentialsSignin } from "next-auth"
import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export const login = async (formdata:FormData) =>{
    const email = formdata.get('email')
    const password = formdata.get('password')
        try{
        await signIn("credentials",{
            redirect:false,
            callbackUrl:"/",
            email,
            password
        });
       
    }
    catch(error){

        const newerror = new CredentialsSignin
        return newerror.cause
    }
    redirect(`/brand/${email?.toString()}/home`)
        

}