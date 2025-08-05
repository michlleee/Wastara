import landingBg from '../assets/bg_landing_page.png';
import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/LandingPage/Footer";
import HeroSection from "../components/LandingPage/HeroSection";
import AboutUsCard from '../components/LandingPage/AboutUsCard';
import BackgroundSection from '../components/LandingPage/BackgroundSection';
import VisionMission from '../components/LandingPage/VisionMission';

const LandingPage = () => {
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${landingBg})` }}
        >
        <div className="relative z-20 flex flex-col min-h-screen">
          <Navbar />
          {/* Hero section */}
          <HeroSection />
          
          {/* Right to left slope */}
          <div className="relative w-full h-20 z-10">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundColor: '#6D9D58',
                clipPath: 'polygon(0% 60%, 100% 0%, 100% 40%, 0% 100%)'
              }}
            ></div>
            
            <div
              className="absolute top-0 left-0 w-full h-full bg-white"
              style={{
                clipPath: 'polygon(0% 100%, 100% 40%, 100% 100%, 0% 100%)'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="relative z-20 bg-white">
        <AboutUsCard />
      </div>

      {/* Background (Problems) section */}
      <div className="relative z-20 bg-white">
        <BackgroundSection />
      </div>

      {/* Left to right slope */}
      <div className="relative w-full h-20">
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          style={{
            backgroundColor: '#6D9D58',
           clipPath: "polygon(0% 0%, 100% 60%, 100% 100%, 0% 40%)"
          }}
        ></div>

        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          style={{
            backgroundColor: '#141414',
           clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 0% 40%)"
          }}
        ></div>
      </div>

      <VisionMission />

      <Footer />
    </>
  );
};

export default LandingPage;