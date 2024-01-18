'use client'
import ProjectTable, { Column, Row } from "@/components/sub/TableProjects";
import { auth } from "@/utils/firebase";
import React, { useEffect, useState } from "react";

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

const statusColorMap = {
  active: "success",
  paused: "danger",
  finished: "primary",
};

const ClientMyProject = () => {
  const [myClientRow, setMyClientRow] = useState<Row[]>([]);

  const fetchStatus = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/projects/`, {
        method: 'GET',
        body: JSON.stringify({ owner_id: user.uid }),
        headers: {
          'Content-Type': 'application/json',
          'X-Firebase-AppCheck': idToken,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      console.log(data);

      const mappedData = data.results.data.map(item => ({
        id: item.id ?? '',
        status: item.status ?? '',
        project_name: item.title ?? '',
        project_description: item.description ?? '',
        url: item.url ?? '',
        freelancer: item.freelancer ?? '',
        action: "Button",
      }));

      setMyClientRow(mappedData);
    } catch (err) {
      console.error('Fetch user error:', err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="p-8">
      <h1 className='text-2xl fw-bold mb-5'>Project Saya Yang Berjalan</h1>
      {
        myClientRow && (
          <ProjectTable columns={myClientCol} rows={myClientRow} colorMap={statusColorMap} />
        )
      }
    </div>
  );
};

export default ClientMyProject;
