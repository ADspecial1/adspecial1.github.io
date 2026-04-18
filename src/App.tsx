import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './components/HeroSection';
import IndustryExperience from './components/IndustryExperience';
import Projects from './components/Projects';
import Qualifications from './components/Qualifications';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import CurrentlyLearning from './components/CurrentlyLearning';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';


gsap.registerPlugin(ScrollTrigger);

const LOADING_CSS = `
  @keyframes ld-line-in  { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes ld-reveal   { from { transform: translateY(105%); } to { transform: translateY(0); } }
  @keyframes ld-fade-up  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes ld-exit     { to   { opacity:0; transform:translateY(-24px); } }
  @keyframes ld-dot      { 0%,100%{ opacity:0.2; transform:scale(0.7); } 50%{ opacity:1; transform:scale(1); } }
  .ld-exiting { animation: ld-exit 0.55s cubic-bezier(0.4,0,1,1) forwards; }
  .ld-word-wrap { overflow: hidden; display: inline-block; }
  .ld-word { display: inline-block; animation: ld-reveal 0.9s cubic-bezier(0.16,1,0.3,1) both; }
`;

function Loading({ exiting }: { exiting: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.random() * 4 + 1);
      setProgress(Math.floor(p));
      if (p >= 100) clearInterval(iv);
    }, 50);
    return () => clearInterval(iv);
  }, []);

  const words = ['ASWANI', 'DUBEY'];

  return (
    <>
      <style>{LOADING_CSS}</style>
      <div
        className={exiting ? 'ld-exiting' : ''}
        style={{
          position: 'fixed', inset: 0,
          background: '#080808',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        {/* Thin top border line animating in */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: '#FF7F3E', transformOrigin: 'left',
          animation: 'ld-line-in 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s both',
        }} />

        {/* Center content */}
        <div style={{ textAlign: 'center' }}>
          {/* Label */}
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px', letterSpacing: '0.4em',
            color: '#FF7F3E', textTransform: 'uppercase',
            marginBottom: '28px',
            animation: 'ld-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both',
          }}>
            Creative Developer · Portfolio
          </p>

          {/* Name — each word slides up from clip mask */}
          <div style={{ display: 'flex', gap: '0.3em', justifyContent: 'center', flexWrap: 'wrap' }}>
            {words.map((word, wi) => (
              <span key={word} className="ld-word-wrap">
                <span
                  className="ld-word"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(52px, 10vw, 110px)',
                    color: '#f0ede6',
                    letterSpacing: '-0.03em',
                    lineHeight: 0.9,
                    animationDelay: `${0.25 + wi * 0.12}s`,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', letterSpacing: '0.2em',
            color: 'rgba(240,237,230,0.35)',
            marginTop: '20px',
            animation: 'ld-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.65s both',
          }}>
            Building digital experiences
          </p>
        </div>

        {/* Progress bar — pinned to bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          animation: 'ld-fade-up 0.5s ease 0.3s both',
        }}>
          {/* Track */}
          <div style={{ height: '1px', background: 'rgba(240,237,230,0.08)' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: '#FF7F3E',
              transition: 'width 0.06s linear',
            }} />
          </div>
          {/* Counter row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 24px',
          }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'rgba(240,237,230,0.25)', letterSpacing: '0.3em' }}>
              LOADING
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Breathing dots */}
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 3, height: 3, borderRadius: '50%',
                  background: '#FF7F3E', display: 'inline-block',
                  animation: `ld-dot 1.1s ${i * 0.18}s ease-in-out infinite`,
                }} />
              ))}
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#FF7F3E', letterSpacing: '0.1em', minWidth: 32, textAlign: 'right' }}>
                {String(progress).padStart(3, '0')}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [loading,  setLoading]  = useState(true);
  const [exiting,  setExiting]  = useState(false);
  const [gone,     setGone]     = useState(false);

  useEffect(() => {
    const minLoadingTime = 2800;
    const start = Date.now();
    const handleLoad = () => {
      const elapsed  = Date.now() - start;
      const remaining = Math.max(0, minLoadingTime - elapsed);
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setLoading(false);
          setGone(true);
          ScrollTrigger.refresh();
        }, 650);
      }, remaining);
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black">
      {!gone && <Loading exiting={exiting} />}
      <CustomCursor />
      <HeroSection />
      <IndustryExperience />
      <Projects />
      <CurrentlyLearning />
      <Qualifications />
      <Testimonials />
      {/* <Process /> */}
      <Footer />
    </div>
  );
}

export default App;
