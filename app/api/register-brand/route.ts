import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.json();
    const email = formdata.email;
    const password = formdata.password;
    const confirmPassword = formdata.confirmPassword;

    console.log(email,password,confirmPassword)

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }


    if (password === confirmPassword) {
      const hashedPassword = await hash(password, 8);

      // Create a new user in the user table
      await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          role: "brand"
        },
      });

      return NextResponse.json({ message: "Registration successful" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("Error during registration:", err);
    return NextResponse.json({ message: "Registration error" }, { status: 500 });
  }
}
