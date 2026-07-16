"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Newspaper,
  PlusCircle,
  FileText,
  Activity,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  User,
  Home,
  Info,

} from "lucide-react";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

// Always visible, regardless of auth state
const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Add Health Post", href: "/allpages/addhealthpost", icon: PlusCircle },
  { label: "Health Posts", href: "/allpages/allData", icon: Newspaper },
  { label: "My Health Posts", href: "/allpages/myhealthpost", icon: FileText },


  { label: "My Interactions", href: "/allpages/myinteractions", icon: Activity },
];

export default function MedicardHubNavbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = !!session?.user;
  const user = session?.user;

  // session.user.image can be arbitrary/seed data that isn't a real URL.
  // next/image throws if src isn't a relative path (leading "/") or an
  // absolute http(s) URL, so guard against anything else here.
  const isValidImageSrc = (src?: string | null): src is string => {
    if (!src) return false;
    if (src.startsWith("/")) return true;
    try {
      const url = new URL(src);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };
  const avatarSrc = isValidImageSrc(user?.image) ? user!.image : null;

  const handleLogout = async () => {
    await authClient.signOut();
    setProfileOpen(false);
    setOpen(false);
  };

  return (
    <div
      style={{
        fontFamily: "'Sora', 'Inter', sans-serif",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500&display=swap');

        .mcn-wrap {
          padding: 14px 28px;
          transition: padding .35s ease;
        }
        .mcn-wrap.scrolled {
          padding: 8px 28px;
        }

        .mcn-nav {
          transition: box-shadow .35s ease, border-color .35s ease, background .35s ease, transform .35s ease;
        }
        .mcn-nav.scrolled {
          box-shadow: 0 12px 32px -14px rgba(26,24,22,0.22);
          border-color: rgba(26,24,22,0.14);
          background: rgba(255,255,255,0.92) !important;
        }

        .mcn-progress-track {
          height: 2px;
          width: 100%;
          background: transparent;
          overflow: hidden;
        }
        .mcn-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #F40C1F, #FF5A3C);
          transition: width .1s linear;
          box-shadow: 0 0 8px rgba(244,12,31,0.6);
        }

        .mcn-logo-grid span { transition: transform .3s ease, background .3s ease; }
        .mcn-logo-wrap:hover .mcn-logo-grid span { transform: scale(1.15); }
        .mcn-logo-wrap:hover .mcn-logo-grid span:nth-child(5) {
          background: #F40C1F;
          box-shadow: 0 0 8px rgba(244,12,31,0.8);
        }

        .mcn-brand-text {
          background: linear-gradient(90deg, #1A1816 0%, #1A1816 60%, #F40C1F 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: background-position .6s ease;
        }
        .mcn-logo-wrap:hover .mcn-brand-text { background-position: right center; }

        .mcn-link {
          position: relative;
          transition: color .25s ease, transform .25s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.01em;
          opacity: 0;
          animation: mcnFadeDown .5s ease forwards;
        }
        .mcn-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg,#F40C1F,#FF5A3C);
          border-radius: 2px;
          transition: width .28s cubic-bezier(.2,.7,.3,1);
        }
        .mcn-link:hover { color: #1A1816; transform: translateY(-1px); }
        .mcn-link:hover::after { width: 100%; }

        @keyframes mcnFadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mcn-cta {
          position: relative;
          overflow: hidden;
          transition: transform .15s ease, box-shadow .25s ease, filter .2s ease;
          box-shadow: 0 10px 24px -10px rgba(244,12,31,0.55);
        }
        .mcn-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: translateX(-120%);
          transition: transform .6s ease;
        }
        .mcn-cta:hover::before { transform: translateX(120%); }
        .mcn-cta:hover {
          filter: brightness(1.06);
          box-shadow: 0 14px 34px -10px rgba(244,12,31,0.7);
          transform: translateY(-2px);
        }
        .mcn-cta:active { transform: translateY(0); }

        .mcn-cta-outline {
          transition: transform .15s ease, box-shadow .25s ease, background .2s ease, border-color .2s ease;
        }
        .mcn-cta-outline:hover {
          background: #F4F1EA;
          border-color: rgba(244,12,31,0.4);
          transform: translateY(-2px);
        }
        .mcn-cta-outline:active { transform: translateY(0); }

        .mcn-profile-btn {
          transition: border-color .25s ease, box-shadow .25s ease, transform .15s ease;
        }
        .mcn-profile-btn:hover {
          border-color: rgba(244,12,31,0.4);
          box-shadow: 0 6px 18px -8px rgba(244,12,31,0.35);
        }

        .mcn-avatar {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #1A1816;
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .mcn-avatar::after {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid #4ADE80;
          animation: mcnPulseRing 2s ease-out infinite;
        }
        @keyframes mcnPulseRing {
          0% { transform: scale(0.85); opacity: 0.9; }
          70% { transform: scale(1.25); opacity: 0; }
          100% { opacity: 0; }
        }

        .mcn-dropdown {
          animation: mcnDrop .22s cubic-bezier(.2,.8,.3,1) both;
          transform-origin: top right;
        }
        @keyframes mcnDrop {
          from { opacity: 0; transform: translateY(-10px) scale(.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .mcn-dd-item {
          transition: background .18s ease, transform .18s ease, padding-left .18s ease;
          text-decoration: none;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          font-size: 13.5px;
          color: #1A1816;
        }
        .mcn-dd-item:hover {
          background: #F4F1EA;
          padding-left: 20px;
        }
        .mcn-dd-item.danger:hover {
          background: #FDECEC;
          color: #C40817;
        }

        .mcn-toggle {
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }
        .mcn-toggle:hover {
          background: #F4F1EA;
          border-color: rgba(244,12,31,0.3);
        }
        .mcn-toggle:active { transform: scale(0.92); }

        .mcn-mobile-overlay {
          animation: mcnFadeIn .25s ease both;
        }
        .mcn-mobile-panel {
          animation: mcnSlideDown .3s cubic-bezier(.2,.8,.25,1) both;
        }
        @keyframes mcnFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mcnSlideDown {
          from { opacity: 0; transform: translateY(-16px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mcn-mobile-link {
          opacity: 0;
          animation: mcnFadeDown .4s ease forwards;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 12px;
          color: #1A1816;
          font-size: 15px;
          font-weight: 500;
          transition: background .2s ease, transform .2s ease;
        }
        .mcn-mobile-link:hover {
          background: #F4F1EA;
          transform: translateX(4px);
        }

        .mcn-mobile-actions {
          display: flex;
          gap: 10px;
        }
        .mcn-mobile-actions > * { flex: 1; }

        @media (max-width: 900px) {
          .mcn-desktop-links, .mcn-desktop-actions { display: none !important; }
          .mcn-toggle { display: flex !important; }
        }
      `}</style>

      <div className={`mcn-wrap${scrolled ? " scrolled" : ""}`}>
        <nav
          className={`mcn-nav${scrolled ? " scrolled" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 28px",
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(26,24,22,0.08)",
            borderRadius: "18px",
          }}
        >
          <Link href="/" className="mcn-logo-wrap" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <span
              className="mcn-logo-grid"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                border: "1px solid #1A1816",
                display: "grid",
                gridTemplateColumns: "repeat(3, 4px)",
                gap: "3px",
                padding: "7px",
                background: "#FFFFFF",
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} style={{ width: "4px", height: "4px", borderRadius: "1px", background: i === 4 ? "#F40C1F" : "#1A1816" }} />
              ))}
            </span>
            <span className="mcn-brand-text" style={{ fontSize: "18px", fontWeight: 700 }}>
              MediCard<sup style={{ fontSize: "10px", color: "#F40C1F" }}>HUB</sup>
            </span>
          </Link>

          {/* Routes: always visible, logged in or not */}
          <div className="mcn-desktop-links" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {NAV_LINKS.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mcn-link"
                  style={{ fontSize: "13.5px", fontWeight: 500, color: "#5C5850", animationDelay: `${idx * 0.05}s` }}
                >
                  <Icon size={15} /> {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mcn-desktop-actions" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {isPending ? null : isLoggedIn ? (
              <div ref={profileRef} style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="mcn-profile-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    background: "transparent",
                    border: "1px solid rgba(26,24,22,0.1)",
                    borderRadius: "999px",
                    padding: "5px 14px 5px 5px",
                    cursor: "pointer",
                  }}
                >
                  <div className="mcn-avatar">
                    {avatarSrc ? (
                      <Image
                        src={avatarSrc}
                        alt={user?.name || "User"}
                        width={28}
                        height={28}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>Profile</span>
                  <ChevronDown
                    size={14}
                    style={{ transform: profileOpen ? "rotate(180deg)" : "none", transition: "transform .25s ease" }}
                  />
                </button>

                {profileOpen && (
                  <div
                    className="mcn-dropdown"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: "110px",
                      background: "#FFFFFF",
                      border: "1px solid rgba(26,24,22,0.08)",
                      borderRadius: "14px",
                      boxShadow: "0 18px 40px -12px rgba(26,24,22,0.2)",
                      padding: "8px",
                      minWidth: "180px",
                    }}
                  >
                    <Link href="/profile" className="mcn-dd-item" onClick={() => setProfileOpen(false)}>
                      <User size={15} /> Profile
                    </Link>
                    <Link href="/settings" className="mcn-dd-item" onClick={() => setProfileOpen(false)}>
                      <Settings size={15} /> Settings
                    </Link>
                  </div>
                )}

                <button
                  className="mcn-cta"
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "linear-gradient(135deg, #F40C1F, #C40817)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/allpages/register"
                  className="mcn-cta-outline"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#1A1816",
                    border: "1px solid rgba(26,24,22,0.14)",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <UserPlus size={15} /> Register
                </Link>
                <Link
                  href="/allpages/login"
                  className="mcn-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "linear-gradient(135deg, #F40C1F, #C40817)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <LogIn size={15} /> Login
                </Link>
              </>
            )}
          </div>

          <button
            className="mcn-toggle"
            onClick={() => setOpen(!open)}
            style={{ display: "none", background: "transparent", border: "1px solid #ECE9E1", padding: "8px", borderRadius: "10px", cursor: "pointer" }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {/* Scroll progress bar */}
      <div className="mcn-progress-track">
        <div className="mcn-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="mcn-mobile-overlay"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,24,22,0.35)",
            backdropFilter: "blur(2px)",
            zIndex: 90,
          }}
        >
          <div
            className="mcn-mobile-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: "88px",
              left: "16px",
              right: "16px",
              background: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid rgba(26,24,22,0.08)",
              boxShadow: "0 24px 60px -16px rgba(26,24,22,0.25)",
              padding: "14px",
            }}
          >
            {/* Routes: always visible, logged in or not */}
            {NAV_LINKS.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="mcn-mobile-link"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <Icon size={17} /> {link.label}
                </Link>
              );
            })}

            <div style={{ height: "1px", background: "rgba(26,24,22,0.08)", margin: "10px 0" }} />

            {isPending ? null : isLoggedIn ? (
              <div className="mcn-mobile-actions">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="mcn-cta-outline"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    color: "#1A1816",
                    border: "1px solid rgba(26,24,22,0.14)",
                    borderRadius: "999px",
                    padding: "12px 18px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <User size={16} /> Profile
                </Link>
                <button
                  className="mcn-cta"
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    background: "linear-gradient(135deg, #F40C1F, #C40817)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "999px",
                    padding: "12px 18px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="mcn-mobile-actions">
                <Link
                  href="/allpages/register"
                  onClick={() => setOpen(false)}
                  className="mcn-cta-outline"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    color: "#1A1816",
                    border: "1px solid rgba(26,24,22,0.14)",
                    borderRadius: "999px",
                    padding: "12px 18px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <UserPlus size={16} /> Register
                </Link>
                <Link
                  href="/allpages/login"
                  onClick={() => setOpen(false)}
                  className="mcn-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    background: "linear-gradient(135deg, #F40C1F, #C40817)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "999px",
                    padding: "12px 18px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <LogIn size={16} /> Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}