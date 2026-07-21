"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire to your contact endpoint
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message sent! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#EDE9DD] px-6 py-20">
      <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-red-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 text-sm font-semibold text-red-600 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left: Info */}
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Contact Us</h1>
              <div className="mt-4 h-1 w-14 rounded-full bg-red-600" />
              <p className="mt-5 text-gray-600 leading-relaxed">
                Have questions or need help? Reach out and our team will respond
                within 24 hours.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Mail size={18} />
                  </span>
                  support@medicarehub.com
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Phone size={18} />
                  </span>
                  +880 1234-567890
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <MapPin size={18} />
                  </span>
                  Dhaka, Bangladesh
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-red-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-red-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-red-500"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-red-600/25 transition-all hover:bg-red-700 active:scale-[0.99] disabled:opacity-60"
              >
                <Send size={16} />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
