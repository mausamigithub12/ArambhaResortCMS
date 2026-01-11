import React from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { FaConciergeBell, FaRegImage } from 'react-icons/fa'
import { GiPartyPopper } from 'react-icons/gi'
import { IoIosContact, IoMdHome } from 'react-icons/io'
import { MdOutlineBedroomChild } from 'react-icons/md'
import { Link } from 'react-router-dom'
function Sidebar() {
  const data=[
    {
        icon:<IoMdHome />
,
        title:"Home",
        link:"/home",
    },
    {
        icon:<AiOutlineExclamationCircle />
,
        title:"About Us",
        link:"/about",
    },
    {
        icon:<FaConciergeBell /> ,
        title:"Service",
        link:"/service",
    },
    {
        icon:<MdOutlineBedroomChild />
 ,
        title:"Rooms",
        link:"/room",
    },
    {
        icon:<GiPartyPopper />
,
        title:"Events",
        link:"/event",
    },
    {
        icon:<FaRegImage />
 ,
        title:"Gallery",
        link:"/gallery",
    },
    {
        icon:<IoIosContact />
,
        title:"Contact",
        link:"/contact",
    },
    {
        icon:<BiDetail />
,
        title:"Blogs",
        link:"/blog",
    },
  ]


  return (
    <div className='bg-gray-100 border-gray-300 w-72 pt-6 space-y-5  '>
     {
        data.map((item,idx)=>(
        <div
        key={idx} 
        >
        <Link to ={item.link} className=' flex  flex-row gap-2 items-center  text-center  '>
           <span className='text-xl text-sky-700'>{item.icon}</span>
          <span className='text-sky-700 font-semibold'> {item.title}</span>
        </Link>
        </div> 


        ))
     }
    


    </div>
  )
}

export default Sidebar