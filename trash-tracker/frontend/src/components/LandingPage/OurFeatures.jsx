import FeatureItem from "./FeatureItem";
import TrashPic from "../../assets/bg_sampah2.jpg";

function OurFeatures() {
  const featureText =
    "To create cleaner, smarter, and more responsive urban environments through real-time community-driven waste reporting.";

  return (
    <div className="w-full py-20 bg-[#141414] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-left text-4xl font-bold text-[#88A47C] mb-12">
          Our Features
        </h2>

        <FeatureItem
          text={featureText}
          imageSrc={TrashPic}
          imageOnLeft={false}
        />
        <FeatureItem
          text={featureText}
          imageSrc={TrashPic}
          imageOnLeft={true}
        />
        <FeatureItem
          text={featureText}
          imageSrc={TrashPic}
          imageOnLeft={false}
        />
        <FeatureItem
          text={featureText}
          imageSrc={TrashPic}
          imageOnLeft={true}
        />
      </div>
    </div>
  );
}

export default OurFeatures;
