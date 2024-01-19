"use client"
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./SwitchTheme";
import { useSessionStorage } from "@uidotdev/usehooks";
import { auth } from "@/utils/firebase";
import { Button } from "@nextui-org/react";
import LoginPath from "./LoginPath";

type LoginButton = {
  handleLogout?: () => void;
  handleSignIn?: () => void;
  isLoading?: boolean;
};

type DashboardHeaderProps = {
  toggleMobileSidebar: () => void;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleMobileSidebar }) => {
  const [user, setUser] = useSessionStorage("user", null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSession, setLoginSession] = useSessionStorage(
    "loginsession",
    null
  );

  const handleLogout = async () => {
    try {
      await auth
        .signOut()
        .then(() => {
          setIsLoading(true);
          setUser(null);
          setLoginSession(null);
        })
        .then(() => {
          window.location.href = "/";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-end items-center p-4 bg-background border-b-1 border-gray-400 dark:border-gray-700">
      <div className="flex gap-2 mr-auto">
        <Button
            color="default"
            className="md:hidden"
            onClick={toggleMobileSidebar}
          >
          ☰
        </Button>
      </div>   
      <div className="flex gap-2">
        <ModeToggle />
        <LoginPath />
      </div>
    </div>
  );
};

export default DashboardHeader;
