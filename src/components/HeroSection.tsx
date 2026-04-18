import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const ch1Ref = useRef<HTMLDivElement>(null);
    const ch2Ref = useRef<HTMLDivElement>(null);
    const ch3Ref = useRef<HTMLDivElement>(null);
    const ch4Ref = useRef<HTMLDivElement>(null);
    const ch5Ref = useRef<HTMLDivElement>(null);
    const ch6Ref = useRef<HTMLDivElement>(null);
    const lastFrame = useRef(-1);

    // ── Helpers defined outside useEffect so they're stable ──────────────
    const getChapterOpacity = (frame: number, start: number, end: number, fadeFrames = 6): number => {
        if (frame < start || frame > end) return 0;
        // Special case: if it's the first chapter (start=0), it's visible from frame 0 (no fade-in)
        if (start === 0 && frame < fadeFrames) return 1;
        if (frame < start + fadeFrames) return (frame - start) / fadeFrames;
        if (frame > end - fadeFrames) return (end - frame) / fadeFrames;
        return 1;
    };

    const getChapterY = (frame: number, start: number, end: number) => {
        const progress = (frame - start) / (end - start);

        if (progress < 0) return 60;
        if (progress > 1) return -60;

        // Special case: if it's the first chapter, start at 0 (center) instead of 60 (bottom)
        if (start === 0) {
            return progress * -100; // travel 0 -> -100
        }

        return 60 - progress * 120; // travel 60 -> -60
    };

    useEffect(() => {
        // ── Fade-in effect for hero container ──
        if (containerRef.current) {
            containerRef.current.style.opacity = '0';
            containerRef.current.style.transition = 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)';
            setTimeout(() => {
                if (containerRef.current) containerRef.current.style.opacity = '1';
            }, 100); // slight delay to ensure mount
        }
        // ── 1. Set ALL chapters invisible immediately (prevents flash) ────
        [ch1Ref, ch2Ref, ch3Ref, ch4Ref, ch5Ref, ch6Ref].forEach(ref => {
            if (ref.current) {
                ref.current.style.opacity = "0";
                ref.current.style.transition = "none"; // no CSS transition fighting JS
            }
        });

        // ── 2. Initialize Lenis ───────────────────────────────────────────
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            syncTouch: true,
        });

        lenis.on("scroll", ScrollTrigger.update);
        const ticker = (time: number) => { lenis.raf(time * 1000); };
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0, 0);

        // ── 3. Canvas setup ───────────────────────────────────────────────
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            context.resetTransform();
            context.scale(dpr, dpr);
            render();
        };

        function drawImageProp(ctx: CanvasRenderingContext2D, img: HTMLImageElement, offsetX = 0.5, offsetY = 0.5) {
            const w = window.innerWidth;
            const h = window.innerHeight;
            let iw = img.width, ih = img.height;
            let r = Math.min(w / iw, h / ih);
            let nw = iw * r, nh = ih * r;
            let cx, cy, cw, ch, ar = 1;

            if (nw < w) ar = w / nw;
            if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
            nw *= ar; nh *= ar;

            cw = iw / (nw / w);
            ch = ih / (nh / h);
            cx = (iw - cw) * offsetX;
            cy = (ih - ch) * offsetY;

            if (cx < 0) cx = 0;
            if (cy < 0) cy = 0;
            if (cw > iw) cw = iw;
            if (ch > ih) ch = ih;

            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
        }

        // ── 4. updateChapters — the single source of truth ───────────────
        const RANGES: [number, number][] = [
            [0, 30],
            [31, 60],
            [61, 95],
            [96, 130],
            [131, 165],
            [166, 191]
        ];
        const CHAPTER_REFS = [ch1Ref, ch2Ref, ch3Ref, ch4Ref, ch5Ref, ch6Ref];

        const updateChapters = (frame: number) => {
            CHAPTER_REFS.forEach((ref, i) => {
                if (!ref.current) return;
                const [start, end] = RANGES[i];
                const opacity = getChapterOpacity(frame, start, end);
                ref.current.style.opacity = String(opacity);
                ref.current.style.filter = `blur(${(1 - opacity) * 6}px)`;

                const y = getChapterY(frame, start, end);
                const children = ref.current.querySelectorAll(".chapter-animate");
                children.forEach((child, idx) => {
                    (child as HTMLElement).style.transform = `translateY(${y + idx * 8}px)`;
                });
            });
        };

        // ── 5. Load image sequence ────────────────────────────────────────
        const TOTAL_FRAMES = 192;
        const sequencePath = "/sequence/s4";
        const images: HTMLImageElement[] = [];
        let currentFrameIndex = 0;
        let loadedCount = 0;

        const pad = (n: number, len: number) => String(n).padStart(len, "0");

        const onImageLoad = () => {
            loadedCount++;
            if (loadedCount === 20 || loadedCount === 50 || loadedCount === TOTAL_FRAMES) {
                ScrollTrigger.refresh();
            }
        };

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `${sequencePath}/frame-${pad(i, 3)}.webp`;
            img.onload = onImageLoad;
            images.push(img);
        }

        const render = () => {
            const img = images[currentFrameIndex];
            if (img && img.complete && img.naturalWidth > 0) {
                drawImageProp(context, img);
            } else if (img) {
                img.onload = () => {
                    onImageLoad();
                    render();
                };
            }
        };

        // ── 6. First frame render — poll until loaded ─────────────────────
        const tryRender = () => {
            if (images[0].complete && images[0].naturalWidth > 0) {
                render();
            } else {
                images[0].onload = () => {
                    onImageLoad();
                    render();
                };
                const poll = setInterval(() => {
                    if (images[0].complete && images[0].naturalWidth > 0) {
                        render();
                        clearInterval(poll);
                    }
                }, 100);
                setTimeout(() => clearInterval(poll), 5000);
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        tryRender();

        // ── 7. GSAP Timeline ──────────────────────────────────────────────
        const mm = gsap.context(() => {
            const obj = { frame: 0 };
            const mainTimeline = gsap.timeline({
                onUpdate: () => {
                    const frame = Math.round(obj.frame);
                    if (frame !== lastFrame.current) {
                        lastFrame.current = frame;
                        currentFrameIndex = frame;
                        render();
                        updateChapters(frame);
                    }
                },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=5000",
                    scrub: 0.2, // Reduced scrub for tighter handoff
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    refreshPriority: 10, // Ensure hero is calculated first
                },
            });

            // Phase 1: scrub frames 0 → 181 (90% of scroll)
            mainTimeline.to(obj, { frame: 181, ease: "none", duration: 0.9 }, 0);

            // Phase 2: frames 181 → 191 + cinematic exit (last 10%)
            mainTimeline.to(obj, { frame: TOTAL_FRAMES - 1, ease: "none", duration: 0.1 }, 0.9);
            mainTimeline.to(canvas, {
                scale: 1.15,
                opacity: 0,
                filter: "blur(10px)",
                ease: "power2.inOut",
                duration: 0.1,
            }, 0.9);
        }, containerRef);

        // ── 8. Force chapter 1 visible on mount ───────────────────────────
        updateChapters(0);
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
            updateChapters(0);
        }, 150);

        // ── 9. Cleanup ────────────────────────────────────────────────────
        return () => {
            clearTimeout(refreshTimer);
            window.removeEventListener("resize", resizeCanvas);
            lenis.destroy();
            gsap.ticker.remove(ticker);
            mm.revert(); // Scoped cleanup only!
        };
    }, []);

    return (
        <div ref={containerRef} className="hero-container" style={{ opacity: 1 }}>
            <div className="canvas-container relative">
                <canvas ref={canvasRef} id="hero-canvas" />
            </div>

            {/* ── Cinematic Chapter Overlays ── */}
            <div className="chapter-overlay">

                {/* CHAPTER 1 — The Name */}
                <div ref={ch1Ref} style={{
                    position: "absolute", inset: 0, opacity: 0,
                    willChange: "opacity", padding: "8vw",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                }}>
                    <p className="chapter-animate" style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "11px",
                        color: "#FF7F3E", letterSpacing: "0.35em", textTransform: "uppercase",
                        marginBottom: "8px",
                    }}>
                        CREATIVE DEVELOPER
                    </p>
                    <h1 className="chapter-animate" style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 800,
                        fontSize: "clamp(64px, 9vw, 110px)", color: "#f0ede6",
                        letterSpacing: "-0.03em", lineHeight: 0.9, margin: "10px 0",
                    }}>
                        ASWANI <br /> DUBEY
                    </h1>
                    <p className="chapter-animate" style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "12px",
                        color: "rgba(240,237,230,0.4)", letterSpacing: "0.15em",
                        marginTop: "16px",
                    }}>
                        MUMBAI, INDIA &nbsp;·&nbsp; AVAILABLE FOR WORK
                    </p>
                </div>

                {/* CHAPTER 2 — The Craft */}
                <div ref={ch2Ref} style={{
                    position: "absolute", inset: 0, opacity: 0,
                    willChange: "opacity", display: "flex",
                    flexDirection: "column", justifyContent: "center",
                    alignItems: "center", textAlign: "center", padding: "0 5vw",
                }}>
                    <p className="chapter-animate" style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "11px",
                        color: "#FF7F3E", letterSpacing: "0.35em", textTransform: "uppercase",
                        marginBottom: "20px",
                    }}>
                        WHAT I DO
                    </p>
                    <div className="chapter-animate">
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(40px, 6vw, 88px)", color: "#f0ede6",
                            letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0,
                        }}>
                            I build interfaces
                        </h2>
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(40px, 6vw, 88px)", color: "#f0ede6",
                            letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0,
                        }}>
                            that feel inevitable.
                        </h2>
                    </div>
                    <p className="chapter-animate" style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "12px",
                        color: "rgba(240,237,230,0.35)", letterSpacing: "0.15em",
                        marginTop: "28px",
                    }}>
                        Web Apps &nbsp;·&nbsp; Design Systems &nbsp;·&nbsp; Motion & Interaction
                    </p>
                </div>

                {/* CHAPTER 3 — The Stack */}
                <div ref={ch3Ref} style={{
                    position: "absolute", inset: 0, opacity: 0,
                    willChange: "opacity", padding: "8vw",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                }}>
                    <p className="chapter-animate" style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "11px",
                        color: "#FF7F3E", letterSpacing: "0.35em", textTransform: "uppercase",
                        marginBottom: "8px",
                    }}>
                        TECH EXPERTISE
                    </p>
                    <h2 className="chapter-animate" style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 800,
                        fontSize: "clamp(44px, 6.5vw, 96px)", color: "#f0ede6",
                        margin: "10px 0",
                    }}>
                        React & Next.js
                    </h2>
                    <div className="chapter-animate" style={{
                        display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px",
                    }}>
                        {["React", "Next.js", "TypeScript", "Node.js", "GSAP", "Tailwind"].map(s => (
                            <span key={s} className="chapter-pill">{s}</span>
                        ))}
                    </div>
                    {/* Decorative */}
                    <div style={{
                        position: "absolute", right: "8vw", bottom: "8vh",
                        fontFamily: "'Syne', sans-serif", fontWeight: 800,
                        fontSize: "220px", opacity: 0.04, color: "white",
                        lineHeight: 1, userSelect: "none",
                    }}>
                        {"{ }"}
                    </div>
                </div>

                {/* CHAPTER 4 — React Native */}
                <div ref={ch4Ref} style={{
                    position: "absolute", inset: 0, opacity: 0,
                    willChange: "opacity", padding: "8vw",
                    display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "flex-end", textAlign: "right",
                }}>
                    <p className="chapter-animate" style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "11px",
                        color: "#FF7F3E", letterSpacing: "0.35em", textTransform: "uppercase",
                        marginBottom: "12px",
                    }}>
                        MOBILE DEVELOPMENT
                    </p>
                    <div className="chapter-animate">
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(40px, 5.5vw, 80px)", color: "#f0ede6",
                            lineHeight: 1.05, margin: 0,
                        }}>
                            iOS & Android
                        </h2>
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(40px, 5.5vw, 80px)", color: "#f0ede6",
                            lineHeight: 1.05, margin: 0,
                        }}>
                            with React Native.
                        </h2>
                    </div>
                    <p className="chapter-animate" style={{
                        fontSize: "14px", color: "rgba(240,237,230,0.45)",
                        lineHeight: 1.8, maxWidth: "420px", marginTop: "20px",
                    }}>
                        Building cross-platform apps with smooth 60fps animations,
                        offline-first architecture, and native feel — shipped to both stores.
                    </p>
                    <div className="chapter-animate" style={{
                        display: "flex", gap: "12px", marginTop: "30px",
                        justifyContent: "flex-end", flexWrap: "wrap",
                    }}>
                        {[
                            { val: "2+", label: "APPS LIVE" },
                            { val: "60fps", label: "ANIMATIONS" },
                            { val: "iOS+Android", label: "BOTH STORES" },
                        ].map(({ val, label }) => (
                            <div key={label} className="stat-block">
                                <span style={{
                                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                                    fontSize: "clamp(24px,3vw,40px)", color: "#FF7F3E",
                                    display: "block",
                                }}>
                                    {val}
                                </span>
                                <span style={{
                                    fontFamily: "'Space Mono', monospace", fontSize: "10px",
                                    color: "rgba(240,237,230,0.3)", letterSpacing: "0.2em",
                                    display: "block",
                                }}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CHAPTER 5 — Data Science */}
                <div ref={ch5Ref} style={{
                    position: "absolute", inset: 0, opacity: 0,
                    willChange: "opacity", padding: "8vw",
                    display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "flex-start",
                }}>
                    <div className="chapter-animate" style={{
                        background: "rgba(255,127,62,0.12)",
                        border: "1px solid rgba(255,127,62,0.3)",
                        color: "#FF7F3E",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px", padding: "4px 12px",
                        borderRadius: "100px", marginBottom: "16px",
                        display: "inline-block",
                    }}>
                        🧪 IN PROGRESS
                    </div>
                    <p className="chapter-animate" style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "11px",
                        color: "#FF7F3E", letterSpacing: "0.35em",
                        textTransform: "uppercase", marginBottom: "8px",
                    }}>
                        CURRENTLY LEARNING
                    </p>
                    <div className="chapter-animate">
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(44px, 6.5vw, 96px)", color: "#f0ede6",
                            lineHeight: 1.0, margin: 0,
                        }}>
                            Exploring
                        </h2>
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(44px, 6.5vw, 96px)", color: "#f0ede6",
                            lineHeight: 1.0, margin: 0,
                        }}>
                            Data Science.
                        </h2>
                    </div>
                    <p className="chapter-animate" style={{
                        fontSize: "14px", color: "rgba(240,237,230,0.45)",
                        lineHeight: 1.8, maxWidth: "400px", marginTop: "20px",
                    }}>
                        Diving into ML, data pipelines, and Python — bridging the gap
                        between frontend craft and intelligent systems.
                    </p>
                    <div className="chapter-animate" style={{
                        display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px",
                    }}>
                        {["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter"].map(s => (
                            <span key={s} className="chapter-pill">{s}</span>
                        ))}
                    </div>
                </div>

                {/* CHAPTER 6 — The Invitation */}
                <div ref={ch6Ref} style={{
                    position: "absolute", inset: 0, opacity: 0,
                    willChange: "opacity", display: "flex",
                    flexDirection: "column", justifyContent: "center",
                    alignItems: "center", textAlign: "center", padding: "0 5vw",
                }}>
                    <div className="chapter-animate" style={{
                        width: "60px", height: "1px",
                        background: "#FF7F3E", marginBottom: "32px",
                    }} />
                    <div className="chapter-animate">
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(36px, 5.5vw, 80px)", color: "#f0ede6",
                            letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
                        }}>
                            Let's build something
                        </h2>
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(36px, 5.5vw, 80px)", color: "#f0ede6",
                            letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
                        }}>
                            the internet
                        </h2>
                        <h2 style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(36px, 5.5vw, 80px)", color: "#f0ede6",
                            letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
                        }}>
                            hasn't seen yet.
                        </h2>
                    </div>
                    <p className="chapter-animate" style={{
                        fontFamily: "'Space Mono', monospace", fontSize: "12px",
                        color: "#FF7F3E", letterSpacing: "0.25em",
                        textTransform: "uppercase", marginTop: "40px",
                    }}>
                        SCROLL TO EXPLORE THE WORK ↓
                    </p>
                </div>
            </div>

        </div>
    );
}