import React from 'react';
import Image from "next/image";
import { Stethoscope, MapPin, Star, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
type Doctor = {
    _id:string
  name: string;
  specialization: string;
  experience: number;
  hospital: string;
  location: string;
  fee: string;
  rating: number;
  available: boolean;
  image: string;
  address: string;
};

const LimitData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/allLimitData`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-black text-lg">Failed to load doctor data.</p>
      </div>
    );
  }

  const limitData: Doctor[] = await res.json();

  return (
    <section className="bg-white py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Limit Data
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {limitData.map((doctor) => (
  <DoctorCard key={doctor._id} doctor={doctor} />
))} </div>
    </section>
  );
};

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <div className="bg-gray-50 pb-8 text-center">
      {/* Photo */}
      <div className="relative w-full h-64 mb-0">
        <Image
          src={doctor?.image}
          alt={doctor?.name ?? "Doctor"}
          fill
          className="object-cover"
        />
        {/* Fee badge */}
        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {doctor?.fee ?? 'N/A'}
        </span>
      </div>

      {/* Overlapping icon badge */}
      <div className="relative -mt-8 mb-4 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center border-4 border-white shadow-md">
          <Stethoscope className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
      </div>

      {/* Specialization */}
      <p className="text-gray-800 text-xs font-bold tracking-widest uppercase mb-2">
        {doctor?.specialization ?? 'N/A'}
      </p>
      <div className="w-8 h-[2px] bg-red-600 mx-auto mb-3" />

      {/* Name */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
        {doctor?.name ?? 'N/A'}
      </h3>

      {/* Hospital / experience */}
      <p className="text-gray-500 text-sm leading-relaxed px-6 mb-1">
        {doctor?.hospital ?? 'N/A'} · {doctor?.experience ?? 0} yrs experience
      </p>

      {/* Location */}
      <p className="flex items-center justify-center gap-1 text-gray-500 text-sm mb-3">
        <MapPin className="w-3.5 h-3.5" />
        {doctor?.location ?? 'N/A'}
      </p>

      {/* Rating + availability */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="flex items-center gap-1 text-gray-800 text-sm font-semibold">
          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
          {doctor?.rating ?? 'N/A'}
        </span>
        <span
          className={`flex items-center gap-1 text-xs font-bold uppercase ${
            doctor?.available ? 'text-emerald-600' : 'text-red-500'
          }`}
        >
          {doctor?.available ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          {doctor?.available ? 'Available' : 'Busy'}
        </span>
      </div>

      {/* Button */}
           <Link href={`/allpages/allData/${doctor._id}`}>
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-400 transition-colors border border-gray-200 rounded-full px-6 py-3 text-white font-bold text-xs tracking-wide uppercase shadow-sm"
                >
                  View All Details
                </button>
              </Link>
    </div>
  );
};

export default LimitData;