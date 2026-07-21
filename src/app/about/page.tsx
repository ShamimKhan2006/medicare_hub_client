import Image from "next/image";
import Link from "next/link";
import { HeartPulse, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#EDE9DD] px-6 py-20">
      {/* Background accents */}
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

        {/* Card */}
        <div className="rounded-[32px] border border-white/50 bg-white/70 p-10 shadow-2xl backdrop-blur-xl">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl">
            <HeartPulse className="h-10 w-10 text-red-500" />
          </div>

          {/* Title */}
          <h1 className="mt-8 text-center text-4xl font-extrabold tracking-tight text-gray-900">
            About MediCare Hub
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-red-600" />

          {/* Description */}
          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-gray-600 leading-relaxed">
            <p>
              MediCare Hub is your trusted platform for connecting with top healthcare
              professionals. We make it easy to find experienced doctors, book
              consultations, and manage your health journey—all in one place.
            </p>
            <p>
              Our mission is to simplify healthcare access by bringing verified
              specialists, transparent pricing, and seamless digital tools to
              patients everywhere.
            </p>
            <p>
              Whether you need a routine checkup or specialized care, MediCare Hub
              ensures you get the right doctor at the right time.
            </p>
          </div>

          {/* Features */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: "Verified Doctors",
                desc: "All listed professionals are thoroughly vetted for your safety.",
              },
              {
                title: "Easy Booking",
                desc: "Find and book appointments in just a few clicks.",
              },
              {
                title: "24/7 Support",
                desc: "Our team is here whenever you need assistance.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="mx-auto mt-10 max-w-xl text-center text-sm text-gray-400">
            Built with care for better health outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
