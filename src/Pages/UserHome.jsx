import React from 'react'
import Home from '../Components/Home/Home'
import Nav from '../Components/Nav/Nav'

const UserHome = () => {
  return (
    <div>
      <Nav/>
      <div className='sm:pt-5'>
      <Home/>
      </div>
      
    </div>
  )
}

export default UserHome
