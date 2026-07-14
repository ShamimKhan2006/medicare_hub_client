"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Stethoscope, Star, CheckCircle2, User } from "lucide-react";

interface DataItem {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
  specialization?: string;
  experience?: number;
  hospital?: string;
  location?: string;
  fee?: string | number;
  rating?: number;
  available?: boolean;
  [key: string]: unknown;
}

interface ApiResponse {
  data?: DataItem[];
}

const initials = (name?: string, email?: string): string => {
  if (name && name.trim().length > 0) {
    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  return email ? email.charAt(0).toUpperCase() : "?";
};

const formatFee = (fee?: string | number): string | null => {
  if (fee === undefined || fee === null || fee === "") return null;
  const numeric = typeof fee === "number" ? fee : Number(fee);
  if (!Number.isNaN(numeric)) return `৳${numeric.toLocaleString("en-BD")}`;
  return String(fee);
};

const KNOWN_KEYS = [
  "_id",
  "name",
  "email",
  "image",
  "role",
  "specialization",
  "experience",
  "hospital",
  "location",
  "fee",
  "rating",
  "available",
];

const AllDatas: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<DataItem | null>(null);

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/alldata`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
         
      

        if (!res.ok) {
          throw new Error(`Failed to fetch (status ${res.status})`);
        }

        const raw: DataItem[] | ApiResponse = await res.json();
        const list: DataItem[] = Array.isArray(raw) ? raw : (raw?.data ?? []);

        if (!cancelled) setData(list);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Failed to load data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    getData();
    return () => {
      cancelled = true;
    };
  }, []);

  const extraEntries = useMemo(() => {
    if (!selected) return [];
    return Object.entries(selected).filter(([k]) => !KNOWN_KEYS.includes(k));
  }, [selected]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse" />
        <h2 className="mt-4 font-semibold text-gray-700">Loading records…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <h2 className="text-red-700 font-semibold">{error}</h2>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <h2 className="text-gray-700 font-semibold">No Data Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      {/* Header */}
      <header className="text-center mb-12">
        <span className="text-red-600 text-xs font-bold tracking-[0.2em] uppercase">
          Directory
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-1">
          Medicare Hub
        </h1>
        <p className="text-gray-500 text-sm">Total Records: {data.length}</p>
        <div className="w-10 h-[3px] bg-red-600 mx-auto mt-4" />
      </header>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, idx) => {
          const key = item._id || idx.toString();
          const fee = formatFee(item.fee);

          return (
            <div key={key} className="bg-gray-50 pb-8 text-center">
              {/* Photo */}
              <div className="relative w-full h-64">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name ?? "Profile photo"}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400">
                      {initials(item.name, item.email)}
                    </span>
                  </div>
                )}
                {fee && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {fee}
                  </span>
                )}
              </div>

              {/* Overlapping icon badge */}
              <div className="relative -mt-8 mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center border-4 border-white shadow-md">
                  <Stethoscope
                    className="w-7 h-7 text-white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Specialization */}
              <p className="text-gray-800 text-xs font-bold tracking-widest uppercase mb-2">
                {item.specialization ?? item.role ?? "N/A"}
              </p>
              <div className="w-8 h-[2px] bg-red-600 mx-auto mb-3" />

              {/* Name */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {item.name ?? "Unnamed"}
              </h3>

              {/* Hospital / experience */}
              {(item.hospital || item.experience !== undefined) && (
                <p className="text-gray-500 text-sm leading-relaxed px-6 mb-1">
                  {item.hospital ?? "N/A"}
                  {item.experience !== undefined
                    ? ` · ${item.experience} yrs experience`
                    : ""}
                </p>
              )}

              {/* Location */}
              {item.location && (
                <p className="flex items-center justify-center gap-1 text-gray-500 text-sm mb-3">
                  {item.location}
                </p>
              )}

              {/* Rating + availability */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {item.rating !== undefined && (
                  <span className="flex items-center gap-1 text-gray-800 text-sm font-semibold">
                    <Star
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                    />
                    {item.rating}
                  </span>
                )}
                <span
                  className={`flex items-center gap-1 text-xs font-bold uppercase ${
                    item.available ? "text-emerald-600" : "text-gray-400"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {item.available ? "Available" : "Busy"}
                </span>
              </div>

              {/* Button */}
              <Link href={`/allpages/allData/${item._id}`}>
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-400 transition-colors border border-gray-200 rounded-full px-6 py-3 text-white font-bold text-xs tracking-wide uppercase shadow-sm"
                >
                  View All Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Modal (kept for optional future use) */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/45 flex items-center justify-center p-5 z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl p-7 max-w-md w-full max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full text-gray-600 text-lg"
            >
              ×
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-red-600 flex items-center justify-center">
                {selected.image ? (
                  <Image
                    src={selected.image}
                    alt={selected.name ?? "Profile photo"}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">
                    {initials(selected.name, selected.email)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">
                  {selected.name ?? "Unnamed"}
                </h2>
                {selected.email && (
                  <p className="text-gray-500 text-xs mt-0.5">
                    {selected.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {selected.specialization && (
                <ModalRow
                  label="Specialization"
                  value={selected.specialization}
                />
              )}
              {selected.experience !== undefined && (
                <ModalRow
                  label="Experience"
                  value={`${selected.experience} years`}
                />
              )}
              {selected.hospital && (
                <ModalRow label="Hospital" value={selected.hospital} />
              )}
              {selected.location && (
                <ModalRow label="Location" value={selected.location} />
              )}
              {formatFee(selected.fee) && (
                <ModalRow
                  label="Consultation Fee"
                  value={formatFee(selected.fee)!}
                />
              )}
              {selected.rating !== undefined && (
                <ModalRow label="Rating" value={`⭐ ${selected.rating}`} />
              )}
              {selected.role && <ModalRow label="Role" value={selected.role} />}
              <ModalRow
                label="Status"
                value={selected.available ? "Available Now" : "Currently Busy"}
                valueClassName={
                  selected.available
                    ? "text-emerald-600 font-bold"
                    : "text-gray-500 font-bold"
                }
              />
              {extraEntries.map(([k, v]) => (
                <ModalRow key={k} label={k} value={String(v)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalRow = ({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) => (
  <div className="flex justify-between gap-4 text-sm border-b border-gray-100 pb-2">
    <span className="text-gray-400 font-semibold capitalize">{label}</span>
    <span className={`text-gray-800 text-right ${valueClassName ?? ""}`}>
      {value}
    </span>
  </div>
);

export default AllDatas;
