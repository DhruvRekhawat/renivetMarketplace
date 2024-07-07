"use server"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import {hash} from 'bcryptjs'
import { revalidatePath } from "next/cache"
import { CredentialsSignin } from "next-auth"
import { signIn } from "@/auth"



export const registerBrand = async (formdata:FormData) =>{
    const name = formdata.get('name') as string
    const email = formdata.get('email') as string
    const password = formdata.get('password') as string
    const confirmPassword = formdata.get('confirmPassword') as string

    if(password==confirmPassword){
        const hashedPassword = await hash(password,8)

        await prisma.user.create({
           data:{
            name:name,
            email:email,
            password:hashedPassword,
            role: "brand"
           }
        })
        console.log('user created!')
        redirect('/brand')
        
    }
    
    
    

}

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
    redirect("/")
        

}