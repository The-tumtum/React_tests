import prisma from "@/server/db";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const ctx = await prisma.user.findMany();
    return NextResponse.json({ctx})
}