"use client"

import { useRef, useEffect } from 'react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Framer, 
  Github, 
  Globe, 
  Layers, 
  Layout, 
  MessageSquare, 
  Smartphone, 
  Zap,
  Box,
  Palette,
  Cloud,
  FileCode,
  Terminal,
  Activity,
  Wind,
  Server,
  Component
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS1 = [
  { name: "React", icon: Code2, desc: "Fast UI architecture" },
  { name: "Next.js", icon: Globe, desc: "Optimized performance" },
  { name: "TypeScript", icon: FileCode, desc: "Type-safe scalability" },
  { name: "Node.js", icon: Server, desc: "Scalable backend logic" },
  { name: "GSAP", icon: Activity, desc: "Silky smooth motion" },
  { name: "Three.js", icon: Box, desc: "3D web experiences" },
  { name: "WebGL", icon: Cpu, desc: "GPU-accelerated graphics" },
  { name: "Tailwind", icon: Wind, desc: "Rapid utility styling" },
  { name: "PostgreSQL", icon: Database, desc: "Robust relational data" },
  { name: "Docker", icon: Layers, desc: "Containerized deployment" },
  { name: "Vercel", icon: Cloud, desc: "Edge-ready hosting" },
  { name: "AWS", icon: Server, desc: "Cloud infrastructure" },
];

const ITEMS2 = [
  { name: "Figma", icon: Palette, desc: "Interface design mastery" },
  { name: "Framer Motion", icon: Framer, desc: "Declarative animations" },
  { name: "Supabase", icon: Database, desc: "Open-source backend" },
  { name: "Prisma", icon: FileCode, desc: "Type-safe ORM" },
  { name: "GitHub", icon: Github, desc: "DevOps automation" },
  { name: "Redis", icon: Zap, desc: "Lightning-fast caching" },
  { name: "GraphQL", icon: MessageSquare, desc: "Efficient data querying" },
  { name: "React Native", icon: Smartphone, desc: "Cross-platform mobile" },
  { name: "Expo", icon: Layout, desc: "Accelerated development" },
  { name: "Rust", icon: Terminal, desc: "Performance & safety" },
  { name: "WASM", icon: Component, desc: "Near-native speed" },
  { name: "Storybook", icon: Box, desc: "Component isolation" },
];

const TechCard = ({ item }: { item: typeof ITEMS1[0] }) => {
  const Icon = item.icon;
  return (
    <div className="tech-card-wrapper" style={{ padding: "0 15px" }}>
      <div 
        className="tech-card"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "24px",
          width: "280px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          cursor: "default",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div 
          className="glow-effect"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(255, 127, 62, 0.15) 0%, transparent 70%)",
            opacity: 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none"
          }}
        />
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            background: "rgba(255, 127, 62, 0.1)",
            borderRadius: "10px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FF7F3E"
          }}>
            <Icon size={20} />
          </div>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "#f0ede6"
          }}>
            {item.name}
          </span>
        </div>
        
        <p style={{
          fontSize: "12px",
          lineHeight: "1.5",
          color: "rgba(240, 237, 230, 0.45)",
          margin: 0
        }}>
          {item.desc}
        </p>

        <style>{`
          .tech-card:hover {
            transform: translateY(-8px) scale(1.05);
            border-color: rgba(255, 127, 62, 0.3);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          }
          .tech-card:hover .glow-effect {
            opacity: 1;
          }
          .tech-card:hover span {
            color: #FF7F3E !important;
          }
        `}</style>
      </div>
    </div>
  );
};

const TechBillboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // Small delay to ensure browser has calculated widths
    const timer = setTimeout(() => {
      const createHorizontalLoop = (row: HTMLDivElement, direction: number, speed: number) => {
        const totalWidth = row.scrollWidth / 3;
        
        // Initial setup - Row 2 starts offset to the left
        gsap.set(row, { x: direction === 1 ? -totalWidth : 0 });

        const anim = gsap.to(row, {
          x: direction === -1 ? -totalWidth : 0,
          duration: speed,
          ease: "none",
          repeat: -1,
          onUpdate: function() {
            // Manual wrap check to ensure perfection
            const currentX = gsap.getProperty(row, "x") as number;
            if (direction === -1 && currentX <= -totalWidth) {
              gsap.set(row, { x: 0 });
            } else if (direction === 1 && currentX >= 0) {
              gsap.set(row, { x: -totalWidth });
            }
          }
        });

        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity() / 700);
            gsap.to(anim, { timeScale: 1 + velocity, duration: 0.4 });
          }
        });

        return () => {
          anim.kill();
          st.kill();
        };
      };

      const cleanup1 = createHorizontalLoop(row1Ref.current!, -1, 35);
      const cleanup2 = createHorizontalLoop(row2Ref.current!, 1, 45);

      return () => {
        cleanup1();
        cleanup2();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        background: "#080808",
        padding: "100px 0",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "40px"
      }}
    >
      <div className="section-header" style={{ padding: "0 5vw", marginBottom: "20px" }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(32px, 5vw, 64px)",
          fontWeight: 800,
          color: "#f0ede6",
          margin: 0
        }}>
          Tech Ecosystem
        </h2>
        <div style={{
          width: "60px",
          height: "4px",
          background: "#FF7F3E",
          marginTop: "16px"
        }} />
      </div>

      <div className="marquee-container" style={{ width: "100%", overflow: "hidden" }}>
        <div 
          ref={row1Ref} 
          style={{ display: "flex", width: "max-content", willChange: "transform" }}
        >
          {[...ITEMS1, ...ITEMS1, ...ITEMS1].map((item, i) => (
            <TechCard key={`r1-${i}`} item={item} />
          ))}
        </div>
      </div>
      
      <div className="marquee-container" style={{ width: "100%", overflow: "hidden" }}>
        <div 
          ref={row2Ref} 
          style={{ display: "flex", width: "max-content", willChange: "transform" }}
        >
          {[...ITEMS2, ...ITEMS2, ...ITEMS2].map((item, i) => (
            <TechCard key={`r2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechBillboard;
