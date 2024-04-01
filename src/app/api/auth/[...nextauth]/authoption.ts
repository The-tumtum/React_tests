import prisma from "@/server/db"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import DiscordProvider from "next-auth/providers/discord"
import * as bcrypt from 'bcrypt'

export const authOptions:NextAuthOptions = {
    session:{
        strategy: "jwt"
    },
    providers:[
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
        Credentials({
            name: "credential",
            type: "credentials",
            credentials:{
                username: {label: "your Id", type:"text"},
                password: {label: "your Password", type: "password"}
            },
        async authorize(credentials) {
            if(!credentials) return null

            const user = await prisma.user.findUnique({
                where:{
                    email:credentials.username
                }
            })
            if(!user) return null
            const match = await bcrypt.compare(credentials.password,user.hashPassword as string)
            if(credentials.username===user.email && match){
                user.hashPassword = null
                return user
            }
            return null
        },
        })
    ]
}