// import React from 'react'
// import { AiOutlineExclamationCircle } from 'react-icons/ai'
// import { BiDetail } from 'react-icons/bi'
// import { FaConciergeBell, FaRegImage } from 'react-icons/fa'
// import { GiPartyPopper } from 'react-icons/gi'
// import { IoIosContact, IoMdHome } from 'react-icons/io'
// import { MdOutlineBedroomChild } from 'react-icons/md'
// import { Link } from 'react-router-dom'
// function Sidebar() {
//   const data=[
//     {
//         icon:<IoMdHome />,
//         title:"Home",
//         link:"/home",
//     },
//     {
//         icon:<AiOutlineExclamationCircle />,
//         title:"About Us",
//         link:"/about",
//     },
//     {
//         icon:<FaConciergeBell /> ,
//         title:"Service",
//         link:"/service",
//     },
//     {
//         icon:<MdOutlineBedroomChild />,
//         title:"Rooms",
//         link:"/room",
//     },
//     {
//         icon:<GiPartyPopper />,
//         title:"Events",
//         link:"/event",
//     },
//     {
//         icon:<FaRegImage />,
//         title:"Gallery",
//         link:"/gallery",
//     },
//     {
//         icon:<IoIosContact />,
//         title:"Contact",
//         link:"/contact",
//     },
//     {
//         icon:<BiDetail />,
//         title:"Blogs",
//         link:"/blog",
//     },
//   ]


//   return (
   
//     <div className="w-72 bg-gray-100 border-gray-300 shadow-sm p-4">
//    <div className="space-y-1">
//     {data.map((item, idx) => (
//       <Link
//         key={idx}
//         to={item.link}
//         className="group flex items-center gap-3 px-3 py-2 rounded-xl
//                    hover:bg-slate-900 hover:-translate-y-[1px] transition-all duration-200"
//       >
//         <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
//           {item.icon}
//         </span>
//         <span className="text-sm font-semibold text-sky-800 group-hover:text-white">
//           {item.title}
//         </span>
//       </Link>
//     ))}
//   </div>
// </div>

//   )
// }

// export default Sidebar



import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { FaConciergeBell, FaRegImage } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { IoIosContact, IoMdHome } from "react-icons/io";
import { MdOutlineBedroomChild } from "react-icons/md";

function Sidebar() {
  const data = [
    { icon: <IoMdHome />, title: "Home", link: "/home" },
    { icon: <AiOutlineExclamationCircle />, title: "About Us", link: "/about" },
    { icon: <FaConciergeBell />, title: "Service", link: "/service" },
    { icon: <MdOutlineBedroomChild />, title: "Rooms", link: "/room" },
    { icon: <GiPartyPopper />, title: "Events", link: "/event" },
    { icon: <FaRegImage />, title: "Gallery", link: "/gallery" },
    { icon: <IoIosContact />, title: "Contact", link: "/contact" },
    { icon: <BiDetail />, title: "Blogs", link: "/blog" },
  ];

  return (
    <div className="w-full h-full    overflow-y-auto  bg-gray-100 border-gray-300 shadow-sm p-4">
      <div className="space-y-1 pt-3">
        {data.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.link}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-xl
               transition-all duration-200
               ${
                 isActive
                   ? "bg-slate-900 text-white"
                   : "hover:bg-gray-400 hover:-translate-y-[1px]"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors
                  ${
                    isActive
                      ? "bg-sky-600 text-white"
                      : "bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </span>

                <span
                  className={`text-sm font-semibold transition-colors
                  ${
                    isActive
                      ? "text-white"
                      : "text-sky-800 group-hover:text-white"
                  }`}
                >
                  {item.title}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
