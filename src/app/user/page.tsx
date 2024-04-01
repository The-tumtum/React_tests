"use client"
import type { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
import * as placeholder from '@/../public/avatar-1577909_1280.png'

interface IUserProps {};



const User: FC<IUserProps> = (props) => {
    const router = useRouter();
    const [data, setData] =useState<any>()
    const mainRef = useRef<HTMLDivElement>(null)

    /* function show(){
        fetch('http://localhost:3000/api/dummy')
            .then(res=>(res.json()))
            .then((data:{ctx:User})=>{console.log(data.ctx)})
    } */
    
    useEffect(()=>{
        const doc = mainRef.current;
        doc?.addEventListener('pointerdown',(e)=>{
            doc?.addEventListener('pointermove',(e)=>{
                console.log(e)
            })
            console.log(e)
            // doc.style.translate = `${e.x} ${e.y}`
        })
        doc?.addEventListener('pointerup',(e)=>{
            console.log(e)
            // doc.style.translate = `${e.x} ${e.y}`
            doc.removeEventListener('pointermove',e=>{
                console.log('removed')
            })
        })
    },[])

    function click(){
        signOut({callbackUrl:'/'})
    }
    return (
        <div ref={mainRef}>
            <nav className="px-[2rem] h-20 py-2 bg-slate-300">
                <button className="flex justify-center items-center h-[4rem] w-[4rem] group rounded-full overflow-hidden relative">                    
                    <div className="relative h-[100%] w-[100%]">
                        <div className="absolute rounded-full transition opacity-0 group-hover:opacity-50 m-auto  w-[100%] h-[100%]">
                            <AiOutlinePlus className="w-[100%] h-[100%]"/>
                        </div>
                        <div>                            
                            <Image className="border-2 rounded-full border-slate-800" src={placeholder} alt="" width={80} height={80}/>                            
                        </div>
                    </div>
                </button>
            </nav>
            User <button onClick={click} type="button">signout</button>
            {/* <button onClick={show} type="button">Show All user</button> */}

        </div>
    );
}

export default User