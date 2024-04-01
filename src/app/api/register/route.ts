import prisma from "@/server/db";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

const saltround = 10

export async function POST(request:Request){
    const {name,email,password} = await request.json();

    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(user) {
        return (NextResponse.json({message:'User Allready exist with present email id'},{status:403}))
    }
    const salt = await bcrypt.genSalt(saltround)
    const hash = await bcrypt.hash(password,salt)
    await prisma.user.create({
        data:{
            name:name,
            email:email,
            hashPassword:hash
        }
    })
    return (NextResponse.json({message:'User Created'},{status:201}))
}