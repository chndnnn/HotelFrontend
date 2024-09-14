import { useEffect, useState } from "react";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Popup = (props)=>{ 
    let [image,setimage] = useState([])
    let[count,setCount] = useState(0)

    useEffect(()=>{
        if (props.data && props.data.imageurls) {
            setimage(props.data.imageurls);
        }
    },[props.data]);

    function next(){
        if(count!=image.length -1){
            setCount((count1)=>{
              return count1+1
            })
        }
        else{
            setCount(0)
        }
    }

    function prev(){
        if(count!=0){
            setCount((count1)=>{
              return count1-1
            })
        }
        else{
            setCount(image.length-1)
        }
    }

    function onCancel(){
        props.cancel();
    }
 
    return(
       <div className="w-[100%] h-[480px] md:h-[320px] md:flex bg-slate-50 relative overflow-y-auto">
        <MdCancel className=" md:absolute sticky top-0 absolute z-50  md:right-0 ml-auto text-2xl cursor-pointer" onClick={onCancel} ></MdCancel>
       <div className="md:w-[50%] md:h-[320px] overflow-hidden flex items-center relative justify-center">
            < img src={image[count]} alt="" className="md:w-[95%] rounded md:h-[300px] w-[95%] h-[200px] mt-1" /> 
            <div className="absolute md:mt-[5px] md:w-[90%]  w-full md:ml-1 flex justify-between">
        <button className="p-1 md:text-2xl rounded-full shadow bg-white text-gray-800 hover:text-red-600" onClick={prev} ><FaChevronLeft /></button>
        <button className="p-1 md:text-2xl rounded-full shadow bg-white text-gray-800 hover:text-red-600" onClick={next}><FaChevronRight></FaChevronRight></button>
       </div>          
       </div>
       <div  className="md:w-[50%] md:h-[320px] flex flex-col">
        <div className="w-[100%] w-[90%]">
            <h1><b>Address :</b> {props.data.address}</h1>
        </div>
        <div className="h-[100px] w-full relative flex justify-center items-center">
            <img src='./googleMapsTricksHero.avif' className="h-full w-full rounded" />
            <a href='https://www.google.com/maps/place/Asha+Tiffins/@12.9124226,77.6446708,13.5z/data=!4m6!3m5!1s0x3bae149290971269:0x40c8500e27e7ad11!8m2!3d12.9118579!4d77.6326498!16s%2Fg%2F11f5h72rgd?entry=ttu&g_ep=EgoyMDI0MDkwOC4wIKXMDSoASAFQAw%3D%3D' target="_blank" className="absolute text-white">click</a>
        </div>
        <div className="flex flex-wrap">
        {props.data.facilities &&
            props.data.facilities.map((items)=>{
                return <div className="p-1 bg-sky-950 text-white ml-1 mt-[2px] mb-[2px] w-fit rounded break-words">{items}</div>
            })
        }
        </div>
       
        <div className="h-60 overflow-y-auto scrollbar-thin">
        <h1>{props.data.description}</h1>
        </div>
       
       </div>
     
       </div>
    )

}

export default React.memo(Popup);