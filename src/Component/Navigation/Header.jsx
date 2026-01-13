import React from 'react'
import logo from "../../assets/arambha.jpg"
import { IoPerson } from 'react-icons/io5'
function Header() {
  return (
    <div className='bg-gray-100 border  top-0 left-0 right-0 z-50 w-full  border-gray-200 flex flex-row items-center justify-between px-6 py-2 h-20'>
     <div className=' flex items-center gap-3 '>
         <img
              src={logo}
              alt="Arambha Logo"
              className="h-10 w-auto rounded-full"
            /> 
             <div className="leading-tight">
              <span className="block text-2xl font-semibold tracking-wide text-sky-700">
                ARAMBHA
              </span>
              <span className="block text-xs uppercase tracking-[0.2em] text-red-600">
                Group of Hospitality
              </span>
            </div>
     </div>

     <div className='flex flex-col items-center'>
       <IoPerson className='text-gray-700 w-6 h-6 ' />
        <span className='text-gray-400 text-xs'> Profile </span>
          </div>



    </div>
  )
}

export default Header