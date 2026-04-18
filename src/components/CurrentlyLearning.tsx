"use client"

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COURSES = [
  {
    id: "01",
    platform: "PW Skills",
    course: "Full Stack Data Science",
    desc: "End-to-end data science from Python fundamentals to deploying ML models in production. Covers statistics, ML algorithms, deep learning, and NLP.",
    tags: ["Python", "ML", "Deep Learning", "NLP", "Statistics", "SQL"],
    status: "In Progress",
    done: false,
  },
  {
    id: "02",
    platform: "CodeWithHarry",
    course: "Data Science Fundamentals",
    desc: "Hands-on Python for data science. Building solid foundations in data wrangling, visualization, and exploratory data analysis.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "EDA"],
    status: "In Progress",
    done: false,
  },
  {
    id: "03",
    platform: "Anthropic",
    course: "AI & LLM Engineering",
    desc: "Prompt engineering, Claude API integration, RAG pipelines, and responsible AI development with large language models.",
    tags: ["Claude API", "Prompt Engineering", "RAG", "LLMs", "AI Safety"],
    status: "In Progress",
    done: false,
  },
  {
    id: "04",
    platform: "NVIDIA",
    course: "Introduction to CUDA",
    desc: "GPU-accelerated parallel computing with CUDA. Covers GPU architecture, memory management, and high-performance computation patterns.",
    tags: ["CUDA", "GPU Computing", "Parallel Programming", "C++"],
    status: "Completed",
    done: true,
  },
];

const TICKER_ITEMS = [
  "Python", "Machine Learning", "Deep Learning", "CUDA", "LLMs", "RAG Pipelines",
  "Prompt Engineering", "Data Science", "NLP", "NumPy", "Pandas", "Claude API",
  "GPU Computing", "Scikit-learn", "Neural Networks", "Statistics",
];

