"use client";
import { auth } from "@/utils/firebase";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
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

interface Project {
  id: string;
  title: string;
  description: string;
  status: number;
}

const DashboardPage = () => {

  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken(
          /* forceRefresh */ true
        );
        const res = await fetch("http://localhost:8000/api/v1/projects", {
          headers: {
            "Content-Type": "application/json",
            "X-Firebase-AppCheck": idToken || "",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        setData(json.results.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderCell = (item: Project, columnKey: string) => {
    switch (columnKey) {
      case "title":
        return item.title;
      case "description":
        return item.description;
      case "status":
        return item.status === 1 ? "Active" : "Inactive";
      default:
        return "";
      case "action":
        return (
          <div className="flex justify-center">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              View
            </button>
          </div>
        );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
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
      <Table className="px-12" aria-label="Example static collection table" color="primary"
        selectionMode="multiple" >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.status === 1 ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    View
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default DashboardPage;
