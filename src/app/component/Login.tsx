"use client"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import { LiaDiscord } from "react-icons/lia";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
interface ILoginProps {};

export const Login: FC<ILoginProps> = (props) => {
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [state, setState] = useState<'VISIBLE' | 'NOTVISIBLE'>('NOTVISIBLE')
    const [btype, setBtype] = useState<'password'|'text'>('password')
    const router = useRouter();
    const session = useSession()

    useEffect(()=>{
        if(session.status === 'authenticated'){
            router.push('/user')
        }
    },[])


    function handlesubmit(e:FormEvent){
        e.preventDefault();
              
            signIn('credentials',{
                redirect:false,
                username:(email.current?.value),
                password:password.current?.value,
            }).then((callback=>{
                if(callback?.error){
                    toast.error("Invalid Id & Password",{
                        position:"top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce
                    })
                }
                if(callback?.ok && !callback?.error){
                    toast.success("Logged In",{
                        position:"top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce
                    })
                    router.push('/user')
                }
            })).catch(error=>{
                throw new Error(error)
            })     
        
    }
    function setEye(){
        if(state==='NOTVISIBLE'){
            setState('VISIBLE')
            setBtype('text')
        }
        if(state==='VISIBLE'){
            setState('NOTVISIBLE')
            setBtype('password')
        }
    }
    function Eye(){
        if(state === 'VISIBLE'){
            return <AiFillEyeInvisible className="text-gray-800"/>
        }
        if(state === 'NOTVISIBLE'){
            return <AiFillEye className="text-gray-800"/>
        }
    }
    return (
        <div className="flex flex-col">
            <form className="flex flex-col gap-2" onSubmit={handlesubmit}>
                <div className="flex flex-col gap-1">
                <label>your id</label>
                <input id="username" ref={email} required className=" border rounded shadow-for_input outline-none text-gray-800" type="text" />
                </div>
                <div className="flex flex-col gap-1" >
                <label>your password</label>
                <div className="relative">
                    <button onClick={setEye} type="button" className=" absolute ml-[90%] my-1"><Eye/></button>
                    <input id="password" ref={password} required className=" border w-[100%] rounded shadow-for_input outline-none text-gray-800" type={`${btype}`}/>
                </div>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-400 shadow-md rounded block w-20 h-10 m-auto mt-3
                 text-white" type="submit" >Login</button>
            </form>
            <div className="flex gap-1 mt-3">
                <p>if you are new</p>
                <Link className=" underline " href={'/register'}>create new user</Link>
            </div>
            <div className="relative flex justify-center mt-1">
                <span>or signIn with</span>                
            </div>
            <div className="flex justify-around">
                <button onClick={()=>{signIn('google',{callbackUrl:'/user'})}} className="bg-slate-200 px-10 py-4 rounded hover:bg-slate-300">
                <FcGoogle style={{height: "1.5rem",width: "1.5rem"}}/>
                </button>
                <button onClick={()=>{signIn('discord',{callbackUrl:'/user'})}} className="bg-slate-200 px-10 py-4 rounded hover:bg-slate-300">
                <LiaDiscord style={{height: "1.5rem",width: "1.5rem",color:"#6d28d9"}}/>
                </button>
            </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
        </div>
    );
}
