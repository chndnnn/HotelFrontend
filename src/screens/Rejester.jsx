import { useState,useEffect, useRef } from "react";
import Nav from "../component/Nav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let baseUrl = "https://hotelbackend-otix.onrender.com"
//let baseUrl = "http://127.0.0.1:3000"

const Regester = ()=>{
   
    let navigate = useNavigate();
    let passref = useRef();
    let nameRef = useRef();
    let emailRef = useRef();
    let confirmRef = useRef();
     

    function onRegesterClick(){
        let data = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passref.current.value,
            confirmPassword : confirmRef.current.value
        }

       axios.post(`${baseUrl}/hotel/v1/regesterUser`,data)
       .then((res)=>{
        navigate('/login')
       }).catch((err)=>{
        if(err.response.data.message.includes('not a valid email address')){
            alert('Please enter vaild Email')
        }
        if(err.response.data.message.includes('confirmPassword')){
            alert('Password and confirm password does not matches');
            confirmRef.current.focus();
        }
        else{
            alert('Something went wrong!!');
        }
       })
        
    }

    return(
        <section className="w-full h-screen border">
        <Nav></Nav>
        <div className="mt-[50px] w- full  flex justify-center " style={{height: 'calc(100vh - 55px)'}}>
          <div className="md:h-[300px] rounded md:w-[600px] w-[95%] h-[300px] mt-20 flex flex-col items-center shadow-[2px_2px_15px_1px_grey]">
            <h1 className="text-4xl">Regester</h1>
            <input className="w-[95%] p-1 rounded border border-solid border-black mt-5" type="text" placeholder="name" ref={nameRef}/>
            <input className="w-[95%] p-1 rounded  border border-solid border-black mt-1" type="text" placeholder="email" ref={emailRef}/>
            <input className="w-[95%] p-1 rounded border border-solid border-black mt-1" type="password" placeholder="Password" ref={passref}/>
            <input className="w-[95%] p-1 rounded border border-solid border-black mt-1 mb-[15px]" type="password" placeholder="Confirm Password" ref={confirmRef}/>
            <button className={`relative w-[90px] h-[35px] bg-black text-white rounded mr-auto ml-2 md:ml-4 mb-[10px] hover:text-xl`} onClick={onRegesterClick}>Regester</button>
            <p className="relative mr-auto md:ml-4 ml-2 cursor-pointer hover:text-sky-500 hover:underline-offset-2"><Link to="/login">Click here to Login</Link></p>
          </div>
        </div>
        </section>
    )
}
export default Regester ;