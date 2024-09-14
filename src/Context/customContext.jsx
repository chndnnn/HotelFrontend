import React from "react";

let customContext = React.createContext({data:undefined,login:undefined,booking:undefined,userName:undefined,fromDate:undefined,toDate:undefined});

export function ContextProvider(props){

    let data;
    return <customContext.Provider value={{data,login:false,booking:false,userName:undefined,fromDate:undefined,toDate:undefined}}>
     {props.children}
    </customContext.Provider>
}

export default customContext
