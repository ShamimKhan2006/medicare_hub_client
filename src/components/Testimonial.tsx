import React from 'react';
import Image from "next/image";
import { Quote, Mail } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Laraine Flemming",
    role: "CBR",
    quote:
      "Professionals in their work, the surgery went well and I was able to go on with my life within just a few weeks. Recommended!",
    image: "https://plus.unsplash.com/premium_photo-1661341423936-40b48564a5bf",
  },
  {
    name: "Herbie Haynes",
    role: "Valve Prolapse Repair",
    quote:
      "I am deeply grateful to Dr. Chase for his expertise and care. He practices both the science and the art of cardiac surgery.",
    image: "https://images.unsplash.com/photo-1722969909962-fb17a0023166",
  },
  {
    name: "William Smithi",
    role: "TMR",
    quote:
      "I felt like 102 before, now I feel like 52, thanks to Dr. Chase and his team. Their expertise is second to none!",
    image: "https://plus.unsplash.com/premium_photo-1661590863910-69abf33b8f3f",
  },
  {
    name: "Ellen Norton",
    role: "Pacemaker Implantation",
    quote:
      "They gave me much more than health - they gave me my life back. One that I can still enjoy with my family and grandchildren.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  },
];

const PatientTestimonials = () => {
  return (
    <section className="relative overflow-hidden bg-red-600 py-20 px-6">
      {/* Decorative background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -right-40 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,white,transparent_60%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="flex flex-col items-center mb-4">
          <p className="text-white/90 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
            A Good Word Means A Lot
          </p>
          <div className="w-8 h-[2px] bg-white/70 mt-3" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-white font-light">Patient </span>
          <span className="text-black font-extrabold">testimonials</span>
        </h2>

        {/* Subheading */}
        <p className="text-white/90 text-sm md:text-base mb-14 max-w-xl mx-auto">
          It's always the word of mouth that's the best advice. Here are some of our...
        </p>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {testimonials.map((t, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              {/* Avatar with quote badge */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 relative">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" fill="white" />
                </div>
              </div>

              {/* Quote text */}
              <p className="text-white text-sm leading-relaxed mb-6 px-2">
                {t.quote}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/20 mb-4" />

              {/* Name & role */}
              <p className="text-white font-bold text-sm tracking-wide uppercase">
                {t.name}
              </p>
              <p className="text-white/80 text-xs mt-1">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe bar */}
      <div className="relative flex justify-end mt-14 max-w-6xl mx-auto">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-xs md:text-sm font-semibold px-6 py-4 rounded-md">
          <Mail className="w-4 h-4" />
          Never Miss New Launches! Subscribe!
        </button>
      </div>
    </section>
  );
};

export default PatientTestimonials;