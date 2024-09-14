import React, { useContext, useEffect, useRef, useState } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import dayjs from 'dayjs';
import customContext from '../Context/customContext';


const { RangePicker } = DatePicker

const DataFilter = (props)=>{

    let ctx = useContext(customContext)
    let [textValue,setTextValue]= useState(null);
    let [typevalue,setTypeValue]= useState("All");

    useEffect(()=>{
        ctx.fromDate = undefined;
        ctx.toDate = undefined ;
    },[])

    useEffect(()=>{
        setTextValue('')
        setTypeValue('All')
    },[props.nameshowfilter1])

   
    function onDataFilterChange(data){
       ctx.fromDate = data && moment(data[0].$d).format('DD/MM/YYYY')
       ctx.toDate = data && moment(data[1].$d).format('DD/MM/YYYY')
       props.dateFilter(ctx.fromDate,ctx.toDate);
    }

    function onNameChange(data){
        setTextValue(data.target.value)
        props.getFilterNameData(data.target.value)
    }
    function onTypeChange(data){
        setTypeValue(data.target.value)
        props.typeFilter(data.target.value)
    }

    return(<>
        <div className={`fixed w-full md:h-[100px] h-[140px] top-[50px] bg-white z-[100] flex justify-center items-center ${props.show?'':'hidden'}`}>
           <div className="w-[90%] md:h-[85%] h-[95%] shadow-[1px_1px_2px_1px] flex flex-col md:flex md:flex-row items-center justify-around">
           <RangePicker minDate={dayjs()} className='md:w-[30%] w-[90%] h-[35px] border-b-4 border-black'  onChange={onDataFilterChange}/>
           <input type="text" placeholder='Search Rooms' className='p-2 w-[90%] md:w-[30%] h-[35px] border border-b-4 border-black rounded' value={textValue}  onChange={onNameChange} />
           <select name="" id="" value={typevalue} className='md:w-[30%] w-[90%] h-[35px] border border-b-4 border-black rounded' onChange={onTypeChange}>
           <option className='text-sm' value="All">All</option>
            <option className='text-sm' value="Normal">Normal</option>
            <option className='text-sm' value="Delux">Delux</option>
           </select>
           </div>
        </div>
        </>
    )
}

export default DataFilter ;