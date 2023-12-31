import React, { useState } from 'react'
import { apiAuth } from '../../Services/axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../Redux/Userslice'
import { io } from 'socket.io-client'


const Login = () => {

    const socket = io(process.env.REACT_APP_BASE_URL);

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [user,setUser]=useState({email:'',password:''})

    const addUser=((e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    })

    const userLogin=async(e)=>{
    
        e.preventDefault()
       
          const {data}= await apiAuth.post('/login',{...user})
          
            console.log(data);
          if(data.token){
            console.log('Before emitting login event');
            socket.emit('login', data._id);
            console.log('After emitting login event');
            localStorage.setItem("userInfo", JSON.stringify(data))
            dispatch(setProfile({userid:data._id, email:data.email}))
            navigate('/dashboard');
            
          }
          
        
      }
  return (
    <div>
          <div className='flex justify-center mt-20'>

<form className='w-96 shadow-lg rounded px-8 pt-6 pb-8 mb-4'>
   <div className='w-70'>
     <div>
       <h1 className='text-center font-bold'>LOGIN</h1>
     </div>
     <div>
    
    
    
    <div className='mt-4 w-full'>
     <label className="block text-gray-700 mb-2 ml-3 mt-2">
   Email
 </label>
     <div className='w-full'>
       <input type='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email"' name='email' onChange={addUser}></input>
     </div>
    </div>
    {/* <div className='text-xs text-red-600'>
     <p>{err.email}</p>
    </div> */}
    
   

     <div className='mt-4'>
     <label className="block text-gray-700 mb-2 ml-3 mt-2">
   Password
 </label>
     <div className='w-full'>
     <input type='password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Password" ' name="password" onChange={addUser}></input>
     </div>
     </div>

     {/* <div className='text-xs text-red-600'>
     <p>{err.password}</p>
    </div> */}
    

     <div className='mt-5 flex justify-center'>
     <button className="bg-sky-950 hover:bg-sky-900 text-white px-4 rounded h-9 w-80" onClick={userLogin}>
      Login
     </button>

     </div>
     {/* <p>{err.email}</p> */}
     {/* <div className='text-xs text-red-600'>
     <p>{err.invalid}</p>
    </div> */}
     
     <div className='inline-flex items-center justify-center w-full'>

    
     </div>

     <div className='ms-8'>
    
     </div>
     {/* <div className='w-full'>
       <input type='text' className='shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"'></input>
     </div> */}
     <div className='flex space-x-2 justify-center mt-5'>
       <h5 className='text-sm'>Not a member?</h5>
       <NavLink to='/register'>
         <h6 className='text-xs  text-sky-600'> register here</h6>
       </NavLink>
     </div>
     </div>
   </div>
</form>

</div>

    </div>
  )
}

export default Login
