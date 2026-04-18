"use client"

import { useRef } from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const STEPS = [
  {
    id: "01",
    title: "Research",
    icon: Search,
    desc: "Deep dive into problem space, user needs, and technical feasibility.",
    tags: ["Market Analysis", "User Personas", "Technical Audit"]
  },
  {
    id: "02",
    title: "Design",
    icon: PenTool,
    desc: "High-fidelity prototyping, motion design, and architectural planning.",
    tags: ["Figma", "Motion Docs", "UI Patterns"]
  },
  {
    id: "03",
    title: "Development",
    icon: Code2,
    desc: "Clean, performant code using cutting-edge frameworks and libraries.",
    tags: ["React/Next.js", "GSAP", "Three.js"]
  },
  {
    id: "04",
    title: "Optimization",
    icon: Rocket,
    desc: "Meticulous tuning for speed, accessibility, and cinematic finesse.",
    tags: ["Lighthouse", "SEO", "Perf Audits"]
  }
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".process-card");
    
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      style={{
        background: "#080808",
        padding: "clamp(60px, 10vw, 120px) clamp(16px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ marginBottom: "80px" }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "12px",
          color: "#FF7F3E",
          letterSpacing: "0.4em",
          textTransform: "uppercase"
        }}>
          Workflow
        </span>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(32px, 5vw, 64px)",
          fontWeight: 800,
          color: "#f0ede6",
          margin: "12px 0 0 0",
          letterSpacing: "-0.02em"
        }}>
          The Creative Process
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "30px"
      }}>
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div 
              key={step.id}
              className="process-card"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "20px",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div 
                className="step-id"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "30px",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.03)",
                  userSelect: "none"
                }}
              >
                {step.id}
              </div>

              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                background: "rgba(255, 127, 62, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FF7F3E"
              }}>
                <Icon size={24} />
              </div>

              <div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#f0ede6",
                  margin: "0 0 12px 0"
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: "rgba(240, 237, 230, 0.45)",
                  margin: 0
                }}>
                  {step.desc}
                </p>
              </div>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "auto"
              }}>
                {step.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: "10px",
                    fontFamily: "'Space Mono', monospace",
                    color: "rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.03)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <style>{`
                .process-card:hover {
                  background: rgba(255, 255, 255, 0.04);
                  border-color: rgba(255, 127, 62, 0.2);
                  transform: translateY(-5px);
                }
                .process-card:hover h3 {
                  color: #FF7F3E !important;
                }
                .process-card:hover .step-id {
                  color: rgba(255, 127, 62, 0.05) !important;
                }
              `}</style>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Process;
