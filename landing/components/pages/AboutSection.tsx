import { Button } from "@nextui-org/react";
import Link from "next/link";
import FounderCard from "../sub/FounderCard";

interface Founder {
  name: string;
  imageSrc: string;
  title: string;
  link: string;
}

const foundersData: Founder[] = [
  {
    name: "Ekky Mulia Lasardi",
    imageSrc: "/img-2/founder-ekky-2.jpg",
    title: "Hacker",
    link: "https://kymulia.com/",
  },
  {
    name: "Mochammad Fadiil Thoriq",
    imageSrc: "/img-2/founder-thoriq.jpeg",
    title: "Hustler",
    link: "https://www.fadiilthoriq.tech/",
  },
  {
    name: "Naufal Rizqullah Firdaus",
    imageSrc: "/img-2/founder-naufal-2.jpg",
    title: "Hipster",
    link: "https://naufalrf.tech/",
  },
];

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="relative isolate pt-14">
        <div className="pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 mt-5">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                What is ThenaWork?
              </h1>
              <p className="mt-3 text-justify">
                ThenaWork transforms freelancing with a revolutionary{" "}
                <span className="text-primary font-bold">
                  {" "}
                  Freelance-as-a-Service (FaaS) platform.
                </span>{" "}
                Clients benefit from a straightforward fixed monthly fee for
                unlimited projects, ensuring simplicity and reliability.
                Freelancers find stability and growth opportunities, thanks to a
                potential fixed income source. ThenaWork supports novice
                freelancers by fostering an inclusive environment, removing
                barriers related to limited prior experience, and recognizing
                valuable skills.
              </p>
            </div>
            <div className="md:col-span-5 mt-5">
              <img
                src="/img-2/tw-logo.png"
                alt=""
                className="mx-auto"
                height={350}
                width={350}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative isolate px-6 lg:px-8">
        <div className="pb-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Founder
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-12">
            {foundersData.map((founder, index) => (
              <FounderCard key={index} {...founder} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
