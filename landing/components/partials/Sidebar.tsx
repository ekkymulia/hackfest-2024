"use client";
import { cn } from "@/utils/cn";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiBook, BiHome } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import CardSubscription from "../sub/CardSubscription";

const reviewerRoutes = [
  {
    label: "Project Baru",
    icon: BiHome,
    href: "/reviewer/projects",
  },
  {
    label: "Project Saya",
    icon: BiHome,
    href: "/reviewer/myprojects",
  },
];

const clientRoutes = [
  {
    label: "Project Baru",
    icon: BiHome,
    href: "/client/projects",
  },
  {
    label: "Project Saya",
    icon: BiHome,
    href: "/client/myprojects",
  },
];

const workerRoutes = [
  {
    label: "Lihat Project",
    icon: BiHome,
    href: "/worker/projects",
  },
  {
    label: "Project Saya",
    icon: BiHome,
    href: "/worker/myprojects",
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background border-r-1 border-gray-400 dark:border-gray-700 text-foreground">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-6">
          <div className="relative w-24 h-8 mr-4">
            <p>LOGO</p>
          </div>
        </Link>
        <div className="space-y-4">
          <Button
            as={Link}
            color={pathname === "/dashboard" ? "primary" : "default"}
            variant={pathname === "/dashboard" ? "flat" : "light"}
            href="/dashboard"
            className="w-full flex justify-start h-12 mb-4"
          >
            <MdHomeFilled className="h-6 w-6" />
            <p className="text-foreground text-base">Dashboard</p>
          </Button>
          <div>
            <p className="text-sm ml-3">Reviewer Area</p>
            <div>
              {reviewerRoutes.map((route, index) => (
                <Button
                  key={index}
                  as={Link}
                  color={pathname === route.href ? "primary" : "default"}
                  variant={pathname === route.href ? "flat" : "light"}
                  href={route.href}
                  className="w-full flex justify-start h-12 text-base"
                >
                  {React.createElement(route.icon, { className: "h-5 w-5" })}
                  {route.label}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm ml-3">Worker Area</p>
            <div>
              {workerRoutes.map((route, index) => (
                <Button
                  key={index}
                  as={Link}
                  color={pathname === route.href ? "primary" : "default"}
                  variant={pathname === route.href ? "flat" : "light"}
                  href={route.href}
                  className="w-full flex justify-start h-12 text-base"
                >
                  {React.createElement(route.icon, { className: "h-5 w-5" })}
                  {route.label}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm ml-3">Client Area</p>
            <div>
              {clientRoutes.map((route, index) => (
                <Button
                  key={index}
                  as={Link}
                  color={pathname === route.href ? "primary" : "default"}
                  variant={pathname === route.href ? "flat" : "light"}
                  href={route.href}
                  className="w-full flex justify-start h-12 text-base"
                >
                  {React.createElement(route.icon, { className: "h-5 w-5" })}
                  {route.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 flex-2">
        <div className="space-y-1">
          <CardSubscription />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
