import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import customContext from "../Context/customContext";
import { GrLogout } from "react-icons/gr";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

let baseUrl = "https://hotelbackend-otix.onrender.com"
//let baseUrl = "http://127.0.0.1:3000"

const Nav = () => {
    let ctx = useContext(customContext)
    let[loggedIn,setLoggedIn]=useState(false)
    let navigate = useNavigate();
    let [userName,setUserName]=useState();

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token){
            axios.get(`${baseUrl}/hotel/v1/getAuthenticate/${token}`)
            .then((res)=>{
              ctx.login=true
              setLoggedIn(true)
              setUserName(res.data.userData.name)
              ctx.userName = res.data.userData
            })
            .catch((err)=>{
                ctx.login=false
                setLoggedIn(false)   
            })
        }
    
    },[])
    

    

    let currentUrl = window.location.href;

    let [showNav, setShowNav] = useState(false);

    function onHamClick() {
        setShowNav(!showNav)
    }

    function onLogOutClick(){
        if(currentUrl=='http://localhost:5173/booking' || currentUrl=='http://localhost:5173/getBookings'){
        ctx.login=false
        ctx.booking = false
        setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/')
       }else{
        ctx.login=false
        ctx.booking = false
        setLoggedIn(false);
        localStorage.removeItem('token');
       }
         
    }

    return (
        <>
            <div className="w-full h-[50px] bg-gray-950 flex items-center fixed top-0 z-[100]">
                <img src="/logo.PNG" alt="" className="w-[25px] h-[25px] rounded-full md:ml-2 ml-1" />
                <h1 className="text-slate-100 px-3 cursor-pointer" onClick={()=>{navigate('/')}}>HappyHotel</h1>
                {!loggedIn && <div className="md:text-slate-100 md:flex list-none md:ml-auto md:p-7 hidden">
                    {currentUrl!='http://localhost:5173/' && <li><NavLink to='/home' className={({isActive})=>(isActive?'text-red-500':'')}>Home</NavLink></li>}
                    <li className="px-7"><NavLink to="/login" className={({isActive})=>isActive?'text-red-500':''}>Login</NavLink></li>
                    <li><NavLink to="/regester" className={({isActive})=> isActive?'text-red-500':''}>Regester</NavLink> </li>
                </div> }
                {
                    loggedIn && <div className="md:text-slate-100 md:flex md:items-center list-none md:ml-auto md:p-10 hidden ">
                         <NavLink to={'/home'} className={({isActive})=>isActive?'text-red-500':''} ><IoMdHome className="text-2xl mr-4" /></NavLink>
                        <li className="mr-[20px] text-xl"><NavLink to={'/getBookings'} className={({isActive})=>isActive?'text-red-500':''}>MyBookings</NavLink></li> 
                       <FaUser className="mr-2"/>
                    <h1 className="text-xl">{userName}</h1>
                    <GrLogout className="ml-10 text-xl cursor-pointer" title="logout" onClick={onLogOutClick}/>
                </div>
                }
                <div className="sm:text-slate-100 md:hidden ml-auto mr-2 ">
                    <GiHamburgerMenu className="text-slate-100 mr-[1px]" onClick={onHamClick}></GiHamburgerMenu>
                </div>
            </div>
            {showNav &&
              
                <div className=" border border-solid rounded fixed w-[100px] h-[130px] right-0 mt-[30px] bg-black list-none flex flex-col items-center py-3 text-slate-100 z-[101]">
                     {!loggedIn && <>
                    <li className="px-7"><NavLink to="/login" className={({isActive})=>isActive?'text-red-500':''}>Login</NavLink></li>
                    {currentUrl!='http://localhost:5173/' && <li><NavLink to='/home' className={({isActive})=>(isActive?'text-red-500':'')}>Home</NavLink></li>}
                    <li><NavLink to="/regester" className={({isActive})=>isActive?'text-red-500':''}>Regester</NavLink></li></>}
                    {loggedIn && 
                       <>
                    <h1>{userName}</h1>
                    <NavLink to={'/home'} className={({isActive})=>isActive?'text-red-500':''} >Home</NavLink>
                    <NavLink to={'/getBookings'} className={({isActive})=>isActive?'text-red-500':''}>Bookings</NavLink>
                    <GrLogout className="ml-4 text-xl cursor-pointer mt-[5px]" title="logout" onClick={onLogOutClick}/>
                    </>
                     }
                    
                </div>
            }
        </>
    )
}

export default Nav;
