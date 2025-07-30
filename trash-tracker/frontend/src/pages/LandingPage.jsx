import landingBg from '../assets/bg_landing_page.png';
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import AboutUsCard from '../components/AboutUsCard';

const LandingPage = () => {
  return (
    <>
    {/* First Content */}
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${landingBg})` }}
        >
        <div className="relative z-20 flex flex-col min-h-screen">
          <Navbar />
          {/* Hero Section with Image Background */}
          <HeroSection />
          
          {/* Sloped transition section */}
          <div className="relative w-full h-20 z-10">
            {/* Green background */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundColor: '#6D9D58',
                clipPath: 'polygon(0% 60%, 100% 0%, 100% 40%, 0% 100%)'
              }}
            ></div>
            
            {/* White overlay - matches green's bottom slope */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-white"
              style={{
                clipPath: 'polygon(0% 100%, 100% 40%, 100% 100%, 0% 100%)'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative z-20 bg-white">
        <AboutUsCard />
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;