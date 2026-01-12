import React from "react";
import Header from "../Component/Navigation/Header";
import Sidebar from "../Component/Navigation/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />

      <div className="flex flex-row   h-[calc(100vh-4rem)] " >
        <Sidebar  />
        <main className=" w-full m-10">
          <Outlet  />
        </main>
      </div>
    </div>
  );
}

export default Layout;
