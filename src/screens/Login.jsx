import { useContext, useRef, useState } from "react";
import Nav from "../component/Nav";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import customContext from "../Context/customContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { IoMdEyeOff } from "react-icons/io";

let baseUrl = "https://hotelbackend-otix.onrender.com"
//let baseUrl = "http://127.0.0.1:3000"

const Login = ()=>{
    
    let passref = useRef();
    let emailRef = useRef();
    let ctx = useContext(customContext)
    let[dummy,setdummy] = useState(false)
    let [loading,setLoading] = useState(false)
    let [loading1,setLoading1] = useState(false)
    let navigate = useNavigate();
    
    let [showPass,setShowPass] = useState(false)
    function oneyeClick(){
        if(passref.current.value != '' && passref.current.value != null){
        setShowPass(!showPass)
        }
    }

    function onLoginClick(){
        setLoading1(true)
        let data = {
            email:emailRef.current.value,
            password:passref.current.value
        }
        let myPromise = axios.post(`${baseUrl}/hotel/v1//userLogin`,data)
        myPromise.then((res)=>{
            localStorage.setItem('token',res.data.token);
            ctx.userName = res.data.email
            ctx.login = true
            setdummy(!dummy)
            if(ctx.booking){
                navigate('/booking')
            }else{
            navigate('/home')
            }
            setLoading1(false)
        })
        .catch((err)=>{
            setLoading1(false)
            console.log(err)
           try{
            //alert(err.response.data.message);
            if(err.response.data.message.includes('Cannot read properties') || err.response.data.message.includes('invalid') ){
            toast.error('Invalid Credentials');
            }
           }catch(err1){
            toast.error('Invalid Credentials');
           }
        })
    }

    async function onGuestLoginClick(){
        setLoading(true)
        let data = {
            email:'guest@gmail.com',
            password:'123456'
        }
        try{
           let res = await axios.post(`${baseUrl}/hotel/v1//userLogin`,data)
           localStorage.setItem('token',res.data.token);
           ctx.userName = res.data.email
           ctx.login = true
           setdummy(!dummy)
           if(ctx.booking){
               navigate('/booking')
           }else{
           navigate('/home')
           }
           setLoading(false)
        }catch(err){
            setLoading(false)
            console.log(err)
        }
        
    }

    return(

        <section className="w-full h-screen border">
        <Nav/>
        
        <div className="mt-[50px] w- full  flex justify-center " style={{height: 'calc(100vh - 55px)'}}>
          <div className="md:h-[240px] md:w-[500px] w-[95%] h-[240px] mt-20 flex flex-col items-center rounded shadow-[2px_2px_15px_1px_grey]">
            <h1 className="text-4xl">Login</h1>
            <input className="pl-2 p-1 rounded w-[95%] h-[30px] border border-solid border-black mt-5" type='text' placeholder="email" ref={emailRef}/>
            <input className="pl-2 p-1 rounded w-[95%] h-[30px] border border-solid border-black mt-1 mb-[10px]" type={showPass?'text':'password'} placeholder="Password" ref={passref} />
            {showPass?<FaEye className="relative ml-auto mt-[-33px] mr-5 cursor-pointer" onClick={oneyeClick}></FaEye>
            :<IoMdEyeOff  className="relative ml-auto mt-[-33px] mr-5 cursor-pointer" onClick={oneyeClick}></IoMdEyeOff>}
            <div className="flex mr-auto mt-5">
            <button className="relative w-[90px] h-[30px] bg-black text-white rounded mr-auto ml-2 md:ml-3  hover:text-xl " onClick={onLoginClick}>{!loading1?'Login':<div class="flex items-center justify-center">
  <div class="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
</div>}</button>
            <button className="relative w-[90px] h-[30px] bg-black text-white rounded mr-auto ml-2 md:ml-3 mb-[10px] hover:text-xl" onClick={onGuestLoginClick}>{!loading?'Guest login':<div class="flex items-center justify-center">
  <div class="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
</div>}</button>
            </div>
            
            <p className="relative mr-auto md:ml-4 ml-2 cursor-pointer hover:text-sky-500 hover:underline-offset-2"><Link to="/regester">Click here to Regester</Link></p>
          </div>
        <Toaster />
        </div>
        </section>

    )

}

export default Login;