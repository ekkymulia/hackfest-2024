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
        </div>
    </section>
  );
};

export default FeatureSection;
