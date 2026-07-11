"use client"

import React, { useState, FormEvent } from "react";

const LINK_COLUMNS = [
  {
    heading: "Product",
    links: ["Home", "How it works", "Emergency access", "Pricing", "Security"],
  },
  {
    heading: "Resources",
    links: ["Help center", "FAQs", "Blog", "API docs", "System status"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Privacy policy", "Terms of service", "Contact"],
  },
];

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M14 9h2.5V6H14c-1.93 0-3.5 1.57-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3v-1.5c0-.55.45-1 1-1z" />
    </svg>
  );
}
function IconLinkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="4" y="9" width="3" height="10" />
      <circle cx="5.5" cy="5.5" r="1.5" />
      <path d="M11 9h3v1.8c.6-1.1 1.9-2 3.5-2 2.7 0 4 1.7 4 4.9V19h-3v-4.7c0-1.4-.5-2.3-1.8-2.3-1 0-1.6.7-1.9 1.3-.1.3-.1.6-.1 1V19h-3z" />
    </svg>
  );
}
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none" {...props}>
      <path d="M18.9 3H22l-7.6 8.7L23 21h-6.9l-5.4-6.6L4.5 21H1.4l8.1-9.3L1 3h7l4.9 6z" />
    </svg>
  );
}
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { icon: IconFacebook, label: "Facebook" },
  { icon: IconLinkedin, label: "LinkedIn" },
  { icon: IconX, label: "X" },
  { icon: IconInstagram, label: "Instagram" },
];

export default function MedicardHubFooter() {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 2600);
  };

  return (
    <footer
      style={{
        fontFamily: "'Sora', 'Inter', sans-serif",
        background: "#F40C1F",
        color: "#FAFAF7",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.14)",
        padding: "56px 48px 32px",
        width: "100%",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .mcf-grid { display:grid; grid-template-columns: 1.05fr 1.3fr; gap:56px; }
        @media (max-width: 820px){ .mcf-grid{ grid-template-columns:1fr; gap:40px; } }
        .mcf-link-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 28px 24px; }
        @media (max-width: 560px){ .mcf-link-grid{ grid-template-columns: repeat(2, 1fr); } }
        .mcf-input::placeholder { color:rgba(255,255,255,0.72); }
        .mcf-input:focus { outline:none; border-color:rgba(255,255,255,0.65); }
        .mcf-sub-btn { transition: background .2s ease, color .2s ease, transform .15s ease; }
        .mcf-sub-btn:hover { background:#E7E7E0; }
        .mcf-sub-btn:active { transform: scale(.97); }
        .mcf-social { transition: border-color .2s ease, color .2s ease; }
        .mcf-social:hover { border-color:#FAFAF7; color:#FAFAF7; }
        .mcf-link { transition: color .2s ease; text-decoration:none; }
        .mcf-link:hover { color:#FAFAF7; }
        .mcf-credit { transition: color .2s ease; }
        .mcf-credit:hover { color:#FAFAF7; }
        .mcf-ecg { stroke-dasharray: 900; stroke-dashoffset: 900; animation: mcfDraw 2.4s ease forwards; }
        @keyframes mcfDraw { to { stroke-dashoffset: 0; } }
      `}</style>

      {/* background chip-dot texture, top right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "220px",
          height: "220px",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      <div className="mcf-grid">
        {/* LEFT: newsletter */}
        <div>
          <h2 style={{ fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 600, lineHeight: 1.3, margin: "0 0 14px", letterSpacing: "-0.01em" }}>
            Never miss a beat<br />in your health journey
          </h2>
          <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "#FCE3E5", maxWidth: "380px", margin: "0 0 24px" }}>
            Get emergency-care tips, product updates, and MediCard news delivered monthly. No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "10px", maxWidth: "440px", marginBottom: "22px" }}>
            <input
              className="mcf-input"
              type="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                flex: 1,
                background: "rgba(0,0,0,0.22)",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: "10px",
                color: "#FAFAF7",
                fontSize: "14px",
                padding: "13px 16px",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              className="mcf-sub-btn"
              style={{
                background: "#FAFAF7",
                color: "#0A0A08",
                border: "none",
                borderRadius: "10px",
                padding: "13px 22px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {sent ? "Subscribed" : "Subscribe"}
            </button>
          </form>

          <div style={{ display: "flex", gap: "10px" }}>
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="mcf-social"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#FCE3E5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT: link panel */}
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: "16px",
            padding: "32px 36px",
          }}
        >
          <div className="mcf-link-grid">
            {LINK_COLUMNS.map((col) => (
              <div key={col.heading}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.72)",
                    marginBottom: "16px",
                  }}
                >
                  {col.heading}
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "13px" }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="mcf-link" style={{ fontSize: "14px", color: "rgba(255,255,255,0.88)" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ECG signature divider */}
      <svg width="100%" height="24" viewBox="0 0 1084 24" style={{ margin: "48px 0 20px", display: "block" }} preserveAspectRatio="none">
        <path
          className="mcf-ecg"
          d="M0,12 L470,12 L488,2 L502,22 L516,12 L1084,12"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.4"
        />
      </svg>

      {/* bottom row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.28)",
              display: "grid",
              gridTemplateColumns: "repeat(3, 4px)",
              gap: "2.5px",
              alignItems: "center",
              justifyItems: "center",
              padding: "6px",
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} style={{ width: "4px", height: "4px", borderRadius: "1px", background: "rgba(255,255,255,0.75)" }} />
            ))}
          </span>
          <span style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em" }}>
            MediCard<sup style={{ fontSize: "10px", fontWeight: 500 }}>HUB</sup>
          </span>
        </div>

        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)" }}>
          © {new Date().getFullYear()} MediCard Hub. All rights reserved.
        </div>

        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)" }}>
          Developed by{" "}
          <a href="#" className="mcf-credit" style={{ color: "rgba(255,255,255,0.88)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Shamim Khan
          </a>
        </div>
      </div>
    </footer>
  );
}