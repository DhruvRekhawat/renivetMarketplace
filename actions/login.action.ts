"use server"

import { CredentialsSignin } from "next-auth"
import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { compare } from "bcryptjs";
import prisma from "@/lib/db";
import { z } from "zod";


export interface Login {
    email: string;
    password: string;
  }
  const loginSchema = z.object({
    email: z.string().email('Invalid email address').trim(),
    password: z.string().min(8, 'Password is required').trim(),
  });  

export const login = async (prevData: any, formData: FormData) => {
    const userFormData = Object.fromEntries(formData) as unknown as Login;
    const { email, password } = userFormData;
    console.log(email, password);
  
    const validatedFields = loginSchema.safeParse(userFormData);
  
    if (!validatedFields.success) {
      return {
        type: 'error',
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Login.',
      };
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
    
      if (!user) {
        return {
          type: 'error',
          message: 'Invalid email or password',
        };
      }
      else{
        console.log('user found')
      }
  
      const isMatched = await compare(password, user.password);

  
      await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });
  
      return {
        type: 'success',
        message: 'Logged in successfully.',
        email: email,
        name: user.name
      };
    } catch (error) {
      return {
        type: 'error',
        message: 'Failed to Login.Please check you Email and Password',
      };
    }
  };