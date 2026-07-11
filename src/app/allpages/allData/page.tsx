"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

const PALETTE = ["#0F766E", "#0284C7", "#7C3AED", "#D97706", "#DB2777", "#059669"];

const accentFor = (seed: string): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
};

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

        const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
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
        const list: DataItem[] = Array.isArray(raw) ? raw : raw?.data ?? [];

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
      <div style={styles.center}>
        <div style={styles.pulseDot} />
        <h2 style={{ marginTop: 16, fontWeight: 600 }}>Loading records…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <h2 style={{ color: "#B91C1C" }}>{error}</h2>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={styles.center}>
        <h2>No Data Found</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

        .mh-card {
          font-family: 'Inter', sans-serif;
          transition: transform .28s ease, box-shadow .28s ease;
        }
        .mh-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
        }
        .mh-title { font-family: 'Poppins', sans-serif; }

        .mh-pulse-dot {
          animation: mhPulse 1.6s ease-in-out infinite;
        }
        @keyframes mhPulse {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,.55); }
          70% { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        .mh-btn {
          transition: background .2s ease, transform .15s ease;
        }
        .mh-btn:hover { transform: translateY(-1px); }
        .mh-overlay {
          animation: mhFadeIn .18s ease both;
        }
        .mh-modal {
          animation: mhScaleIn .22s ease both;
        }
        @keyframes mhFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mhScaleIn {
          from { opacity: 0; transform: translateY(12px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mh-card, .mh-pulse-dot, .mh-btn, .mh-overlay, .mh-modal { animation: none !important; transition: none !important; }
        }
      `}</style>

      <header style={styles.header}>
        <span style={styles.eyebrow}>Directory</span>
        <h1 className="mh-title" style={styles.title}>
          Medicare Hub
        </h1>
        <p style={styles.subtitle}>Total Records: {data.length}</p>
        <svg width="120" height="20" viewBox="0 0 120 20" style={{ margin: "10px auto 0" }}>
          <polyline
            points="0,10 30,10 38,2 46,18 54,10 120,10"
            fill="none"
            stroke="#0F766E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </header>

      <div style={styles.grid}>
        {data.map((item, idx) => {
          const key = item._id || idx.toString();
          const accent = accentFor(key + (item.name || ""));
          const fee = formatFee(item.fee);

          return (
            <div key={key} className="mh-card" style={styles.card}>
              <div style={{ ...styles.cardTop, background: accent }} />

              {fee && (
                <div style={{ ...styles.feeBadge, background: accent }}>{fee}</div>
              )}

              <div style={styles.body}>
                <div style={styles.avatarWrap}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name ?? "Profile photo"}
                      fill
                      sizes="90px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ ...styles.avatar, background: accent }}>
                      {initials(item.name, item.email)}
                    </div>
                  )}
                </div>

                <h2 style={styles.name}>{item.name ?? "Unnamed"}</h2>

                {item.specialization && (
                  <p style={styles.specialization}>{item.specialization}</p>
                )}

                <div style={styles.metaList}>
                  {item.experience !== undefined && (
                    <p style={styles.metaRow}>
                      <b>Experience</b>
                      <span>{item.experience} yrs</span>
                    </p>
                  )}
                  {item.hospital && (
                    <p style={styles.metaRow}>
                      <b>Hospital</b>
                      <span>{item.hospital}</span>
                    </p>
                  )}
                  {item.location && (
                    <p style={styles.metaRow}>
                      <b>Location</b>
                      <span>{item.location}</span>
                    </p>
                  )}
                  {item.rating !== undefined && (
                    <p style={styles.metaRow}>
                      <b>Rating</b>
                      <span>⭐ {item.rating}</span>
                    </p>
                  )}
                </div>

                <div style={styles.statusRow}>
                  <span
                    className={item.available ? "mh-pulse-dot" : undefined}
                    style={{
                      ...styles.statusDot,
                      background: item.available ? "#10B981" : "#9CA3AF",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 700,
                      color: item.available ? "#059669" : "#6B7280",
                      fontSize: 13,
                    }}
                  >
                    {item.available ? "Available Now" : "Currently Busy"}
                  </span>
                </div>

                {/* <button
                  type="button"
                  className="mh-btn"
                 
                  onClick={() => setSelected(item)}
                >
                  View All Details
                </button> */}
                <Link href={`/allpages/allData/${item._id}`}> <button  type='button' style={{ ...styles.detailsBtn, background: accent }}>View All Details</button></Link>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div
          className="mh-overlay"
          style={styles.overlay}
          onClick={() => setSelected(null)}
        >
          <div
            className="mh-modal"
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelected(null)}
              style={styles.closeBtn}
            >
              ×
            </button>

            <div style={styles.modalHead}>
              <div style={styles.modalAvatarWrap}>
                {selected.image ? (
                  <Image
                    src={selected.image}
                    alt={selected.name ?? "Profile photo"}
                    fill
                    sizes="72px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      ...styles.avatar,
                      width: 72,
                      height: 72,
                      fontSize: 24,
                      background: accentFor((selected._id || "") + (selected.name || "")),
                    }}
                  >
                    {initials(selected.name, selected.email)}
                  </div>
                )}
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{selected.name ?? "Unnamed"}</h2>
                {selected.email && (
                  <p style={{ margin: "2px 0 0", color: "#6B7280", fontSize: 13 }}>
                    {selected.email}
                  </p>
                )}
              </div>
            </div>

            <div style={styles.modalGrid}>
              {selected.specialization && (
                <div style={styles.modalItem}>
                  <span style={styles.modalKey}>Specialization</span>
                  <span style={styles.modalVal}>{selected.specialization}</span>
                </div>
              )}
              {selected.experience !== undefined && (
                <div style={styles.modalItem}>
                  <span style={styles.modalKey}>Experience</span>
                  <span style={styles.modalVal}>{selected.experience} years</span>
                </div>
              )}
              {selected.hospital && (
                <div style={styles.modalItem}>
                  <span style={styles.modalKey}>Hospital</span>
                  <span style={styles.modalVal}>{selected.hospital}</span>
                </div>
              )}
              {selected.location && (
                <div style={styles.modalItem}>
                  <span style={styles.modalKey}>Location</span>
                  <span style={styles.modalVal}>{selected.location}</span>
                </div>
              )}
              {formatFee(selected.fee) && (
                <div style={styles.modalItem}>
                  <span style={styles.modalKey}>Consultation Fee</span>
                  <span style={styles.modalVal}>{formatFee(selected.fee)}</span>
                </div>
              )}
              {selected.rating !== undefined && (
                <div style={styles.modalItem}>
                  <span style={styles.modalKey}>Rating</span>
                  <span style={styles.modalVal}>⭐ {selected.rating}</span>
                </div>
              )}
              {selected.role && (
                <div style={styles.modalItem}>
                  <span style={styles.modalKey}>Role</span>
                  <span style={styles.modalVal}>{selected.role}</span>
                </div>
              )}
              <div style={styles.modalItem}>
                <span style={styles.modalKey}>Status</span>
                <span
                  style={{
                    ...styles.modalVal,
                    color: selected.available ? "#059669" : "#6B7280",
                    fontWeight: 700,
                  }}
                >
                  {selected.available ? "Available Now" : "Currently Busy"}
                </span>
              </div>

              {extraEntries.map(([k, v]) => (
                <div style={styles.modalItem} key={k}>
                  <span style={styles.modalKey}>{k}</span>
                  <span style={styles.modalVal}>{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "48px 24px 80px",
    background:
      "radial-gradient(circle at 15% 0%, #E6FBF6 0%, #F3FAF8 38%, #F6F8FB 100%)",
  },
  header: {
    textAlign: "center",
    marginBottom: 44,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#0F766E",
  },
  title: {
    fontSize: 42,
    fontWeight: 800,
    margin: "6px 0 4px",
    color: "#0B3B36",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    color: "#5F6C72",
    marginTop: 4,
    fontSize: 14,
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  pulseDot: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: "#10B981",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 26,
    maxWidth: 1300,
    margin: "0 auto",
  },
  card: {
    position: "relative",
    background: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    border: "1px solid rgba(15, 23, 42, 0.06)",
    boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
  },
  cardTop: {
    height: 6,
    width: "100%",
  },
  feeBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    padding: "5px 10px",
    borderRadius: 999,
    zIndex: 1,
  },
  body: {
    padding: "22px 22px 20px",
  },
  avatarWrap: {
    position: "relative",
    width: 90,
    height: 90,
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28,
    fontWeight: 700,
  },
  name: {
    margin: "0 0 2px",
    fontSize: 19,
    fontWeight: 700,
    color: "#111827",
  },
  specialization: {
    margin: "0 0 14px",
    color: "#0F766E",
    fontWeight: 600,
    fontSize: 13.5,
  },
  metaList: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 14,
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    margin: 0,
    fontSize: 13,
    color: "#374151",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
  },
  detailsBtn: {
    width: "100%",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: 13.5,
    padding: "11px 0",
    borderRadius: 12,
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 50,
  },
  modal: {
    background: "#fff",
    borderRadius: 20,
    padding: 28,
    maxWidth: 460,
    width: "100%",
    maxHeight: "85vh",
    overflowY: "auto",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    border: "none",
    background: "#F3F4F6",
    width: 32,
    height: 32,
    borderRadius: "50%",
    fontSize: 18,
    lineHeight: "1",
    cursor: "pointer",
    color: "#374151",
  },
  modalHead: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  modalAvatarWrap: {
    position: "relative",
    width: 72,
    height: 72,
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0,
  },
  modalGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  modalItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    fontSize: 13.5,
    borderBottom: "1px solid #F1F2F4",
    paddingBottom: 8,
  },
  modalKey: {
    color: "#9CA3AF",
    fontWeight: 600,
    textTransform: "capitalize",
    flexShrink: 0,
  },
  modalVal: {
    color: "#1F2937",
    textAlign: "right",
  },
};

export default AllDatas;