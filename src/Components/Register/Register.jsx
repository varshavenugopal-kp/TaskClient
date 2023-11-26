import React from 'react'
import { useState } from 'react';
import { apiAuth } from '../../Services/axios';
import { useNavigate } from 'react-router-dom';



const Register = () => {
  const navigate=useNavigate()
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const addUser=((e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    
    })

    console.log("heheheyyyy",user);

    const handleSignup=async(e)=>{
        e.preventDefault()
        try{
         
              const {data}=await apiAuth.post('/register',{...user})
              console.log(data);
            if(data){
              navigate('/login')
            }else{
              navigate('/register')
            }
          }
          catch(error){
    
        }
      }

  return (
    <div>
           <div className='flex justify-center mt-20'>
        <form className='w-96 shadow-lg rounded px-8 pt-6 pb-8 mb-4'>
          <div className='w-70'>
            <div>
              <h1 className='text-center font-bold'>REGISTER</h1>
            </div>
            <div className='mt-4 w-full'>
              
              <div className='w-full'>
                <input
                  type='text'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  placeholder='Name'
                  name='username'
                  onChange={addUser}
                ></input>
              </div>
            </div>

            <div className='mt-4 w-full'>
             
              <div className='w-full'>
                <input
                  type='email'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  placeholder='Email'
                  name='email'
                  onChange={addUser}
                ></input>
              </div>
            </div>

            <div className='mt-4'>
             
              <div className='w-full'>
                <input
                  type='password'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  placeholder='Password'
                  name='password'
                  onChange={addUser}
                ></input>
              </div>
            </div>

            <div className='mt-5 flex justify-center'>
              <button className='bg-black text-white px-4 rounded h-9 w-80' onClick={handleSignup} >REGISTER</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register
