import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './components/HeroSection';
import IndustryExperience from './components/IndustryExperience';
import Projects from './components/Projects';
import Qualifications from './components/Qualifications';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const handleLoad = () => {
      // Final global refresh once EVERYTHING is ready
      setTimeout(() => ScrollTrigger.refresh(), 2500);
    };
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black">
      <CustomCursor />

      <HeroSection />

      <IndustryExperience />
      <Projects />
      <Qualifications />
      <Testimonials />
      <Process />
      <Footer />
    </div>
  );
}

export default App;
