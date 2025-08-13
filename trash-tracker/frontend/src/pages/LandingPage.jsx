import landingBg from "../assets/bg_landing_page.png"
import Navbar from "../components/LandingPage/Navbar"
import Footer from "../components/LandingPage/Footer"
import HeroSection from "../components/LandingPage/HeroSection"
import AboutUsCard from "../components/LandingPage/AboutUsCard"
import ProblemSection from "../components/LandingPage/ProblemSection"
import VisionMission from "../components/LandingPage/VisionMission"
import OurFeatures from "../components/LandingPage/OurFeatures"

const LandingPage = () => {
  return (
    <div
      className="select-none"
      onDragStart={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: "none" }}
    >
      <Navbar className="fixed top-0 w-full z-50" />

      <div
        id="hero-section"
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${landingBg})` }}
      >
        <div className="relative z-10 flex flex-col min-h-screen">
          <HeroSection />

          <div className="relative w-full h-20 z-10">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundColor: "#6D9D58",
                clipPath: "polygon(0% 60%, 100% 0%, 100% 40%, 0% 100%)",
              }}
            ></div>
            <div
              className="absolute top-0 left-0 w-full h-full bg-white"
              style={{
                clipPath: "polygon(0% 100%, 100% 40%, 100% 100%, 0% 100%)",
              }}
            ></div>
          </div>
        </div>
      </div>

      <section id="about" className="relative z-10 bg-white scroll-mt-24">
        <AboutUsCard />
      </section>

      <section id="problems" className="relative z-10 bg-white scroll-mt-24">
        <ProblemSection />
      </section>

      <div className="relative w-full h-20">
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          style={{
            backgroundColor: "#6D9D58",
            clipPath: "polygon(0% 0%, 100% 60%, 100% 100%, 0% 40%)",
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full z-10 bg-[#141414]"
          style={{
            clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 0% 40%)",
          }}
        ></div>
      </div>

      <div className="bg-[#141414]">
        <section id="vision" className="scroll-mt-24">
          <VisionMission />
        </section>
        <section id="features" className="scroll-mt-24">
          <OurFeatures />
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default LandingPage