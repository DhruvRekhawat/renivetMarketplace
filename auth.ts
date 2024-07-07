import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/db"
import { compare } from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        name:"Credentials",


        credentials: {
            email: {label:"Email",type:"email"},
            password: {label:"Password",type:"password"},
          },

          authorize: async(credentials) =>{
            const email = credentials.email as string | undefined
            const password = credentials.password as string | undefined

            if(!email || !password){
                throw new CredentialsSignin('Please provide both email and password')
            }
            const user = await prisma.user.findUnique({
                where:{
                    email: email
                }
            })
            console.log(user,email)

            if(!user){
                throw new Error("user not registered")
            }
            if(!user.password){
                throw new Error('Invalid email or password')
            }
            const isMatched = await compare(password,user.password)
            if(!isMatched){
                throw new Error('Password did not match')
            }
            const userData = {
                name: user.name,
                email:user.email,
            }

            return userData
          },

    })
  ],

  pages:{
    signIn:'/user'
  }
})

