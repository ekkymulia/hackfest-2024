import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface FounderCardProps {
  name: string;
  imageSrc: string;
  title: string;
  link: string;
}

const FounderCard: React.FC<FounderCardProps> = ({
  name,
  imageSrc,
  title,
  link,
}) => (
  <div className="md:col-span-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="p-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {name}
      </h5>

      <div className="flex items-center justify-center">
        <img
          src={imageSrc}
          alt="Founder Image"
          width={300}
          height={300}
          className="rounded-xl"
        />
      </div>

      <p className="mb-3 text-2xl font-semibold mt-2 text-gray-700 dark:text-gray-400 text-center">
        {title}
      </p>

      <div className="flex justify-center">
        <Button as={Link} href={link} color="primary">
          Know more
        </Button>
      </div>
    </div>
  </div>
);

export default FounderCard;
