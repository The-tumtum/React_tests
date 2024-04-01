"use client"
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
interface IregisterProps {};

let STATUS:Number

const register: FC<IregisterProps> = (props) => {
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const cpassword = useRef<HTMLInputElement>(null)
    const [state, setState] = useState<'VISIBLE' | 'NOTVISIBLE'>('NOTVISIBLE')
    const [btype, setBtype] = useState<'password'|'text'>('password')
    const router = useRouter();

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
            return <AiFillEyeInvisible/>
        }
        if(state === 'NOTVISIBLE'){
            return <AiFillEye/>
        }
    }
    function cancle(){
        router.push('/')
    }
    function handlesubmit(e:React.FormEvent){
        e.preventDefault();
        if(name.current && email.current && password.current && cpassword.current){ 
            if(password.current.value===cpassword.current.value){
            fetch('http://localhost:3000/api/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({                
                    name:name.current.value,
                    email:email.current.value,
                    password:password.current.value
                })
            })
            .then(res=> {
                STATUS = res.status;
                return res.json()})
            .then((data:any)=>{
                if(STATUS===201){
                    toast.success(data.message,{position:'top-center'})
                    router.push('/')
                }else{
                    toast.error(data.message ,{position:'top-center'})
                }
            })
            
        }else{
                toast.error('Password Not Confirm')
            }
        }
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen loginPage bg-slate-400">
            <form onSubmit={handlesubmit} className={`flex flex-col justify-center px-4 py-4 rounded-lg gap-4 w-[20rem] bg-white`} action="">
                <div className={`flex flex-col gap-1`} >
                    <label htmlFor="">Your name</label>
                    <input required ref={name} className="border rounded shadow-for_input outline-none h-[2rem]" type="text" />
                </div>
                <div className={`flex flex-col gap-1`}>
                    <label htmlFor="">Your id</label>
                    <input required ref={email} className="border rounded shadow-for_input outline-none h-[2rem]" type="text" />
                </div>
                <div className={`flex flex-col gap-1`}>
                    <label htmlFor="">Your password</label>
                    <div className="relative">
                        <button onClick={setEye} type="button" className=" absolute ml-[90%] my-1"><Eye/></button>
                        <input aria-required id="password" ref={password} required className=" border w-[100%] h-[2rem] rounded shadow-for_input outline-none" type={`${btype}`}/>
                    </div>
                </div>
                <div className={`flex flex-col gap-1`}>
                    <label htmlFor="">conform password</label>
                    <div className="relative">
                        <button onClick={setEye} type="button" className=" absolute ml-[90%] my-1"><Eye/></button>
                        <input aria-required id="password" ref={cpassword} required className=" border w-[100%] h-[2rem] rounded shadow-for_input outline-none" type={`${btype}`}/>
                    </div>
                </div>
                <div className="flex justify-around">
                    <button className="bg-indigo-500 hover:bg-indigo-400 shadow-md rounded block w-20 h-10 m-auto mt-3
                    text-white" type="submit">Sign Up</button>
                    <button onClick={cancle} className="bg-gray-500 hover:bg-gray-400 shadow-md rounded block w-20 h-10 m-auto mt-3
                    text-white" type="button">Cancle</button>
                 </div>
            </form>
            <ToastContainer/>
        </div>
    );
}


export default register