import HeroSection from './components/HeroSection';
import IndustryExperience from './components/IndustryExperience';
import Projects from './components/Projects';
import Qualifications from './components/Qualifications';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

function App() {
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
