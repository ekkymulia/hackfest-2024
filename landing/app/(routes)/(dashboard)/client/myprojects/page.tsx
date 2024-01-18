"use client";
import { auth } from "@/utils/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSessionStorage } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
interface Project {
  id: string;
  title: string;
  description: string;
  status: number;
  wanted_deadline: string;
  target_deadline: string;
}

const ClientMyProject = () => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useSessionStorage("user", null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken(
          /* forceRefresh */ true
        );
        const res = await fetch("http://localhost:8000/api/v1/projects?owner_id=" + user.uid, {
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
      case "wanted_deadline":
        return item.wanted_deadline;
      case "target_deadline":
          return item.target_deadline;
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
    <section className="p-8">
      
      <h1 className="text-3xl mb-5 font-bold">Owned Project Lists</h1>

      <Table aria-label="Example static collection table" color="primary"
        selectionMode="multiple" >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Wanted Deadline</TableColumn>
          <TableColumn>Actual Deadline</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.status === 1 ? "Active" : "Inactive"}</TableCell>              
              <TableCell>{item.wanted_deadline}</TableCell>
              <TableCell>{item.target_deadline}</TableCell>
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

export default ClientMyProject;
