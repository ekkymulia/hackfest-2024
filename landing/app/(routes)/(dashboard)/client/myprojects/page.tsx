import ProjectTable, { Column, Row } from "@/components/sub/TableProjects";
import React from "react";

const myClientCol: Column[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "project_name",
    label: "Name",
  },
  {
    key: "project_description",
    label: "Description",
  },
  {
    key: "url",
    label: "File URL",
  },
  {
    key: "freelancer",
    label: "Freelancer Name",
  },
  {
    key: "action",
    label: "Action",
  },
];

const myClientRow: Row[] = [
  {
    id: "1",
    status: "Active",
    project_name: "Ucup Project",
    project_description: "Ucup Desc",
    url: "ucup.github.com",
    freelancer: "Samsul Alexander",
    action: "Button"
  },

];

const statusColorMap = {
  active: "success",
  paused: "danger",
  finished: "primary",
};



const ClientMyProject = () => {
  return (
    <div className="p-8">
      <h1 className='text-2xl fw-bold mb-5'>Project Saya Yang Berjalan</h1>
      <ProjectTable columns={myClientCol} rows={myClientRow} colorMap={statusColorMap} />
    </div>
  );
};

export default ClientMyProject;
