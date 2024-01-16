"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button isIconOnly variant="ghost" onClick={toggleTheme}>
      {theme === "light" ? (
        <MdOutlineDarkMode className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <MdOutlineLightMode className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
