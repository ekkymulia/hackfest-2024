"use client";
import { auth } from "@/utils/firebase";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from "react";
interface Project {
  id: string;
  title: string;
  description: string;
  status: number;
  wanted_deadline: string;
  target_deadline: string;
}

const ProjectDetail = () => {
  const pathname = usePathname()
  const id = pathname.split("/")[pathname.split("/").length - 1];
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useSessionStorage("user", null);


  const fetchData = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-AppCheck": idToken,
        },
      });

      const responseData = await res.json();
      console.log(responseData.results.data);
      setData(responseData.results.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch project error:", err);
      setError("Error fetching project data");
      setLoading(false);
    }
  };


  useEffect(() => {
      fetchData();
  }, [id]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="p-8 auto-cols-max	 min-w-[50%] flex flex-row">
      <div className="col-span-2 ">
        <h1 className="text-3xl mb-1 font-bold">Project Details</h1>
        <span>Project ID: #PRJ{data.id ? `#PRJ${data.id}` : '-'}</span>

        <div className="my-2 mb-5">
          <h2 className="text-2xl font-semibold my-5">{data.title ? data.title : '-'}</h2>
          <span className="mt-5">Project Brief:</span>
          <h3 className="">{data.description ? data.description : '-'}</h3>
        </div>

        <div className="my-2 mt-5 pt-5 grid grid-cols-12">
          <div className="col-span-4 flex flex-col">
            <span>Wanted Deadline:</span>
            <span>{data.wanted_deadline? data.wanted_deadline : '-'}</span>
          </div>
          <div className="col-span-4 flex flex-col">
            <span>Freelancers Needed:</span>
            <span>{data.asignee_needed ? asignee_needed : '-'}</span>
          </div>
          {/* <div className="col-span-4 flex flex-col">
            <span>Payouts:</span>
            <span>10 Points</span>
          </div> */}
        </div>

        <div className="col-span-4 my-5 flex flex-col">
            <span>Attachment:</span>
            <Button size="sm" isDisabled className="max-w-40 my-2" radius="sm" color="primary">
              Download All Attachments
            </Button> 
        </div>

        <div className="">
          <div className="flex flex-col">
            <Tabs 
              aria-label="Options" 
              className="col-span-6"        
            >
              <Tab key="client" title="Client">        
                <span className="font-bold text-lg my-4">Client Details</span>
                <Card className="px-5 mt-5">
                  <div className="my-5 flex items-center">
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
                    <div className="flex flex-col mx-3">
                      <span>Ekky Mulia Lasardi</span>
                      <span>Joined: 20 Januari 2023</span>
                    </div>
                  </div>
                </Card>
                    
              </Tab>
              <Tab key="notes" title="Briefing Notes">
                <span className="font-bold text-lg my-4">Briefing Notes</span>
                <br />
                <span>No notes so far.</span>

                <div className="my-2 mt-5">
                  <Textarea
                    label="New Briefing Notes"
                    labelPlacement="outside"
                    className="max-w-xs"
                  />
                  <Button size="sm" className="max-w-40 my-2" radius="sm" color="primary">
                    Add Briefing Notes
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </div>  
        </div>

      </div>
      <div className="col-span-1 mx-5 px-5 min-w-[50%]">
        <div className="lg:pl-5">
          <span className="font-bold text-lg my-4">Assignees and Sprints Board</span>

          <div className="flex flex-col">
            <Tabs 
              aria-label="Options" 
              className="col-span-12 mt-1"        
            >
              <Tab key="assignee" title="Assignees">        
                
              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Naufal Rizqullah</TableCell>
                    <TableCell>Developer</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="flex justify-end mt-2">
              <Button size="sm" className="max-w-40 my-2" radius="sm" color="primary">
                Apply to project
              </Button>
              </div>
                    
              </Tab>
              <Tab key="sprint" title="Sprint Board">
                <span className="font-bold text-lg my-4">Sprint Boards</span>
                <br />
                <span>No notes so far.</span>
              </Tab>
            </Tabs>
          </div>  
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
