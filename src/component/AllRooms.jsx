import { useContext, useEffect, useState } from "react";
import Popup from "./Popup";
import customContext from "../Context/customContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import toast, { Toaster } from 'react-hot-toast';

let baseUrl = "https://hotelbackend-otix.onrender.com"
//let baseUrl = "http://127.0.0.1:3000"

const AllRooms = (props)=>{
    
    let ctx = useContext(customContext);
    const navigate = useNavigate();
    let [popUpData,setPopUpData] = useState([]);
    let [showPopUp,setShowPopup] = useState(false);
    let [data , setData] = useState([]);
    let [filterByname ,setFilterByname] = useState()
    let [filterByType ,setFilterByType] = useState([])
    let [filterByDate,setFilterByDate] = useState([])
    let [spinner ,setSpinner] = useState(false)

    useEffect(()=>{
    axios.get(`${baseUrl}/hotel/v1/getRooms`).then((res)=>{
        setData(res.data.data)
        setFilterByname(res.data.data)
        setFilterByType(res.data.data)
        setFilterByDate(res.data.data)
        setSpinner(true)
    }).catch((err)=>{
        console.log('error')
    })
    },[])

    useEffect(()=>{
        props.beforeDateOnchange1()
        if(props.dateFilter.fromDate){
     
        let fromDate = props.dateFilter.fromDate
        let toDate = props.dateFilter.toDate
        let duplicateData = []
        setFilterByType(duplicateData)
        setFilterByDate(duplicateData)
        let allow = true ;

        for(let room of filterByType){
            if(room.currentbookings.length == 0){
                duplicateData.push(room)
            }else{
                allow = true
            for(let curr of room.currentbookings){
                let roomFromDate = moment(curr.fromDate,'YYYY/MM/DD')
                let roomToDate = moment(curr.toDate,'YYYY/MM/DD')
                let fromDate1 = moment(fromDate,'YYYY/MM/DD')
                let toDate1 = moment(toDate,'YYYY/MM/DD')
                // if(roomFromDate.isBetween(fromDate1,toDate1,undefined, '[]') || roomToDate.isBetween(fromDate1,toDate1,undefined, '[]')){
                //     allow = false
                // }
                if(fromDate1.isBetween(roomFromDate,roomToDate,undefined, '[]') || toDate1.isBetween(roomFromDate,roomToDate,undefined, '[]')){
                    allow = false
                }
                else if(moment(fromDate1).isSame(roomFromDate) || moment(fromDate1).isSame(roomToDate) || moment(toDate1).isSame(roomFromDate) || moment(toDate1).isSame(roomToDate)){
                    allow = false
                }
            }

            if(allow){
                duplicateData.push(room)
            }
        }
    }
        console.log(duplicateData)
}else{
    setFilterByDate(data)
    setFilterByType(data)
}
    },[props.dateFilter])

    useEffect(()=>{
        let Filterdata = filterByType && filterByType.filter((eachData)=>{
            if(props.nameFilter==undefined || props.nameFilter == null || props.nameFilter == '' ){
                return eachData
            }else{
                return eachData.name.toLowerCase().includes(props.nameFilter.toLowerCase())
            }
        })

        let filterData1 = Filterdata && Filterdata.filter((each)=>{
            if(props.typeFilter && props.typeFilter!='All'){
                return each.type.includes(props.typeFilter)
            }else{
                return each
            }
        })
        setFilterByDate(filterData1)
    },[props.nameFilter,props.typeFilter])

    useEffect(()=>{
        props.showFilter(!showPopUp)
    },[showPopUp])
 

    function onViewClick(data){
        setPopUpData(data);
        setShowPopup(true)
    }

    function onCancelClick(){
        setShowPopup(false)
    }

    function onBookClick(Data){
        if(ctx.toDate){
        ctx.data = Data;
        if(ctx.login){
        navigate('/booking')
        }else{
            ctx.booking=true
            navigate('/login')
        }
    }else{
        toast.error('please select date')
    }
    }

    return(
        <div className="relative md:top-40 top-[190px]">
            {!spinner?<>
        <div className="flex items-center md:text-2xl">
        <span>Loading..</span>
            <div className="spinner border-t-2 border-l-2 border-b-2 border-blue-500 border-solid rounded-full w-[15px] h-[15px] animate-spin"></div>
            </div>
        </>:filterByDate && filterByDate.map((room)=>{
      return<div key={room._id} className={` w-[80%] h-[420px] md:h-[295px] md:w-[900px] m-auto md:flex md:items-center md:justify-center my-[10px] rounded-xl shadow-lg ${showPopUp?'opacity-10':''} `}>
        <div className="md:w-[48%] md:h-[240px]">
            <img className="md:w-[100%] md:h-[240px] rounded" src={room.imageurls[0]} alt="" />
        </div>
        <div className="md:w-[48%] h-[240px] md:ml-[6px] ml-2">
        <h1 className="text-xl font-extrabold md:mt-[8px]">{room.name}</h1>
        <p>Parking,Reception,Free Wifi</p>
        <p className="md:mt-[10px]"><b>Max Count : {room.maxcount}</b></p>
        <p className="md:mt-[10px]"><b>Rent per Day : {room.rentperday}/-</b></p>
        <p className="md:mt-[10px]"><b>Phone : </b>{room.phonenumber}</p>
        <p className="md:mt-[10px] md:mb-[35px] mb-[5px]"><b>type : {room.type}</b></p>
        <button className="bg-black text-slate-100 rounded w-[130px] h-[30px] md:ml-[150px]" onClick={()=>onBookClick(room)}>Book Now</button>
        <button className="bg-black text-slate-100 rounded w-[130px] h-[30px] md:ml-2 ml-2" onClick={()=>onViewClick(room)}>View Details</button>
        </div>

       </div>
       })
    }
    <div className={`fixed w-[85%] top-[20%] left-[10%] ${!showPopUp?'hidden':''} shadow-lg bg-white`}>
    <Popup data={popUpData} cancel={onCancelClick}></Popup>
    </div>
    <Toaster/>
       </div>
       
    )

}

export default AllRooms;