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
  Input,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { set } from "firebase/database";
import { usePathname } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from "react";
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useSessionStorage("user", null);
  const [userData, setUserData] = useSessionStorage("userdata", null);
  const [isEditing, setIsEditing] = useState(false);
  const [ProjectForm, setProjectForm] = useState({
    owner_id: userData.id,
    title: '',
    description: '',
    wanted_deadline: '' ,
    target_deadline: '',
    asignee_needed: '',
    status: '',
    asignee: [],
    asignee_uid: [],
    submission: [],
  });

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
      setProjectForm((prevProjectForm) => ({
        ...prevProjectForm,
        owner_id: responseData.results.data.owner_id || '',
        status: responseData.results.data.status || '',
        asignee: responseData.results.data.asignee || [],
        asignee_uid: responseData.results.data.asignee_uid || [],
        asignee_needed: responseData.results.data.asignee_needed || 0,
        description: responseData.results.data.description || '',
        target_deadline: responseData.results.data.target_deadline || '',
        title: responseData.results.data.title || '',
        wanted_deadline: responseData.results.data.wanted_deadline || '',
      }));
  
      console.log(ProjectForm)
      setLoading(false);
    } catch (err) {
      console.error("Fetch project error:", err);
      setError("Error fetching project data");
      setLoading(false);
    }
  };

  const updateData = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/projects/${id}`, {
        method: "Put",
        body: JSON.stringify(ProjectForm),
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

  const handleApplytoProject = async () => {
    const updatedProjectForm = {
      ...ProjectForm,
      asignee_uid: [...ProjectForm.asignee_uid, userData.id],
    };

    console.log(updatedProjectForm)
    try{
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProjectForm),
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-AppCheck": idToken,
        },
      });

      const responseData = await res.json();
      console.log(responseData.results.project);
      setData(responseData.results.project);
      setProjectForm((prevProjectForm) => ({
        ...prevProjectForm,
        owner_id: responseData.results.project.owner_id || '',
        status: responseData.results.project.status || '',
        asignee: responseData.results.project.asignee || [],
        asignee_needed: responseData.results.project.asignee_needed || 0,
        asignee_uid: responseData.results.project.asignee_uid || [],
        description: responseData.results.project.description || '',
        target_deadline: responseData.results.project.target_deadline || '',
        title: responseData.results.project.title || '',
        wanted_deadline: responseData.results.project.wanted_deadline || '',
      }));
      setLoading(false);
    }catch (err) {
      console.error("Fetch project error:", err);
      setError("Error fetching project data");
      setLoading(false);
    }
  }

  const handleUpdate = async () => {
    try {
      setIsEditing(true);

    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      console.log(ProjectForm)
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const update = await updateData();
      setIsEditing(false);
      fetchData();

    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProjectForm((prevProjectForm) => ({ ...prevProjectForm, [name]: value }));
  }


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
   <>
    {
      data ? (
        <section className="p-8 auto-cols-max	 min-w-[50%] flex flex-row">
          <div className="col-span-2 ">
            {
              isEditing ? 
              (   
                <Button size="sm" className="max-w-40 my-2" radius="sm" color="primary" onClick={handleUpdatePost}>
                  Save Editing
                </Button>
            ) : (
                <Button size="sm" className="max-w-40 my-2" radius="sm" color="primary" onClick={handleUpdate}>
                  Edit Project
                </Button>
              )
            }
            <h1 className="text-3xl mb-1 font-bold">Project Details</h1>
            <span>Project ID: #PRJ{data.id ? `${data.id}` : '-'}</span>

            <div className="my-2 mb-5">
              {
                isEditing ? (
                  <Input size={'md'} variant="underlined" type="text" className='col-span-6 max-w-md' value={ProjectForm.title} name='title' onChange={handleInputChange} label="Project Title" placeholder="Enter your project title" />
                ) : (
                  <h2 className="text-2xl font-semibold my-5">{data.title ? data.title : '-'}</h2>
                )
              }
              <span className="mt-5">Project Brief:</span>
              {
                isEditing ? (
                  <Textarea
                    label="Project Brief"
                    labelPlacement="outside"
                    className="max-w-xs"
                    value={ProjectForm.description}
                    name='description'
                    onChange={handleInputChange}
                  />
                ) : (
                  <h3 className="">{data.description ? data.description : '-'}</h3>
                )
              }
            </div>

            <div className="my-2 mt-5 pt-5 grid grid-cols-12">
              <div className="col-span-4 flex flex-col">
                <span>Wanted Deadline:</span>
                {
                  isEditing ? (
                    <Input size={'md'} type="date" className='col-span-6 max-w-md' value={ProjectForm.wanted_deadline} name='wanted_deadline' onChange={handleInputChange} />
                  ) : (
                    <span>{data.wanted_deadline? data.wanted_deadline : '-'}</span>
                  )
                }
              </div>
              <div className="col-span-4 flex flex-col">
              <span>Target Deadline:</span>
                {
                  isEditing ? (
                    <Input size={'md'} type="date" className='col-span-6 max-w-md' value={ProjectForm.target_deadline} name='target_deadline' onChange={handleInputChange} />
                  ) : (
                      <span>{data.target_deadline ? data.target_deadline : '-'}</span>
                  )
                }
              </div>
              <div className="col-span-4 flex flex-col">
                <span>Freelancers Needed:</span>
                {
                  isEditing ? (
                    <Input size={'md'} type="number" className='col-span-6 max-w-md' value={ProjectForm.asignee_needed} name='asignee_needed' onChange={handleInputChange} />
                  ) : (
                    <span>{data.asignee_needed ? data.asignee_needed : '-'}</span>
                  )
                }
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
                      <TableColumn>Email</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        data.asignee.length > 0 ? (
                          data.asignee.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>Freelancer</TableCell>
                              <TableCell>{item.email}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell>No Assignee</TableCell>
                            <TableCell>No Assignee</TableCell>
                            <TableCell>No Assignee</TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>

                  {
                    userData.role == 3 && !data.asignee_uid.includes(userData.id) ? (
                    <div className="flex justify-end mt-2">
                    <Button size="sm" className="max-w-40 my-2" radius="sm" color="primary" onClick={handleApplytoProject}>
                      Apply to project
                    </Button>
                    </div>
                    ) : ('')
                  }
                  
                        
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
      ) : ('Loading...')
    }
   </>
  );
};

export default ProjectDetail;
