"use client";

import React, { useState } from 'react';
import Image from "next/image";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire this up to your actual newsletter endpoint
    console.log("Subscribing:", email);
    setSubmitted(true);
  };

  return (
    <section className="relative bg-white overflow-hidden py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

        {/* Left: Content */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-20">
          <p className="text-gray-700 text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            Get The Notification
          </p>
          <div className="w-10 h-[3px] bg-red-600 mb-6" />

          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-gray-800 font-light">We have some</span>
            <br />
            <span className="text-red-600 font-extrabold">Good news</span>
          </h2>

          <p className="text-gray-600 text-base leading-relaxed max-w-md mb-8">
            Sign up for Medicare newsletter to receive all the new offers and 
            discounts from Medicare clinic. Discounts are only valid four our 
            newsletter subscribers.
          </p>

          {submitted ? (
            <p className="text-emerald-600 font-semibold text-sm">
              Thanks for subscribing! Check your inbox to confirm.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-lg"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type in your email address"
                className="flex-1 bg-gray-100 rounded-full px-6 py-4 text-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 transition-colors text-white text-xs font-bold tracking-wide uppercase px-8 py-4 rounded-full whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Right: Image */}
        <div className="relative min-h-[200px] ">
          <Image
            src="https://plus.unsplash.com/premium_photo-1663013439760-cb73ca606ae1"
            alt="Nurse assisting patient"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default NewsletterSection;