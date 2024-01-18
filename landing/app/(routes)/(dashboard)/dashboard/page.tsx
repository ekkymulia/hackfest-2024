"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaBarsProgress } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";

const dataWidget = [
  {
    title: "Total Projects",
    count: 12300,
    icon: AiOutlineFundProjectionScreen,
  },
  {
    title: "On Progress Projects",
    count: 12300,
    icon: FaBarsProgress,
  },
  {
    title: "Freelancer Registered",
    count: 12300,
    icon: GrUserWorker,
  },
];

const DashboardPage = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-4 p-12">
      {dataWidget.map((item, index) => (
        <div key={index} className="col-span-4">
          <Card className="w-full">
            <CardHeader className="flex gap-3">
              {React.createElement(item.icon, { className: "h-5 w-5" })}
              <div className="flex flex-col">
                <p className="text-xl font-bold">{item.title}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-lg">{item.count}</p>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
