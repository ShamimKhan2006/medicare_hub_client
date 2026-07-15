"use client"

export default function Loading() {
  return (
    <div
      className="mc-load-screen"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
      }}
    >
      <div
        className="mc-load-mark"
        style={{
          position: "relative",
          width: 64,
          height: 64,
          minWidth: 64,
          minHeight: 64,
          maxWidth: 64,
          maxHeight: 64,
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 26 26"
          width="64"
          height="64"
          fill="none"
          className="mc-load-ring"
          style={{
            position: "absolute",
            inset: 0,
            width: 64,
            height: 64,
            display: "block",
          }}
        >
          <circle cx="13" cy="13" r="12" stroke="#E8324A" strokeWidth="1.4" />
        </svg>
        <svg
          viewBox="0 0 26 26"
          width="64"
          height="64"
          fill="none"
          className="mc-load-pulse-icon"
          style={{
            position: "absolute",
            inset: 0,
            width: 64,
            height: 64,
            display: "block",
          }}
        >
          <path
            d="M4 13H9L11 8L14.5 18L17 13H22"
            stroke="#E8324A"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        className="mc-load-track"
        style={{
          width: 220,
          height: 44,
          maxWidth: 220,
          maxHeight: 44,
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 300 60"
          width="220"
          height="44"
          preserveAspectRatio="none"
          style={{ width: 220, height: 44, display: "block" }}
        >
          <path
            className="mc-load-line"
            d="M0,30 L60,30 L75,8 L90,52 L105,16 L120,30 L180,30 L195,12 L210,48 L225,30 L300,30"
          />
        </svg>
      </div>

      <p
        className="mc-load-text"
        style={{
          fontFamily: "Poppins, Inter, sans-serif",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#14213D",
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          margin: 0,
        }}
      >
        Preparing your care experience
        <span className="mc-load-dots" style={{ display: "inline-flex", listStyle: "none" }}>
          <span style={{ listStyle: "none" }}>.</span>
          <span style={{ listStyle: "none" }}>.</span>
          <span style={{ listStyle: "none" }}>.</span>
        </span>
      </p>

      <style jsx>{`
        .mc-load-ring {
          opacity: 0.35;
          animation: mc-load-spin 2.4s linear infinite;
        }

        .mc-load-pulse-icon {
          animation: mc-load-beat 1.4s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes mc-load-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes mc-load-beat {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
          25% {
            transform: scale(1.12);
            opacity: 1;
          }
          40% {
            transform: scale(0.96);
            opacity: 0.85;
          }
        }

        .mc-load-line {
          fill: none;
          stroke: #e8324a;
          stroke-width: 2;
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: mc-load-draw 2.6s ease-in-out infinite;
        }

        @keyframes mc-load-draw {
          0% {
            stroke-dashoffset: 600;
          }
          55% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -600;
          }
        }

        .mc-load-dots > span {
          animation: mc-load-fade 1.4s infinite;
          opacity: 0;
          list-style: none;
        }

        .mc-load-dots > span:nth-child(1) {
          animation-delay: 0s;
        }
        .mc-load-dots > span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .mc-load-dots > span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes mc-load-fade {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mc-load-ring,
          .mc-load-pulse-icon,
          .mc-load-line,
          .mc-load-dots > span {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}