import { useEffect ,useContext, useState} from "react"
import Nav from "../component/Nav"
import customContext from "../Context/customContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import moment from "moment"

let baseUrl = "https://hotelbackend-otix.onrender.com"
//let baseUrl = "http://127.0.0.1:3000"

const GetBooking = ()=>{

    let ctx = useContext(customContext)
    let navigate = useNavigate()
    let [userData,setUserData] = useState([])
    let [num,setnum] = useState(10);
    let [spinner,setSpinner] = useState(false);

    useEffect(()=>{
        if(!ctx.login){
            navigate('/home')
          }
        else{
            const data = {
                userid : ctx.userName._id
            }
            axios.post(`${baseUrl}/hotel/v1/getBooking`,data).then((res)=>{
                setSpinner(true)
                let data = res.data.booking
                setUserData(data)
                setSpinner(true)
            }).catch((err)=>{
                console.log(err)
            });
         }
    },[])
  
    
    useEffect(()=>{
        if(userData.length==0){
       let time = setInterval(()=>{
        setnum(pre=>{
            if(pre==0){
                navigate('/home')
            }
            else{
                return pre-1
            }
        })
        },1000)
        return ()=> clearInterval(time)
    }
    })

    function oncancelClick(userData){
        let data = {
            bookingID : userData._id,
            roomId : userData.roomId,
            userId : userData.userid,
            fromDate : userData.fromDate,
            toDate : userData.toDate   
        }
        let confrm = confirm('Do you really want to cancel?')
        if(confrm){
            axios.patch(`${baseUrl}/hotel/v1/updateBooking`,data)
            .then((res)=>{
                console.log('Data cancelled successfully');
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    return<>
    <Nav></Nav>
    <div className=" pt-20 w-[98%] m-[auto] md:flex flex-wrap">
    
       
      
        {!spinner?<>
        <div className="flex items-center md:text-2xl ">
        <span>Loading..</span>
            <div class="spinner border-t-2 border-l-2 border-b-2 border-blue-500 border-solid rounded-full w-[15px] h-[15px] animate-spin"></div>
            </div>
        </>:userData.length>0?(
           userData.map((data)=>{

            const isCancellable =
            data.status === "booked" &&
            moment(data.fromDate,"DD MM YYYY").isAfter(moment());
          console.log("Is Booking Cancellable:", isCancellable);
            return  <div key={data._id} className="mt-[5px] p-3  md:w-[400px] flex justify-center items-center shadow-[1px_1px_1px_1px] ml-[6px] rounded bg-slate-50 font-sans md:text-base text-sm">
            <div className=" mt-[5px] h-[95%] w-[95%]" >
                <h1><b>Booking ID</b> :- {data._id}</h1>
                <h1><b>user ID</b> :- {data.userid}</h1>
                <h1><b>Hotel Name</b> :- {data.room}</h1>
                <h1><b>From Date</b> :- {data.fromDate}</h1>
                <h1><b>To Date</b> :- {data.toDate}</h1>
                <h1><b>Transaction ID</b> :- {data.transactionId}</h1>
                <h1><b>Booking Date</b> :- {data.createdAt}</h1>
                <h1><b>Status</b> :- <span className={data.status == 'booked'?'text-green-500':'text-red-500 text-4xl'}>{data.status}</span></h1>
                {isCancellable && <button className="bg-black text-white rounded w-[160px] mt-[10px] mr-auto" onClick={()=>oncancelClick(data)}>Cancel Booking</button>}
                </div>
                </div>
            })
        ):(<div className="md:text-4xl m-auto flex flex-col justify-center items-center"><h1>Soory you have no bookings</h1>
        <p>You will be re-directed to home page in</p>
        <p className={num<4?'text-red-500 font-bold':'font-bold'}>{num}</p>
        <p>seconds</p>
        <img src="/nothing.PNG" alt="" className="h-[400px]" />
          </div>
             )
       
        }
    
       

    </div>
    </>
    

}

export default GetBooking