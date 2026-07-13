import React from "react";
import Image from "next/image";
import {
  Stethoscope,
  User,
  CreditCard,
  Calendar,
  MapPin,
  Building2,
  Activity,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";
import PostComments from "@/components/PostComments";
import ShowComments from "@/components/ShowComments";

type Params = Promise<{ id: string }>;

const AlldetailsPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alldata/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
          <p className="text-black text-lg">Failed to load Medicare details.</p>
        </div>
      </div>
    );
  }

  const data = await res.json();

  const statusIsActive = data?.available;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-gray-50 rounded-3xl overflow-hidden mb-8 text-center pb-8">
          {/* Photo */}
          <div className="relative w-full h-72">
            {data?.image ? (
              <Image
                src={data.image}
                alt={data?.name ?? "Doctor"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-300" />
              </div>
            )}
            {/* Fee badge */}
            <span className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
              {data?.fee ?? "N/A"}
            </span>
          </div>

          {/* Overlapping icon badge */}
          <div className="relative -mt-9 mb-4 flex justify-center">
            <div className="w-[72px] h-[72px] rounded-full bg-red-600 flex items-center justify-center border-4 border-white shadow-md">
              <Stethoscope className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Specialization */}
          <p className="text-gray-800 text-xs font-bold tracking-widest uppercase mb-2">
            {data?.specialization ?? "N/A"}
          </p>
          <div className="w-8 h-[2px] bg-red-600 mx-auto mb-3" />

          {/* Name */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {data?.name ?? "N/A"}
          </h1>

          {/* Rating + availability */}
          <div className="flex items-center justify-center gap-5">
            <span className="flex items-center gap-1 text-gray-800 text-sm font-semibold">
              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
              {data?.rating ?? "N/A"}
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-bold uppercase ${
                statusIsActive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {statusIsActive ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              {statusIsActive ? "Available" : "Not Available"}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InfoCard
            icon={<User className="w-5 h-5 text-red-600" />}
            label="Doctor Name"
            value={data?.name}
          />

          <InfoCard
            icon={<Activity className="w-5 h-5 text-red-600" />}
            label="Specialization"
            value={data?.specialization}
          />

          <InfoCard
            icon={<Building2 className="w-5 h-5 text-red-600" />}
            label="Hospital"
            value={data?.hospital}
          />

          <InfoCard
            icon={<MapPin className="w-5 h-5 text-red-600" />}
            label="Location"
            value={data?.location}
          />

          <InfoCard
            icon={<CreditCard className="w-5 h-5 text-red-600" />}
            label="Consultation Fee"
            value={data?.fee}
          />

          <InfoCard
            icon={<Calendar className="w-5 h-5 text-red-600" />}
            label="Experience"
            value={`${data?.experience} Years`}
          />

          <InfoCard
            icon={<Star className="w-5 h-5 text-red-600" />}
            label="Rating"
            value={`${data?.rating} ⭐`}
          />

          <InfoCard
            icon={<CheckCircle2 className="w-5 h-5 text-red-600" />}
            label="Availability"
            value={data?.available ? "Available" : "Not Available"}
          />

          <div className="md:col-span-2">
            <InfoCard
              icon={<MapPin className="w-5 h-5 text-red-600" />}
              label="Address"
              value={data?.address}
            />
          </div>
        </div>

        {/* Book button */}
        <div className="flex justify-center mt-10">
          <button className="bg-red-600 hover:bg-red-700 transition-colors text-white font-bold text-xs tracking-wide uppercase px-10 py-4 rounded-full shadow-sm">
            Book Appointment
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Record ID: {id} · Fetched securely
        </p>

        <ShowComments doctorId={data._id} />

        <PostComments doctorId={data._id} />
      </div>
    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | undefined | null;
}) => (
  <div className="group rounded-2xl bg-gray-50 border border-transparent hover:border-red-200 transition-colors p-5">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
        {label}
      </span>
    </div>
    <p className="text-black text-base font-semibold">{value ?? "N/A"}</p>
  </div>
);

export default AlldetailsPage;
