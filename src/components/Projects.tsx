"use client"

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PROJECTS } from '../lib/projects';

gsap.registerPlugin(ScrollTrigger);

// Mock Next.js Image for Vite environment
const Image = ({ src, alt, fill, style, sizes }: { src: string, alt: string, fill?: boolean, style?: any, sizes?: string }) => (
  <img
    src={src}
    alt={alt}
    sizes={sizes}
    style={{
      ...(fill ? { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' } : {}),
      ...style
    }}
  />
);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current || !sectionRef.current) return;

    // 1. Horizontal scroll tween
    const tween = gsap.to(trackRef.current, {
      x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${trackRef.current!.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 5,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      }
    });

    // Per-card animations
    const cards = trackRef.current.querySelectorAll(".proj-card");
    cards.forEach((card, i) => {
      const img = card.querySelector(".proj-img-wrap");
      const title = card.querySelector(".proj-title");
      const desc = card.querySelector(".proj-desc");
      const tags = card.querySelectorAll(".proj-tag");
      const cta = card.querySelector(".proj-cta");

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tween,
        start: "left 60%",
        onEnter: () => {
          if (counterRef.current) {
            counterRef.current.textContent =
              `${String(i + 1).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}`;
          }
        },
        onEnterBack: () => {
          if (counterRef.current) {
            counterRef.current.textContent =
              `${String(i + 1).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}`;
          }
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          containerAnimation: tween,
          start: "left 85%",
          end: "left 25%",
          scrub: true,
        }
      })
        .fromTo(img, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "power2.out" })
        .fromTo(title, { y: 60, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.4")
        .fromTo(desc, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.3")
        .fromTo(tags, { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05 }, "-=0.25")
        .fromTo(cta, { opacity: 0 }, { opacity: 1 }, "-=0.15");
    });

    // Refresh after layout settles to account for Hero pinning
    const timer = setTimeout(() => ScrollTrigger.refresh(), 2000);

    const fullRefresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', fullRefresh);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', fullRefresh);
    };

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="projects-section" style={{ position: "relative", background: "#000000", overflow: "hidden", marginTop: "-1px" }}>
      <style>{`
        .proj-card {
          width: 90vw;
          max-width: 1200px;
          height: 85vh;
          flex-shrink: 0;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 5vw;
          align-items: center;
          position: relative;
        }
        .proj-img-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
          box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.5);
        }
        .proj-img-wrap {
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .proj-card:hover .proj-img-wrap {
          transform: scale(1.08);
        }
        .proj-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%);
          opacity: 1;
          transition: opacity 0.6s ease;
          z-index: 10;
        }
        .proj-card:hover .proj-overlay {
          opacity: 0.4;
        }
        .proj-num-bg {
          position: absolute;
          top: -30px;
          right: -20px;
          font-family: 'Syne', sans-serif;
          font-size: clamp(100px, 15vw, 200px);
          font-weight: 800;
          color: rgba(255,255,255,0.02);
          line-height: 0.8;
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Persistent top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "40px 5vw", zIndex: 30,
        pointerEvents: "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ width: "30px", height: "2px", background: "#FF7F3E" }} />
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "12px",
            letterSpacing: "0.4em", textTransform: "uppercase",
            color: "#FF7F3E",
          }}>
            Portfolio
          </span>
        </div>
        <span ref={counterRef} style={{
          fontFamily: "'Space Mono', monospace", fontSize: "14px",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em"
        }}>
          01 / 05
        </span>
      </div>

      {/* Track */}
      <div ref={trackRef} style={{
        display: "flex", height: "100vh",
        alignItems: "center", willChange: "transform",
        paddingLeft: "10vw",
        width: "max-content"
      }}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.num}
            className="proj-card"
            style={{
              paddingRight: i === PROJECTS.length - 1 ? "10vw" : "5vw",
            }}
          >
            {/* IMAGE — left col */}
            <div className="proj-img-container">
              <div className="proj-img-wrap" style={{ clipPath: "inset(0 100% 0 0)" }}>
                <Image
                  src={p.image} alt={p.title}
                  fill style={{ objectFit: "cover" }}
                  sizes="60vw"
                />
                <div className="proj-overlay" />
              </div>
              {/* Fallback pattern */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, #121212 0%, #050505 100%)`,
                zIndex: -1
              }} />
            </div>

            {/* TEXT — right col */}
            <div style={{
              display: "flex", flexDirection: "column",
              gap: "24px", position: "relative",
              zIndex: 20
            }}>
              <div className="proj-num-bg">{p.num}</div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "12px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#FF7F3E",
                  background: "rgba(255, 127, 62, 0.05)",
                  padding: "4px 10px",
                  borderRadius: "4px"
                }}>
                  {p.category}
                </span>
              </div>

              <h3 className="proj-title" style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(36px, 4vw, 64px)",
                fontWeight: 800, color: "#f0ede6",
                letterSpacing: "-0.03em", lineHeight: 1,
                margin: 0, opacity: 0,
              }}>
                {p.title}
              </h3>

              <p className="proj-desc" style={{
                fontSize: "16px",
                color: "rgba(240, 237, 230, 0.5)",
                lineHeight: 1.8, margin: 0,
                maxWidth: "480px", opacity: 0,
              }}>
                {p.desc}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {p.tags.map(tag => (
                  <span key={tag} className="proj-tag" style={{
                    fontFamily: "'Space Mono', monospace", fontSize: "11px",
                    color: "rgba(240, 237, 230, 0.4)",
                    letterSpacing: "0.05em",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "100px", padding: "6px 16px",
                    opacity: 0,
                    transition: "all 0.3s ease",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: "10px" }}>
                <a href={p.href} className="proj-cta" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "14px",
                  color: "#FF7F3E", textDecoration: "none",
                  letterSpacing: "0.1em",
                  display: "inline-flex", alignItems: "center",
                  gap: "12px", opacity: 0,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: "10px 0"
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.letterSpacing = "0.2em";
                    e.currentTarget.style.gap = "20px";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.letterSpacing = "0.1em";
                    e.currentTarget.style.gap = "12px";
                  }}
                >
                  Explore Project <span style={{ fontSize: "18px" }}>→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "2px", background: "rgba(255,255,255,0.03)",
        zIndex: 30,
      }}>
        <div ref={progressRef} style={{
          height: "100%", background: "#FF7F3E",
          transformOrigin: "left", transform: "scaleX(0)",
          willChange: "transform",
        }} />
      </div>
    </div>
  );
};

export default Projects;
