import React from "react";
import { ModeToggle } from "./SwitchTheme";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const DashboardHeader = () => {
  return (
    <div className="flex justify-end items-center p-4 bg-background border-b-1 border-gray-400 dark:border-gray-700">
      <div className="flex gap-2">
        <ModeToggle />
        <Button color="primary">Logout</Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
