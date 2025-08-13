import { useEffect, useState } from "react";
import FeatureItem from "./FeatureItem";
import feature1 from "../../assets/feature_1.jpg";
import feature2 from "../../assets/feature_2.jpg";
import feature3 from "../../assets/feature_3.jpg";
import feature4 from "../../assets/feature_4.jpg";
import feature5 from "../../assets/feature_5.jpg";

function OurFeatures() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full py-20 bg-[#141414] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-[#88A47C] to-[#a8c49c] bg-clip-text mb-4 animate-fade-in">
            Our Features
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#88A47C] to-[#a8c49c] mx-auto rounded-full"></div>
        </div>

        <FeatureItem
          number={"1"}
          featureName={"Smart Trash Report Submission"}
          text={
            "Our platform allows users to submit waste reports quickly and accurately. Users can provide a brief description of the problem, pinpoint the exact location using GPS auto-detection or by manually placing a pin on the map, and optionally attach photos for better visual context. This ensures that the location and nature of the issue are clear to organizers, reducing the time wasted on locating the problem and enabling faster response times."
          }
          imageSrc={feature1}
          imageOnLeft={isMobile ? true : false}
        />
        <FeatureItem
          number={"2"}
          featureName={"AI Powered Urgency Ranking"}
          text={
            "Every report is evaluated using a hybrid AI system that combines keyword-based detection with Groq's advanced LLM analysis. The AI considers multiple factors such as health hazards, environmental impact, odor severity, scale of waste, and immediate dangers. This intelligent prioritization ensures that the most critical and harmful waste problems are addressed first, even when there are many competing reports."
          }
          imageSrc={feature2}
          imageOnLeft={isMobile ? true : true}
        />
        <FeatureItem
          number={"3"}
          featureName={"Optimized Pickup Routing"}
          text={
            "For organizers responsible for cleanup operations, the system generates an optimized pickup route that minimizes travel time while covering all selected high-priority points. This route is created using a nearest-neighbor heuristic to establish an initial path, then refined with 2-opt optimization to eliminate inefficiencies. The result is a practical, cost-effective route plan that improves productivity and reduces fuel usage."
          }
          imageSrc={feature3}
          imageOnLeft={isMobile ? true : false}
        />
        <FeatureItem
          number={"4"}
          featureName={"Customizable Service Radius & Workload Control"}
          text={
            "Organizers have full control over their operational parameters by setting a service radius anywhere between 2 km and 10 km. They can also limit the maximum number of reports to address in a single trip, such as the top 5 or top 10 most urgent cases. This flexibility allows them to balance workload with available resources, ensuring that cleanup efforts are both efficient and sustainable."
          }
          imageSrc={feature4}
          imageOnLeft={isMobile ? true : true}
        />
        <FeatureItem
          number={"5"}
          featureName={"Seamless Google Maps Integration"}
          text={
            "The platform automatically generates a Google Maps route link that matches the optimized pickup order. Organizers can open this link directly on their devices for real-time navigation, complete with traffic awareness and turn-by-turn directions. This eliminates the need for manual mapping or third-party planning tools, allowing cleanup crews to focus on execution rather than logistics."
          }
          imageSrc={feature5}
          imageOnLeft={isMobile ? true : false}
        />
      </div>
    </div>
  );
}

export default OurFeatures;