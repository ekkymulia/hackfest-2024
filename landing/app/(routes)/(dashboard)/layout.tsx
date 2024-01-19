"use client"
import DashboardHeader from "@/components/partials/DashboardHeader";
import Sidebar from "@/components/partials/Sidebar";
import React, { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="relative bg-background h-full">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar />
      </div>
      <div className="md:pl-64">
        <DashboardHeader toggleMobileSidebar={toggleMobileSidebar} />
        {/* Conditionally render the Sidebar based on mobile sidebar visibility */}
        {isMobileSidebarOpen && <Sidebar />}
        {children}
      </div>
    </div>
  );
}
