import { Button } from "@nextui-org/react";
import Link from "next/link";

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
              ThenaWork transforms freelancing with a revolutionary <span className="text-red-600 font-bold"> Freelance-as-a-Service (FaaS) platform.</span> Clients benefit from a straightforward fixed monthly fee for unlimited projects, ensuring simplicity and reliability. Freelancers find stability and growth opportunities, thanks to a potential fixed income source. ThenaWork supports novice freelancers by fostering an inclusive environment, removing barriers related to limited prior experience, and recognizing valuable skills.
              </p>
            </div>
            <div className="md:col-span-5 mt-5">
              <img src="/img-2/tw-logo.png" alt="" className="mx-auto" height={350} width={350} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative isolate px-6 lg:px-8">
        <div className="pb-16">

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Founder</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-12">

            <div className="md:col-span-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                
                <div className="p-5">
                    
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Ekky Mulia Lasardi</h5>

                    <div className="flex items-center justify-center">
                      <img src="/img-2/founder-ekky-2.jpg" alt="" width={300} height={300} className="rounded-xl"/>
                    </div>

                    <p className="mb-3 text-2xl font-semibold mt-2 text-gray-700 dark:text-gray-400 text-center">Hacker</p>

                    <div className="flex justify-center">
                      <a href="https://kymulia.com/" target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          Know more
                          
                      </a>
                    </div>

                </div>
            </div>

            <div className="md:col-span-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                
                <div className="p-5">
                    
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Mochammad Fadiil Thoriq</h5>
                    
                    <div className="flex items-center justify-center">
                      <img src="/img-2/founder-thoriq.jpeg" alt="" width={300} height={300} className="rounded-xl"/>
                    </div>

                    <p className="mb-3 text-2xl font-semibold mt-2 text-gray-700 dark:text-gray-400 text-center">Hustler</p>

                    <div className="flex justify-center">
                      <a href="https://www.fadiilthoriq.tech/" target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          Know more
                          
                      </a>
                    </div>
                </div>
            </div>

            <div className="md:col-span-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
                    
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Naufal Rizqullah Firdaus</h5>

                    <div className="flex items-center justify-center">
                      <img src="/img-2/founder-naufal-2.jpg" alt="" width={300} height={300} className="rounded-xl"/>
                    </div>
                    
                    <p className="mb-3 text-2xl font-semibold mt-2 text-gray-700 dark:text-gray-400 text-center">Hipster</p>

                    <div className="flex justify-center">
                      <a href="https://naufalrf.tech/" target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          Know more
                          
                      </a>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
