import { Button, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const ClientProjectPage = () => {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-5">New Project</h1>
      <form action="" className="flex flex-col gap-2">
        <Input
          labelPlacement="outside"
          placeholder="Project's Name"
          type="text"
          name="Title"
          label="Title"
        />

        <Textarea
          labelPlacement="outside"
          placeholder="Project Description"
          type="text"
          label="Description"
        />

        <Input
          labelPlacement="outside"
          placeholder="Project URL"
          type="text"
          label="URL"
        />
        <label htmlFor="">Project File</label>
        <Input type="file" label="" />
        <div className="flex justify-start items-start">
          <Button as={Link} color="primary" href="/dashboard" className="mt-4">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ClientProjectPage;
