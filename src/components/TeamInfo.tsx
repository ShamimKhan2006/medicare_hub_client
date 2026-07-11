import React from 'react';
import Image from "next/image";
import { Users, Heart } from "lucide-react";

const TeamIntro = () => {
  return (
    <section className=" from-gray-50 via-white to-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Doctor Image */}
        <div className="relative w-full h-[1200px] lg:h-[1000px]">
          <Image
            src="https://images.unsplash.com/photo-1620928269189-dc4ee9d981c0?"
            alt="Chase Franklin - Founder & CEO"
            fill
            className="object-contain object-bottom"
          />
        </div>

        {/* Right: Content */}
        <div>
          {/* Eyebrow */}
          <p className="text-gray-700 text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            Introducing Our Team
          </p>
          <div className="w-10 h-[3px] bg-red-600 mb-6" />

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-red-600">Great passion</span>
            <br />
            <span className="text-gray-800 font-light">for healing</span>
          </h2>

          {/* Paragraph */}
          <p className="text-gray-600 text-base leading-relaxed max-w-lg mb-10">
            Some up and coming trends are healthcare consolidation for independent 
            healthcare centers that see a cut in unforeseen payouts. High deductible 
            health plans are also expected to transpire along with a growth of 
            independent practices.
          </p>

          {/* Signature block */}
          <div className="flex items-center justify-between max-w-md mb-8">
            <div>
              <p className="text-red-600 font-bold text-sm tracking-wide uppercase">
                Chase Franklin
              </p>
              <p className="text-gray-500 text-sm">Founder &amp; CEO</p>
            </div>
  
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200 mb-8" />

          {/* Feature columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
                <Users className="w-7 h-7 text-red-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm tracking-wide uppercase mb-2">
                  Professional Team
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Globally harness multimedia based collaboration and idea-sharing 
                  with backend products. Continually whiteboard superior opportunities.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
                <Heart className="w-7 h-7 text-red-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm tracking-wide uppercase mb-2">
                  Services And Technology
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Leverage agile frameworks to provide a robust synopsis for high 
                  level overviews. Iterative approaches to corporate strategy foster 
                  collaborative thinking.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeamIntro;