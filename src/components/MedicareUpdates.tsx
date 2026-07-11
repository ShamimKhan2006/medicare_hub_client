import React from 'react';
import Image from "next/image";
import { Plus, Clock, User } from "lucide-react";

const news = [
  {
    date: "February 5, 2018",
    author: "Chase Franklin",
    title: "Examination for kids",
    excerpt:
      "Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes and tactical architectures.",
    tags: "Discounts, News",
    comments: 1,
    image: "https://plus.unsplash.com/premium_photo-1673958772145-379691dd6160",
  },
  {
    date: "February 2, 2018",
    author: "Chase Franklin",
    title: "Special offers for clients",
    excerpt:
      "Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications.",
    tags: "Announcements, Discounts",
    comments: 0,
    image: "https://plus.unsplash.com/premium_photo-1664474647299-7ef90322be6c",
  },
  {
    date: "January 30, 2018",
    author: "Chase Franklin",
    title: "New services available",
    excerpt:
      "Credibly reintermediate backend ideas for cross-platform models. Continually reintermediate integrated processes through technically sound intellectual capital.",
    tags: "Announcements",
    comments: 2,
    image: "https://plus.unsplash.com/premium_photo-1666299687146-e71999b46083",
  },
];

const MedicareUpdates = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-800 font-light">Medicare </span>
              <span className="text-red-600 font-extrabold">updates</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
              Read our latest news from the company or general medical news. Feel free 
              to ask questions in comments for any news you find interesting.
            </p>
          </div>

          <button className="shrink-0 bg-gray-900 hover:bg-black transition-colors text-white text-xs font-bold tracking-wide uppercase px-6 py-4 rounded-full">
            View All News
          </button>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, idx) => (
            <article key={idx} className="bg-gray-50">
              {/* Image */}
              <div className="relative w-full h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {/* Plus badge */}
                <div className="absolute -bottom-5 left-6 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-md">
                  <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 pt-9">
                {/* Meta */}
                <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span>/</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    by {item.author}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-gray-900 text-xl font-bold mb-3">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {item.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                  <span className="flex items-center gap-1.5">
                    🏷️ {item.tags}
                  </span>
                  <span className="flex items-center gap-1.5">
                    💬 {item.comments}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MedicareUpdates;