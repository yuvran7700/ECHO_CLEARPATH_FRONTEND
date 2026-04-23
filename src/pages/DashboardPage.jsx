import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNav from "../components/SharedComponents/DashboardNavBar";
import DashboardHeader from "../components/SharedComponents/DashboardHeader";

const DashboardLayout = () => {

  return (
    <div>
      <DashboardNav />   
      <DashboardHeader /> 
      <main className="content-area mx-auto px-6 pb-20">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout