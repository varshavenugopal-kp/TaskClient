import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Nav = () => {
   
  return (
    <div>
       <nav className='shadow-md bg-sky-950 h-20'>
            <div className='px-6 py-2'>

              <div className='flex justify-between'>
             
              <div className='main-menu py-4'>
                
        <ul className={`md:flex md:justify-end hidden md: space-x-4 text-white `}>
          <li className='py-1'>
            {/* <NavLink to='/'>
                <span>Home</span>
            </NavLink> */}
         </li>
                </ul>
              </div>
              </div>

            <div className="md:hidden float-right">
      <button className="flex items-center text-white focus:outline-none"  >
        <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            className="fill-current"
            d="M4 6H20M4 12H20M4 18H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>

</div>
        </nav>
    </div>
  )
}

export default Nav
