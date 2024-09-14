import { useContext, useEffect, useState } from "react"
import customContext from "../Context/customContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import StripeCheckout from 'react-stripe-checkout';


let baseUrl = "https://hotelbackend-otix.onrender.com"
//let baseUrl = "http://127.0.0.1:3000"

const BookingComp = ()=>{

   let navig = useNavigate();
   let ctx = useContext(customContext)
   let fromDatee = moment(ctx.fromDate,'DD-MM-YYYY')
   let toDatee = moment(ctx.toDate,'DD-MM-YYYY')
   const totalDays = moment.duration(toDatee.diff(fromDatee)).asDays()+1
   const totalAmount = ctx.data && totalDays*ctx.data.rentperday ;
   useEffect(()=>{
   if(!ctx.data){
      navig('/')
   }
   })
   
   function onToken(token){
     let data = {
      "room": ctx.data.name,
      "roomId":ctx.data._id,
      "userid":ctx.userName._id,
      "fromDate":ctx.fromDate,
      "toDate":ctx.toDate,
      "totalAmount":totalAmount,
      "totalDays":totalDays,
      "token":token 
   }
   axios.post(`${baseUrl}/hotel/v1/enterBooking`,data).then((res)=>{
      navig('/getBookings')
   }).catch((err)=>{
      console.log(err)
   })
   }

     return(
       <div className="relative w-[95%] md:h-[500px]  top-20 m-auto md:text-2xl text-sm font-serif shadow-[10px_10px_20px_2px_grey] md:pr-3">
         
         {ctx.data && <> <div className="w-full h-[50px]  md:flex items-center justify-between">
           <h1 className="md-mt-10 md:ml-5 ml-2"><b>{ctx.data.name}</b></h1>
           <h1 className="md:mr-10 md:contents hidden ">Booking details</h1>
        </div>
        <div className="w-full h-[450px] md:flex">
         <div className="md:h-[100%] md:w-[50%] flex items-center justify-center">
            <img className="md:h-[95%] md:w-[95%] h-[95%] w-[95%] rounded" src={ctx.data.imageurls[0]} alt="" />
         </div>
         <div className="md:h-[100%] md:w-[50%] w-[100%]  md:block flex">
            <div className="md:h-[50%] md:w-[100%] w-[50%] text-right pr-2 ">
               <p className="p-1 pt-4"><b>Name</b>: {ctx.userName.name}</p>
               <p className="p-1"><b>From Date</b>: {ctx.fromDate}</p>
               <p className="p-1" ><b>To Date</b>: {ctx.toDate}</p>
               <p className="p-1 pb-[40px]"><b>Max Count</b>: {ctx.data.maxcount}</p>
               <p className="p-1 pt-9 md:contents hidden"><b>Amount</b></p>
            </div>
            <div className="md:h-[50%] md:w-[100%] w-[50%] text-right">
            <p className="md:p-2 md:pt-6 p-1 pt-4">Total Days: <b>{totalDays}</b></p>
            <p className="md:p-2 p-1">Rent per day: <b>{ctx.data.rentperday}</b></p>
            <p className="md:p-2 p-1 pb-2"><b>Total Amount : {totalAmount}/-</b></p>
            <StripeCheckout
        token={onToken}
        currency="INR"
        amount={totalAmount*100}
        stripeKey="pk_test_51PHenrSFZm3kcCFPsVUwkhQSzsJpwnpqfUNHDAPyFynEkPzOORkcPyrobCdU7nvxQ2qO1WaEhFCd17XlpX146Yhy00APGhbiIm">
        <button className="bg-black text-slate-100 rounded md:w-[130px] md:h-[45px] mr-2 w-[80px] h-[25px] p-1">Pay now</button>
      </StripeCheckout>
            </div>
         </div>
        </div>
        </>}
        </div>
     )
}

export default BookingComp