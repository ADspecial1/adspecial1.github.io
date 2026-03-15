"use client"

import React from 'react';

const ITEMS1 = [
  "React", "Next.js", "TypeScript", "Node.js", "GSAP",
  "Three.js", "WebGL", "Tailwind", "PostgreSQL", "Docker",
  "Vercel", "AWS"
];

const ITEMS2 = [
  "Figma", "Framer Motion", "Supabase", "Prisma",
  "GitHub Actions", "Redis", "GraphQL", "React Native",
  "Expo", "Rust", "WASM", "Storybook"
];

const Item = (item: string, i: number) => (
  <React.Fragment key={i}>
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "11px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "rgba(240,237,230,0.25)",
      padding: "0 4px",
      whiteSpace: "nowrap",
      transition: "color 0.2s",
      cursor: "default",
    }}
    onMouseEnter={e => e.currentTarget.style.color = "#f0ede6"}
    onMouseLeave={e => e.currentTarget.style.color = "rgba(240,237,230,0.25)"}
    >
      {item}
    </span>
    <span style={{ color: "#c8f564", opacity: 0.35, margin: "0 16px" }}>✦</span>
  </React.Fragment>
);

const TechMarquee = () => {
  return (
    <section style={{
      background: "#0d0d0d",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "16px 0",
      overflow: "hidden",
      width: "100%",
    }}>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .row-left { 
          animation: marquee-left 25s linear infinite; 
          display: flex;
          width: max-content;
          align-items: center;
          gap: 0;
        }
        .row-right { 
          animation: marquee-right 35s linear infinite; 
          display: flex;
          width: max-content;
          align-items: center;
          gap: 0;
        }
        .row-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .row-wrapper + .row-wrapper { margin-top: 10px; }
      `}</style>
      
      <div className="row-wrapper">
        <div className="row-left">
          {[...ITEMS1, ...ITEMS1, ...ITEMS1].map((item, i) => Item(item, i))}
        </div>
      </div>
      
      <div className="row-wrapper">
        <div className="row-right">
          {[...ITEMS2, ...ITEMS2, ...ITEMS2].map((item, i) => Item(item, i))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
