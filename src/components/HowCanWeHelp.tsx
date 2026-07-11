import React from 'react';
import { ChevronDown, HeartPulse, Briefcase, HeartHandshake } from "lucide-react";

const services = [
  {
    icon: HeartPulse,
    title: "Heart surgery",
    description:
      "Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes.",
  },
  {
    icon: Briefcase,
    title: "Heart transplant",
    description:
      "Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverable applications.",
  },
  {
    icon: HeartHandshake,
    title: "Valve diseases",
    description:
      "Continually reintermediate integrated processes through technically sound intellectual capital. Holistically foster superior methodologies.",
  },
];

const HowCanWeHelp = () => {
  return (
    <section className="bg-white py-16 px-6 border-t">
      <div className="max-w-6xl mx-auto">

        {/* Top: heading + booking card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 mb-16">

          {/* Left column */}
          <div>
            <p className="text-gray-700 text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              Services At One Glance
            </p>
            <div className="w-10 h-[3px] bg-red-600 mb-6" />

            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-gray-800 font-light">How can we</span>
              <br />
              <span className="text-red-600">Help you?</span>
            </h2>

            <p className="text-gray-600 text-base leading-relaxed max-w-xl">
              Credibly innovate granular internal or "organic" sources whereas high 
              standards in web-readiness. Energistically scale future-proof core 
              competencies vis-a-vis impactful experiences. Dramatically synthesize 
              integrated schemas with optimal networks.
            </p>
          </div>

          {/* Right column: booking card */}
          <div className="border border-gray-200 rounded-md p-8 h-fit">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Book Within Minutes
            </p>
            <div className="w-8 h-[2px] bg-red-600 mb-4" />

            <h3 className="text-red-600 font-extrabold text-2xl mb-4">
              Consult our doctors
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Select the doctor you prefer to get a checkup and book a visit with 
              them in a matter of minutes. Simply select from the list below.
            </p>

            <button className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors rounded-md px-5 py-4 text-gray-800 font-bold text-xs tracking-wide uppercase">
              Choose A Doctor
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom: 3 service columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center px-8 py-8 sm:py-0">
                <Icon className="w-20 h-20 text-red-600 mb-6" strokeWidth={1} />
                <h3 className="text-gray-900 text-2xl font-semibold mb-2">
                  {service.title}
                </h3>
                <div className="w-8 h-[2px] bg-red-600 mb-4" />
                <p className="text-gray-500 text-sm leading-relaxed max-w-[260px]">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowCanWeHelp;