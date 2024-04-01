import NextAuth from "next-auth/next";
import { authOptions } from "./authoption";

const handler = NextAuth(authOptions)

export {handler as POST, handler as GET}