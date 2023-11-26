import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedUser=({children})=>{
    const User=localStorage.getItem("userInfo")
    console.log(User,"protected route");
    if(User){
        return children
    }
    return Navigate({to:"/login"})

}

export default ProtectedUser