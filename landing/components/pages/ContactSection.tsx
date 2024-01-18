import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Input } from "@nextui-org/react";

export default function ContactSection() {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="relative isolate">
        <div className="pb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl text-center">
            Contact
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-6 mt-5">
              <form className="mt-5">
                <div className="mb-5">
                  <label className="block mb-2 text-xl font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className=" text-foreground text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block mb-2 text-xl font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    type="text"
                    id="password"
                    className=" text-foreground text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Let us know what you want."
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block mb-2 text-xl font-medium text-foreground">
                    Description
                  </label>
                  <Input
                    type="text"
                    id="desc"
                    className=" text-foreground text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a description."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  color="primary"
                >
                  Submit
                </Button>
              </form>
            </div>
            <div className="md:col-span-6 mt-5 flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4684318422737!2d106.80392767370566!3d-6.588548814403524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d2e602b501%3A0x25a12f0f97fac4ee!2sSchool%20of%20Vocational%20Studies%20-%20IPB%20University!5e0!3m2!1sen!2sid!4v1705476906446!5m2!1sen!2sid"
                className="rounded-2xl"
                width="500"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
