'use client';
import { auth } from '@/utils/firebase';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useSessionStorage } from '@uidotdev/usehooks';
import React, { ChangeEvent, useEffect, useState } from 'react';

const ReviewerProjectPage = () => {
  const [projectStatus, setProjectStatus] = useState([]);
  const [userData, setuserData] = useSessionStorage(
    "userdata",
    null
  );

  const fetchStatus = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/projects/projectstatus`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Firebase-AppCheck': idToken,
        },
      });

      const data = await res.json();

      console.log(data);

      const mappedData = data.results.map(item => ({
        label: item.name,
        value: item.id,
        description: "",
      }));
      
      setProjectStatus(mappedData);
    } catch (err) {
      console.error('Fetch user error:', err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []); // Pass an empty dependency array

  const [projectForm, setprojectForm] = useState({
    owner_id: userData.id,
    title: '',
    description: '',
    wanted_deadline: '', 
    target_deadline: ''
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setprojectForm((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log(projectForm)

    try{
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/projects`, {
        method: "POST",
        body: JSON.stringify(projectForm),
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-AppCheck": idToken,
        },
      });

      const data = await res.json();
      console.log(data)

      if (data.success) {
        console.log('success')
      }
    } catch(err){
      console.error("Fetch user error:", err);
    }
  }



  return (
    <div className="m-12">
      <h1 className="text-2xl fw-bold mb-5">Tambah Project Baru</h1>
      <form>
      <label htmlFor="">Pilih Status</label>
        <Select
          items={projectStatus}
          className="mb-4"
          placeholder='Pilih Status'
          name="status" // Provide a meaningful name
          onChange={handleInputChange}
        >
          {(ps) => <SelectItem key={ps.value}>{ps.label}</SelectItem>}
        </Select>
        <label htmlFor="">Title Project</label>
        <Input type="text" name="title" label="Isi Judul Project Baru" className="mb-4" onChange={handleInputChange} />

        <label htmlFor="">Description</label>
        <Textarea type="text" name='description' label="Description" className="mb-4" onChange={handleInputChange}/>

        <label htmlFor="">Estimasi Deadline</label>
        <Input type="date" name="wanted_deadline" className="mb-4" onChange={handleInputChange} />

        <label htmlFor="">Target Deadline</label>
        <Input type="date" name="target_deadline" className="mb-4" onChange={handleInputChange}/>

        {/* <label htmlFor="">Berkas Pendukung</label>
        <Input type="file" name="projectFile" label="" className="mb-4" onChange={handleInputChange}/> */}

        <Button type="button" onClick={handleSubmit} className="my-4" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ReviewerProjectPage;
