import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const FeatureSection = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <h1 className="text-6xl font-bold text-green-500 text-center">Pricelist</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-4 mt-5">

          <Card className="col-span-4 py-8">
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
              <h4 className="font-bold text-2xl text-center">Starter Plan</h4>
              <h4 className="font-bold text-8xl text-center mt-5 text-green-500">$49</h4>
              <p>/month</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center mt-5">
              <p>Unlimited Basic Projects</p>

              <p>Streamlined Hiring</p>

              <p>Reliability Assurance</p>
            </CardBody>
          </Card>

          <Card className="col-span-4 py-8">
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
              <h4 className="font-bold text-2xl text-center">Business Plan</h4>
              <h4 className="font-bold text-8xl text-center mt-5 text-green-500">$99</h4>
              <p>/month</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center mt-5">
              <p>Enhanced Project Scope</p>

              <p>Priority Support</p>

              <p>Exclusive Promotions</p>
            </CardBody>
          </Card>

          <Card className="col-span-4 py-8">
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
              <h4 className="font-bold text-2xl text-center">Enterprise Plan</h4>
              <h4 className="font-bold text-8xl text-center mt-5 text-green-500">$199</h4>
              <p>/month</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center mt-5">
              <p>Premium Freelancer Pool</p>

              <p>Customized Solutions</p>

              <p>Strategic Account Management</p>
            </CardBody>
          </Card>

          {/* <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt="Party"
              src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">Grow your audience</h2>

            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
              hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
              minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
            </p>

            <Button as={Link} href="#" color={"primary"} className="mt-4">
              Get Started Today
            </Button>
          </div> */}
        </div>
    </section>
  );
};

export default FeatureSection;