const CurrentlyLearning = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tickerInnerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".learn-header", {
      opacity: 0, y: 60,
      duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ".learn-header", start: "top 85%" },
    });

    // Stats bar slide in
    gsap.from(".learn-stat", {
      opacity: 0, x: 30, stagger: 0.1, duration: 0.9, ease: "power2.out",
      scrollTrigger: { trigger: ".learn-stats-row", start: "top 85%" },
    });

    // Animated divider line draw
    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scaleX: 0, transformOrigin: "left",
        duration: 1.4, ease: "power3.inOut",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
      });
    }

    // Cards: staggered clip-path + y entrance
    gsap.from(".learn-card", {
      clipPath: "inset(0 0 100% 0)",
      opacity: 0, y: 30,
      duration: 1.1, stagger: 0.13, ease: "power3.out",
      scrollTrigger: { trigger: ".learn-grid", start: "top 78%" },
    });

    // Glowing pulse on "In Progress" dots
    gsap.to(".learn-pulse", {
      opacity: 0.2, scale: 1.6,
      duration: 1, ease: "sine.inOut",
      repeat: -1, yoyo: true, stagger: 0.4,
    });

    // Infinite ticker scroll
    if (tickerInnerRef.current) {
      const totalWidth = tickerInnerRef.current.scrollWidth / 2;
      gsap.to(tickerInnerRef.current, {
        x: -totalWidth, duration: 28, ease: "none", repeat: -1,
      });
    }

    // Scan-line on each card (sequential)
    gsap.utils.toArray<HTMLElement>(".learn-scan").forEach((scan, i) => {
      gsap.fromTo(scan,
        { top: "-100%" },
        {
          top: "110%", duration: 2, ease: "none",
          delay: i * 0.3,
          scrollTrigger: { trigger: scan.parentElement, start: "top 80%" },
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} style={{
      background: "#060606",
      padding: "clamp(60px, 10vw, 120px) clamp(16px, 5vw, 80px) 0",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Dot grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,127,62,0.07) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "10%", right: "5%",
        width: "600px", height: "600px", pointerEvents: "none", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,127,62,0.05) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "0%",
        width: "400px", height: "400px", pointerEvents: "none", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,220,100,0.03) 0%, transparent 70%)",
      }} />

      {/* ── Header ── */}
      <div className="learn-header" style={{ marginBottom: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ width: "30px", height: "2px", background: "#FF7F3E" }} />
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "11px",
            color: "#FF7F3E", letterSpacing: "0.4em", textTransform: "uppercase",
          }}>
            Upskilling
          </span>
        </div>

        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(40px, 6vw, 80px)", color: "#f0ede6",
          margin: "0 0 20px 0", letterSpacing: "-0.03em", lineHeight: 0.95,
        }}>
          Never Stop<br />
          <span style={{ color: "#FF7F3E" }}>Learning.</span>
        </h2>

        <p style={{
          fontSize: "14px", color: "rgba(240,237,230,0.4)",
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.04em", maxWidth: "460px", lineHeight: 1.8,
        }}>
          Actively expanding into data science, AI engineering, and GPU computing — building real things while studying.
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="learn-stats-row" style={{
        display: "flex", gap: "40px", marginBottom: "50px",
        flexWrap: "wrap",
      }}>
        {[
          { val: "4", label: "Courses Enrolled" },
          { val: "3", label: "In Progress" },
          { val: "1", label: "Completed" },
        ].map(({ val, label }) => (
          <div key={label} className="learn-stat" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(28px, 3.5vw, 48px)", color: "#FF7F3E", lineHeight: 1,
            }}>
              {val}
            </span>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: "10px",
              color: "rgba(240,237,230,0.3)", letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Animated divider */}
      <div ref={lineRef} style={{
        height: "1px", background: "linear-gradient(to right, #FF7F3E, rgba(255,127,62,0.1), transparent)",
        marginBottom: "50px",
      }} />

      {/* ── Cards Grid ── */}
      <div className="learn-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(290px, 100%), 1fr))",
        gap: "20px",
        marginBottom: "80px",
      }}>
        {COURSES.map((course) => (
          <div
            key={course.id}
            className="learn-card"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${course.done ? "rgba(109,222,109,0.12)" : "rgba(255,255,255,0.05)"}`,
              borderRadius: "20px",
              padding: "36px",
              display: "flex", flexDirection: "column", gap: "18px",
              position: "relative", overflow: "hidden",
              clipPath: "inset(0 0 0% 0)",
              transition: "transform 0.4s ease, background 0.4s ease, border-color 0.4s ease",
              cursor: "default",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = course.done ? "rgba(109,222,109,0.28)" : "rgba(255,127,62,0.22)";
              el.style.transform = "translateY(-8px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.02)";
              el.style.borderColor = course.done ? "rgba(109,222,109,0.12)" : "rgba(255,255,255,0.05)";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Inner radial glow */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `radial-gradient(ellipse at top left, ${course.done ? "rgba(109,222,109,0.04)" : "rgba(255,127,62,0.05)"} 0%, transparent 60%)`,
            }} />

            {/* Scan-line sweep */}
            <div className="learn-scan" style={{
              position: "absolute", left: 0, right: 0, height: "60px",
              background: `linear-gradient(to bottom, transparent, ${course.done ? "rgba(109,222,109,0.04)" : "rgba(255,127,62,0.05)"}, transparent)`,
              pointerEvents: "none", top: "-100%",
            }} />

            {/* ID + Status badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: "52px", color: "rgba(255,255,255,0.04)",
                lineHeight: 1, userSelect: "none",
              }}>
                {course.id}
              </span>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: "10px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: course.done ? "#6dde6d" : "#FF7F3E",
                background: course.done ? "rgba(109,222,109,0.07)" : "rgba(255,127,62,0.07)",
                border: `1px solid ${course.done ? "rgba(109,222,109,0.18)" : "rgba(255,127,62,0.18)"}`,
                borderRadius: "100px", padding: "5px 12px",
                display: "flex", alignItems: "center", gap: "7px",
                flexShrink: 0,
              }}>
                {!course.done && (
                  <span className="learn-pulse" style={{
                    display: "inline-block", width: "6px", height: "6px",
                    borderRadius: "50%", background: "#FF7F3E", flexShrink: 0,
                  }} />
                )}
                {course.status}
              </span>
            </div>

            {/* Platform + Title */}
            <div>
              <p style={{
                fontFamily: "'Space Mono', monospace", fontSize: "10px",
                color: "rgba(255,127,62,0.65)", letterSpacing: "0.22em",
                textTransform: "uppercase", margin: "0 0 8px 0",
              }}>
                {course.platform}
              </p>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: "clamp(18px, 1.8vw, 24px)", color: "#f0ede6",
                margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2,
              }}>
                {course.course}
              </h3>
            </div>

            {/* Description */}
            <p style={{
              fontSize: "13px", color: "rgba(240,237,230,0.38)",
              lineHeight: 1.8, margin: 0,
            }}>
              {course.desc}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "auto" }}>
              {course.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "10px",
                  color: "rgba(240,237,230,0.3)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "4px", padding: "4px 10px",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Scrolling Ticker ── */}
      <div style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding: "20px 0",
        marginLeft: "-5vw", marginRight: "-5vw",
      }}>
        <div ref={tickerInnerRef} style={{ display: "flex", width: "max-content" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: "11px",
                color: "rgba(240,237,230,0.2)", letterSpacing: "0.22em",
                textTransform: "uppercase", whiteSpace: "nowrap",
                padding: "0 30px",
              }}>
                {item}
              </span>
              <span style={{ color: "#FF7F3E", opacity: 0.35, fontSize: "7px", flexShrink: 0 }}>◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentlyLearning;
