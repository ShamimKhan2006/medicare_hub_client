import React from 'react';
import { 
  ShieldCheck, 
  User, 
  CreditCard, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Building2,
  Activity,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

type Params = Promise<{ id: string }>;

const AlldetailsPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/alldata/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Failed to load Medicare details.</p>
        </div>
      </div>
    );
  }

  const data = await res.json();

  const statusIsActive = data?.status?.toLowerCase() === 'active';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 mb-6 shadow-2xl shadow-blue-900/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium tracking-wide uppercase">Medicare Record</p>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {data?.name ?? 'N/A'}
                </h1>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur border ${
                statusIsActive
                  ? 'bg-emerald-400/20 border-emerald-300/30 text-emerald-100'
                  : 'bg-red-400/20 border-red-300/30 text-red-100'
              }`}
            >
              {statusIsActive ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {data?.status ?? 'Unknown'}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <InfoCard icon={<CreditCard className="w-5 h-5 text-cyan-400" />} label="Member ID" value={data?.memberId ?? id} />
          <InfoCard icon={<Activity className="w-5 h-5 text-cyan-400" />} label="Plan Type" value={data?.planType} />
          <InfoCard icon={<Calendar className="w-5 h-5 text-cyan-400" />} label="Effective Date" value={data?.effectiveDate} />
          <InfoCard icon={<Clock className="w-5 h-5 text-cyan-400" />} label="Expiry Date" value={data?.expiryDate} />
          <InfoCard icon={<Building2 className="w-5 h-5 text-cyan-400" />} label="Provider" value={data?.provider} />
          <InfoCard icon={<User className="w-5 h-5 text-cyan-400" />} label="Coverage Type" value={data?.coverageType} />
          <InfoCard icon={<Phone className="w-5 h-5 text-cyan-400" />} label="Phone" value={data?.phone} />
          <InfoCard icon={<Mail className="w-5 h-5 text-cyan-400" />} label="Email" value={data?.email} />

          <div className="md:col-span-2">
            <InfoCard icon={<MapPin className="w-5 h-5 text-cyan-400" />} label="Address" value={data?.address} />
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-slate-500 text-xs mt-8">
          Record ID: {id} · Fetched securely
        </p>
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
  <div className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-700/50 transition-colors p-5 backdrop-blur">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs uppercase tracking-wide text-slate-400 font-medium">{label}</span>
    </div>
    <p className="text-slate-100 text-base font-semibold">{value ?? 'N/A'}</p>
  </div>
);

export default AlldetailsPage;