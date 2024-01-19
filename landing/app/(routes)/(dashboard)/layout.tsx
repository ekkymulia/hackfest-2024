'use client'
import React, { useState } from "react";
import DashboardHeader from "@/components/partials/DashboardHeader";
import Sidebar from "@/components/partials/Sidebar";
import { auth } from "@/utils/firebase";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const [user, setUser] = useSessionStorage("user", null);
  const [userData, setuserData] = useSessionStorage(
    "userdata",
    null
  );

  useEffect(() => {
    checkUser(user.email);
  }, []);

  const checkUser = async (mail: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/users`, {
        method: "POST",
        body: JSON.stringify({ email: mail }),
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-AppCheck": idToken,
        },
      });
  
      const data = await res.json();
      console.log(data)
  
    } catch (err) {
      console.error("Fetch user error:", err);
      // Handle error, show user a message, etc.
    }
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
