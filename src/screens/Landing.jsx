import Nav from "../component/Nav";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
const Landing = ()=>{

    let navigate = useNavigate()

    return(
        <>
        <Nav name={'chandan'}></Nav>
        <div className=" h-screen w-full bg-slate-900 flex flex-col items-center justify-center font-serif md:bg-none bg-[url('/HotelImage.PNG')] bg-no-repeat bg-center bg-cover">
        <div className="md:hidden absolute inset-0 bg-black opacity-60"></div>
        <img src="/logo.PNG" alt="" className="rounded-full h-[230px] w-[230px] z-10" />
        <h1 className="md:text-9xl md:mb-[30px] md:text-white md:m-0 m-6 text-4xl font-bold md:font-thin text-shadow-lg">{localStorage.getItem('name')==''?'HappyHotel':localStorage.getItem('name')}</h1>
        <div className="flex items-center justify-center ">
        <button className="text-white bg-black w-[160px] h-[50px] rounded hover:bg-neutral-600 hover:text-black z-10" onClick={()=>{navigate('/home')}}>Get Started {" "}</button>
        <span className="absolute ml-[120px] z-10 "><FaArrowCircleRight className="text-white text-xl"></FaArrowCircleRight></span> 
        </div>
        </div>    
        </>
    )
}

export default Landing ;