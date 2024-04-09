"use client"
import type { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiFillMessage, AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
import * as placeholder from '@/../public/avatar-1577909_1280.png'
import { Strories } from "./component/Stories";
import { images } from "../../../ArbiratryData";
import { CiLogout } from "react-icons/ci";
import { BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";

interface IUserProps {};



const User: FC<IUserProps> = (props) => {
    const router = useRouter();
    

    /* function show(){
        fetch('http://localhost:3000/api/dummy')
            .then(res=>(res.json()))
            .then((data:{ctx:User})=>{console.log(data.ctx)})
    } */
    
    

    function click(){
        signOut({callbackUrl:'/'})
    }
    return (
        <div>
            <nav className="flex items-center border-y-4 border-slate-800 px-[1rem] h-[4.3rem] bg-slate-300">
                <div className="flex gap-2">
                    {images.map((image)=><Strories HeightWidth={55} PathThickness={4} imageURL={image}/>)}
                </div>
            </nav>
            <nav className="flex flex-col items-center gap-4 py-2 h-screen w-12 
             bg-slate-800">

            <button type="button" className="bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 shadow-inner focus:outline-none shadow-slate-900 rounded-md p-1 text-slate-300"><BiHomeAlt size={30} /></button>
            <button type="button" className="bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 shadow-inner focus:outline-none shadow-slate-900 rounded-md p-1 text-slate-300"><CgProfile size={30} /></button>
            <button type="button" className="bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 shadow-inner focus:outline-none shadow-slate-900 rounded-md p-1 text-slate-300"><IoIosNotifications size={30} /></button>
            <button type="button" className="bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 shadow-inner focus:outline-none shadow-slate-900 rounded-md p-1 text-slate-300"><AiFillMessage size={30} /></button>
            <button onClick={click} type="button" className="bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 shadow-inner focus:outline-none shadow-slate-900 rounded-md p-1 text-slate-300"><CiLogout size={30} /></button>
            <button type="button" className="bg-slate-700 hover:bg-slate-600 focus:bg-slate-600 shadow-inner focus:outline-none shadow-slate-900 rounded-md p-1 text-slate-300"><AiOutlineSetting size={30} /></button>
            
            </nav>
            {/* <button onClick={show} type="button">Show All user</button> */}

        </div>
    );
}

export default User