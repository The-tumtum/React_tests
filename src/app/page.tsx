import Image from "next/image";
import { Login } from "./component/Login";
import a from '../../public/3D_Square_with_Instagram_Logo.jpg'
import { FaInstagramSquare } from "react-icons/fa";
import prisma from "@/server/db";

export default async function Home() {
  // await prisma.user.deleteMany()
  return (
    <div className={`flex flex-col justify-center items-center h-screen loginPage bg-slate-400`}>
      <div className="flex">
        <h1 className=" text-5xl text-white">Insta-Clone</h1>
        <div className=" flex justify-center items-center">
          <FaInstagramSquare size={50} color="#008DDA"/>
        </div>
      </div>
      <div className={`bg-white w-[20rem] h-[22rem] flex justify-center items-center pb-4 rounded-lg`}>
        <Login />
      </div>
    </div>
  );
}
