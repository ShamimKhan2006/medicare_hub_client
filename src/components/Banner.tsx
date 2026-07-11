"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, ChevronLeft, Mail } from "lucide-react";

interface Slide {
  eyebrow: string;
  titleAccent: string;
  titleBase: string;
  body: string;
}

const SLIDES: Slide[] = [
  {
    eyebrow: "TRUSTED HEALTH IDENTITY",
    titleAccent: "One card,",
    titleBase: "every heartbeat.",
    body: "Carry your medical identity, allergies, and emergency details on a single verified card — always with you, always up to date.",
  },
  {
    eyebrow: "24/7 EMERGENCY ACCESS",
    titleAccent: "Fast help,",
    titleBase: "when it matters most.",
    body: "One tap connects you to the nearest hospital or ambulance, day or night, wherever you are.",
  },
  {
    eyebrow: "SECURE MEDICAL RECORDS",
    titleAccent: "Your history,",
    titleBase: "safely in one place.",
    body: "Prescriptions, reports, and treatment history, encrypted and accessible only to you and the people you trust.",
  },
];

const AUTOPLAY_MS = 5500;

export default function MedicardHubHero() {
  const [index, setIndex] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i: number) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    timerRef.current = id;
    return () => clearInterval(id);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        fontFamily: "'Sora', 'Inter', sans-serif",
        background: "#F4F1EA",
        color: "#1A1816",
    
        overflow: "hidden",
        position: "relative",
        border: "1px solid #E4E0D6",
        width: "100%",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .mhh-grid { display:grid; grid-template-columns: 1fr 1fr; align-items:stretch; min-height:520px; }
        @media (max-width:820px){ .mhh-grid{ grid-template-columns:1fr; min-height:auto; } .mhh-art{ min-height:320px; } }
        .mhh-fade { animation: mhhFade .6s ease both; }
        @keyframes mhhFade { from{ opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }
        .mhh-btn { transition: transform .15s ease, filter .2s ease; }
        .mhh-btn:hover { filter:brightness(1.08); }
        .mhh-btn:active { transform: scale(.97); }
        .mhh-arrow { transition: background .2s ease; }
        .mhh-arrow:hover { background:rgba(0,0,0,0.06); }
        .mhh-dot { transition: width .25s ease, background .25s ease; cursor:pointer; }
        .mhh-pulse { animation: mhhPulse 2.6s ease-in-out infinite; }
        @keyframes mhhPulse { 0%,100%{ transform:scale(1);} 50%{ transform:scale(1.05);} }
        .mhh-ecg { stroke-dasharray: 500; stroke-dashoffset: 500; animation: mhhDraw 2.2s ease forwards; }
        @keyframes mhhDraw { to { stroke-dashoffset: 0; } }
      `}</style>

      <div className="mhh-grid">
        {/* LEFT: content */}
        <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div key={"eyebrow-" + index} className="mhh-fade" style={{ marginBottom: "20px" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.14em", color: "#4A4742" }}>
              {slide.eyebrow}
            </span>
            <div style={{ width: "36px", height: "3px", background: "#F40C1F", borderRadius: "2px", marginTop: "10px" }} />
          </div>

          <h1
            key={"title-" + index}
            className="mhh-fade"
            style={{ fontSize: "clamp(32px, 4.2vw, 50px)", fontWeight: 800, lineHeight: 1.12, margin: "0 0 20px", letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "#F40C1F", display: "block" }}>{slide.titleAccent}</span>
            <span style={{ color: "#1A1816", display: "block" }}>{slide.titleBase}</span>
          </h1>

          <p key={"body-" + index} className="mhh-fade" style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#5C5850", maxWidth: "420px", margin: "0 0 32px" }}>
            {slide.body}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px", flexWrap: "wrap" }}>
            <button
              className="mhh-btn"
              style={{ background: "#F40C1F", color: "#FFFFFF", border: "none", borderRadius: "999px", padding: "14px 26px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
            >
              Discover more
            </button>
            <button
              className="mhh-btn"
              style={{ background: "#1A1816", color: "#FFFFFF", border: "none", borderRadius: "999px", padding: "14px 26px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
            >
              View our services
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className="mhh-dot"
                onClick={() => goTo(i)}
                style={{
                  width: i === index ? "26px" : "8px",
                  height: "8px",
                
                  background: i === index ? "#F40C1F" : "#D8D3C6",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: brand illustration */}
        <div className="mhh-art" style={{ position: "relative", background: "#EDE9DD", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(#DCD7C8 1.5px, transparent 1.5px)",
              backgroundSize: "20px 20px",
              opacity: 0.8,
            }}
          />
          <svg key={"art-" + index} className="mhh-fade" width="100%" height="100%" viewBox="0 0 420 420" style={{ maxWidth: "420px", position: "relative" }}>
            <circle cx="210" cy="210" r="170" fill="#FFFFFF" />
            <circle className="mhh-pulse" cx="210" cy="210" r="170" fill="none" stroke="#F40C1F" strokeWidth="2" opacity="0.35" style={{ transformOrigin: "210px 210px" }} />
            <path
              d="M210,300 C150,255 95,215 95,165 C95,130 122,108 152,108 C176,108 196,122 210,145 C224,122 244,108 268,108 C298,108 325,130 325,165 C325,215 270,255 210,300 Z"
              fill="none"
              stroke="#1A1816"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              className="mhh-ecg"
              d="M120,210 L165,210 L180,175 L198,245 L215,210 L235,210 L248,190 L262,210 L300,210"
              fill="none"
              stroke="#F40C1F"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* nav arrow */}
      <button
        aria-label="Next slide"
        className="mhh-arrow"
        onClick={() => goTo(index + 1)}
        style={{
          position: "absolute",
          right: "18px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "44px",
          height: "44px",
        
          border: "1px solid #E4E0D6",
          background: "#F4F1EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#1A1816",
        }}
      >
        <ChevronRight size={18} />
      </button>
      <button
        aria-label="Previous slide"
        className="mhh-arrow"
        onClick={() => goTo(index - 1)}
        style={{
          position: "absolute",
          left: "18px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "44px",
          height: "44px",
     
          border: "1px solid #E4E0D6",
          background: "#F4F1EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#1A1816",
          opacity: 0.85,
        }}
      >
        <ChevronLeft size={18} />
      </button>

      {/* floating subscribe badge */}
      <div
        style={{
          position: "absolute",
          right: "24px",
          bottom: "24px",
          background: "#1A1816",
          color: "#FFFFFF",
       
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        <Mail size={15} />
        <span style={{ opacity: 0.85 }}>NEVER MISS AN UPDATE</span>
        <span style={{ color: "#F40C1F" }}>SUBSCRIBE</span>
      </div>
    </div>
  );
}

