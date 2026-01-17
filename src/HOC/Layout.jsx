import React from "react";
import Header from "../Component/Navigation/Header";
import Sidebar from "../Component/Navigation/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="flex flex-row   h-[calc(100vh-5rem)]   " >
         <aside className=" w-72 h-full  ">
          <Sidebar />
        </aside>
        <main className=" w-full  overflow-y-auto   p-10">
          <Outlet  />
        </main>
      </div>
    </div>
  );
}

export default Layout;



