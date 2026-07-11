"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Lock,

   Newspaper,
  PlusCircle,
  FileText,
  Activity,
  Settings,
  LogOut,
  User,
  Home,
  Info,
  Mail,
//   Info,
//   Mail,
} from "lucide-react";
// import { CustomTrigger } from "./CustomTrigger";

interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}



const PRIVATE_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Add Health Post", href: "/health-posts/new", icon: PlusCircle },
  { label: "Health Posts", href: "/allpages/allData", icon: Newspaper },
  { label: "My Health Posts", href: "", icon: FileText },
   { label: "About", href: "/about", icon: Info },
   { label: "Contact", href: "/contact", icon: Mail },
  { label: "My Interactions", href: "/my-interactions", icon: Activity },
];

export default function MedicardHubNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
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

  const navItems = isLoggedIn ? [] :[...PRIVATE_LINKS];

  return (
    <div style={{ fontFamily: "'Sora', 'Inter', sans-serif", width: "100%", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500&display=swap');
        .mcn-link { position:relative; transition: color .25s ease; text-decoration:none; display:flex; align-items:center; gap:6px; letter-spacing:0.01em; }
        .mcn-link::after { content:""; position:absolute; left:0; bottom:-6px; width:0; height:2px; background:linear-gradient(90deg,#F40C1F,#FF5A3C); border-radius:2px; transition: width .25s cubic-bezier(.2,.7,.3,1); }
        .mcn-link:hover { color:#1A1816; }
        .mcn-link:hover::after { width:100%; }
        .mcn-cta { transition: transform .15s ease, box-shadow .25s ease, filter .2s ease; box-shadow: 0 10px 24px -10px rgba(244,12,31,0.55); }
        .mcn-cta:hover { filter:brightness(1.06); box-shadow: 0 14px 30px -10px rgba(244,12,31,0.65); transform: translateY(-1px); }
        .mcn-dropdown { animation: mcnDrop .18s ease both; }
        @keyframes mcnDrop { from { opacity:0; transform: translateY(-8px);} to { opacity:1; transform: translateY(0);} }
        .mcn-dd-item { transition: background .15s ease; text-decoration:none; border-radius:10px; display:flex; align-items:center; gap:10px; padding:12px 16px; font-size:13.5px; color:#1A1816; }
        .mcn-dd-item:hover { background: #F4F1EA; }
        @media (max-width: 900px) { .mcn-desktop-links, .mcn-desktop-actions { display: none !important; } .mcn-toggle { display: flex !important; } }
      `}</style>

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px", background: "rgba(255,255,255,0.78)", backdropFilter: "blur(14px)", border: "1px solid rgba(26,24,22,0.08)", borderRadius: "18px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <span style={{ width: "32px", height: "32px", borderRadius: "10px", border: "1px solid #1A1816", display: "grid", gridTemplateColumns: "repeat(3, 4px)", gap: "3px", padding: "7px", background: "#FFFFFF" }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} style={{ width: "4px", height: "4px", borderRadius: "1px", background: i === 4 ? "#F40C1F" : "#1A1816" }} />
            ))}
          </span>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#1A1816" }}>MediCard<sup style={{ fontSize: "10px", color: "#F40C1F" }}>HUB</sup></span>
        </Link>

        <div className="mcn-desktop-links" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {navItems.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.label} href={link.href} className="mcn-link" style={{ fontSize: "13.5px", fontWeight: 500, color: "#5C5850" }}>
                <Icon size={15} /> {link.label}
                {PRIVATE_LINKS.includes(link) && <Lock size={11} color="#B7B2A6" />}
              </Link>
            );
          })}
        </div>

        <div className="mcn-desktop-actions" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {!isLoggedIn ? (
            <button className="mcn-cta" onClick={() => setIsLoggedIn(true)} style={{ background: "linear-gradient(135deg, #F40C1F, #C40817)", color: "#FFFFFF", border: "none", borderRadius: "999px", padding: "10px 20px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
               Logout
            </button>
          ) : (
            <div ref={profileRef} style={{ position: "relative" }}>
              <button onClick={() => setProfileOpen(!profileOpen)} style={{ display: "flex", alignItems: "center", gap: "9px", background: "transparent", border: "1px solid rgba(26,24,22,0.1)", borderRadius: "999px", padding: "5px 14px 5px 5px", cursor: "pointer" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1A1816", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={14} /></div>
                <span style={{ fontSize: "13px", fontWeight: 600 }}>Sumaiya</span>
                <ChevronDown size={14} style={{ transform: profileOpen ? "rotate(180deg)" : "none" }} />
              </button>
              
            </div>
          )}
        </div>

        <button className="mcn-toggle" onClick={() => setOpen(!open)} style={{ display: "none", background: "transparent", border: "1px solid #ECE9E1", padding: "8px", borderRadius: "10px", cursor: "pointer" }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {/* Mobile Menu logic (same structure as above with Links) would go here */}
    </div>
  );
}



