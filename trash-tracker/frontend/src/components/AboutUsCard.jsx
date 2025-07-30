import AboutUsImage from '../assets/trash2.jpg';

const AboutUsCard = () => {
  return (
    <div className="relative z-20 bg-white my-30">
      <div className="flex flex-col sm:flex-row items-center">
        {/* Left Image - full width on screen */}
        <div className="w-full pb-10 sm:pb-0 sm:w-1/2 ">
          <img
            src={AboutUsImage}
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="w-full sm:w-1/2 px-10 sm:px-16">
          {/* Title + Full Width Line */}
          <div className="flex flex-col mb-8">
            <div className="flex items-center">
              <h2 className="text-5xl font-extrabold text-green-700 mr-4">Why Wastara?</h2>
              <div className="flex-grow h-2 bg-[#6D9D58]" />
            </div>
          </div>

          {/* Larger paragraph */}
          <p className="text-gray-700 text-justify leading-relaxed text-lg sm:text-xl">
            At Wastara, we believe cleaner cities start with empowered communities.
            Our platform was created to give everyday citizens a simple, effective
            way to report unmanaged trash in their surroundings. Whether it's a
            packed bin or an illegal dump spot, your report helps local organizers
            and waste management teams act faster and smarter. Wastara is designed
            to be lightweight, accessible, and responsive — a progressive web app
            that works seamlessly on any device. We aim to connect the public with
            those who keep our cities clean, using tech as a bridge for civic impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
