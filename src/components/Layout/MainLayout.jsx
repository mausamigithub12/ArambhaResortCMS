import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Header />

      <div className="flex flex-row   h-[calc(100vh-4rem)] " >
        <Sidebar  />
        <main className="bg-red-200 w-full m-10">
          <Outlet  />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
