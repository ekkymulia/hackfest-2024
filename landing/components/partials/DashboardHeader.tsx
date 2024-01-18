"use client"
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./SwitchTheme";
import { useSessionStorage } from "@uidotdev/usehooks";
import { auth } from "@/utils/firebase";
import { Button } from "@nextui-org/react";

type UserCardProps = {
  handleLogout?: () => void;
  handleSignIn?: () => void;
  isLoading?: boolean;
};

const DashboardHeader = () => {
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
      <div className="flex gap-2">
        <ModeToggle />
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
