import Link from "next/link";
import { ArrowLeft, HeartPulse, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#EDE9DD] px-6">
      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-red-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-3xl rounded-[32px] border border-white/50 bg-white/60 p-10 shadow-2xl backdrop-blur-xl">
        {/* Heart Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FFFEFE] shadow-xl">
          <HeartPulse className="h-12 w-12 animate-pulse text-red-500" />
        </div>

        {/* 404 */}
        <h1 className="mt-8 text-center text-8xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-center text-3xl font-bold text-red-600">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-center text-gray-600 leading-7">
          Sorry, the page you are looking for does not exist or may have been
          moved. Do not worry—you can always return to the homepage or explore
          our doctors.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-[#FFFEFE] px-7 py-3 font-semibold text-red-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <Link
            href="/allpages/allData"
            className="flex items-center gap-2 rounded-xl border-2 border-[#FFFEFE] px-7 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-[#FFFEFE] hover:shadow-lg"
          >
            <ArrowLeft size={20} />
            Find Doctors
          </Link>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          ❤️ <span className="font-semibold text-red-500">MediCare Hub</span> —
          Caring for your health, every step of the way.
        </p>
      </div>
    </section>
  );
}