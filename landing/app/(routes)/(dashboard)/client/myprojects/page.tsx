import ProjectTable, { Column, Row } from "@/components/sub/TableProjects";
import React from "react";

const myClientCol: Column[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "owner_id",
    label: "OWNER ID (User)",
  },
  {
    key: "asignee_needed",
    label: "ASIGNEE NEEDED (int)",
  },
  {
    key: "asignee",
    label: "ASIGNEE (User[])",
  },
  {
    key: "submission",
    label: "SUBMISSION (SubmissionModel[])",
  },
];

const myClientRow: Row[] = [
  {
    id: "1",
    status: "Active",
    owner_id: "User1",
    asignee_needed: 2,
    asignee: ["User2", "User3"],
    submission: ["Submission1", "Submission2"],
  },
  {
    id: "2",
    status: "Paused",
    owner_id: "User4",
    asignee_needed: 1,
    asignee: ["User5"],
    submission: ["Submission3"],
  },
  {
    id: "3",
    status: "Finished",
    owner_id: "User6",
    asignee_needed: 1,
    asignee: ["User7"],
    submission: ["Submission4"],
  },
];

const ClientMyProject = () => {
  return (
    <div className="p-8">
      <ProjectTable columns={myClientCol} rows={myClientRow} />
    </div>
  );
};

export default ClientMyProject;
