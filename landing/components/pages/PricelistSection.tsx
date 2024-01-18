import { Button } from "@nextui-org/react";
import React from "react";

const PricelistSection = () => {
  return (
    <section>
      <div className="container m-auto px-6 py-20 md:px-12 lg:px-20">
        <div className="m-auto text-center lg:w-8/12 xl:w-7/12">
          <h2 className="text-2xl text-foreground font-bold md:text-4xl">
            A Tailus Blocks subscription gives you access to our components and
            more.
          </h2>
        </div>
        <div className="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12">
          <div className="relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12">
            <div
              aria-hidden="true"
              className="absolute top-0 w-full h-full rounded-2xl background shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
            ></div>
            <div className="relative p-6 space-y-6 lg:p-8">
              <h3 className="text-3xl text-muted-primary font-semibold text-center">
                Organisation
              </h3>
              <div>
                <div className="relative flex justify-around">
                  <div className="flex items-end">
                    <span className="text-8xl text-muted-foreground font-bold leading-0">
                      35
                    </span>
                    <div className="pb-2">
                      <span className="block text-2xl text-muted-primary font-bold">
                        %
                      </span>
                      <span className="block text-xl text-primary font-bold">
                        Off
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <ul
                role="list"
                className="w-max space-y-4 py-6 m-auto text-muted-foreground"
              >
                <li className="space-x-2">
                  <span className="text-primary font-semibold">✓</span>
                  <span>First premium advantage</span>
                </li>
                <li className="space-x-2">
                  <span className="text-primary font-semibold">✓</span>
                  <span>Second advantage weekly</span>
                </li>
                <li className="space-x-2">
                  <span className="text-primary font-semibold">✓</span>
                  <span>Third advantage donate to project</span>
                </li>
              </ul>

              <Button
                type="submit"
                title="Submit"
                color="primary"
                className="w-full"
              >
                <span className="text-white font-semibold">
                  Send us an email
                </span>
              </Button>
            </div>
          </div>

          <div className="relative group md:w-6/12 lg:w-7/12">
            <div
              aria-hidden="true"
              className="absolute top-0 w-full h-full rounded-2xl background shadow-lg transition duration-500 group-hover:scale-105"
            ></div>
            <div className="relative p-6 pt-16 md:p-8 md:pl-12 md:rounded-r-2xl lg:pl-20 lg:p-16">
              <ul role="list" className="space-y-4 py-6 text-muted-foreground">
                <li className="space-x-2">
                  <span className="text-primary font-semibold">✓</span>
                  <span>First premium advantage</span>
                </li>
                <li className="space-x-2">
                  <span className="text-primary font-semibold">✓</span>
                  <span>Second advantage weekly</span>
                </li>
                <li className="space-x-2">
                  <span className="text-primary font-semibold">✓</span>
                  <span>Third advantage donate to project</span>
                </li>
                <li className="space-x-2">
                  <span className="text-primary font-semibold">✓</span>
                  <span>Fourth, access to all components weekly</span>
                </li>
              </ul>
              <p className="text-muted-primary">
                Team can be any size, and you can add or switch members as
                needed. Companies using our platform include:
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricelistSection;
