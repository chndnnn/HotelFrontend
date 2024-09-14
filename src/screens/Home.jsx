import AllRooms from "../component/AllRooms";
import Nav from "../component/Nav";
import DataFilter from "../component/DataFilter";
import { useState } from "react";

const Home = ()=>{

    let [showFilter , setShowFilter]= useState(true)
    let [filterName ,setFilterName] = useState('')
    let [filterType,setFilterType] = useState()
    let [filterDate,setFilterDate] = useState({})
    let[nameshowfilter,setNameShowFilter] = useState(false)

    function onPopup(data){
        setShowFilter(data)
    }

    function getFilterName(data){
        setFilterName(data);
    }

    function getFilterType(data){
        setFilterType(data)
    }

    function getFilterDate(data1,data2){
        setFilterDate({fromDate:data1,toDate:data2})
    }

    function beforeDateOnchange(){
        setNameShowFilter((prev)=>!prev)
    }

    return(
        <>
        <Nav/>
        <DataFilter show={showFilter} getFilterNameData={getFilterName} typeFilter={getFilterType} dateFilter={getFilterDate} nameshowfilter1={nameshowfilter}/>
        <AllRooms showFilter={onPopup} nameFilter={filterName} typeFilter={filterType} dateFilter={filterDate} beforeDateOnchange1={beforeDateOnchange} />
        </>
    )
}

export default Home;