"use client"
import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const page = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-12">
      <div className="col-span-4">
        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-xl font-bold">Total Projects</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-lg">12300</p>
          </CardBody>
        </Card>
      </div>

      <div className="col-span-4">
        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-xl font-bold">Total Sedang Dikerjakan</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-lg">12300</p>
          </CardBody>
        </Card>
      </div>

      <div className="col-span-4">
        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-xl font-bold">Total Freelancer</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-lg">12300</p>
          </CardBody>
        </Card>
      </div>
    </div>

  )
}

export default page