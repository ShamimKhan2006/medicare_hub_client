import NotFound from "@/app/not-found";
import Delete from "@/components/Delete";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

const isValidImageSrc = (src?: string | null): boolean => {
  if (!src || typeof src !== "string") return false;
  const trimmed = src.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/")) return true;
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const MyHealthPostPages = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  console.log("user", user);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/myhealth-posts?email=${user?.email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();
  console.log(res.status);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  console.log(data);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shine {
      from { transform: translateX(-120%) skewX(-12deg); }
      to { transform: translateX(220%) skewX(-12deg); }
    }
    .doctor-card {
      animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .doctor-card .shine {
      transform: translateX(-120%) skewX(-12deg);
    }
    .doctor-card:hover .shine {
      animation: shine 1s ease;
    }
  `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((doctor: any, index: number) => (
          <div
            key={doctor._id}
            style={{ animationDelay: `${index * 90}ms` }}
            className="doctor-card group relative overflow-hidden rounded-[28px] bg-white border border-slate-100 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.12)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_28px_50px_-16px_rgba(15,110,86,0.28)] hover:border-teal-100"
          >
            <div className="relative h-72 overflow-hidden">
           
               <img
                src={isValidImageSrc(doctor.photoUrl) ? doctor.photoUrl : "/file.svg"}
                alt={doctor.doctorName}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-slate-900/0" />

              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm ring-1 ring-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                {doctor.specialty}
              </span>

              <span className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-white/30">
                <span className="text-[11px] font-bold leading-none">
                  ${doctor.price}
                </span>
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 opacity-95">
                <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                  {doctor.doctorName}
                </h2>
                <p className="text-sm text-white/80 mt-0.5">
                  {doctor.hospital}
                </p>
              </div>
            </div>

            <div className="p-6 pt-5 space-y-5">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center transition-colors duration-300 group-hover:bg-teal-50">
                  <svg
                    className="mx-auto mb-1 h-4 w-4 text-teal-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" strokeLinecap="round" />
                  </svg>
                  <p className="text-[11px] text-slate-500">Experience</p>
                  <p className="text-sm font-bold text-slate-800">
                    {doctor.experience}y
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center transition-colors duration-300 group-hover:bg-teal-50">
                  <svg
                    className="mx-auto mb-1 h-4 w-4 text-teal-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.3" />
                  </svg>
                  <p className="text-[11px] text-slate-500">Location</p>
                  <p className="truncate text-sm font-bold text-slate-800">
                    {doctor.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center transition-colors duration-300 group-hover:bg-teal-50">
                  <svg
                    className="mx-auto mb-1 h-4 w-4 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-[11px] text-slate-500">Fee</p>
                  <p className="text-sm font-bold text-red-600">
                    ${doctor.price}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-1 w-full">
               <Delete deleteId={doctor._id} endpoint="deleteDoctor"/>

               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHealthPostPages;
