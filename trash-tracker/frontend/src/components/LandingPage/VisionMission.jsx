import cityIcon from "../../assets/city-svgrepo-com.svg";
import trashIcon from "../../assets/trash-alt-svgrepo-com.svg";

const VisionMission = () => {
  return (
    <>
      <div className="w-full py-20 bg-[#141414] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-right text-4xl font-bold text-[#88A47C] mb-12">
            Vision & Mission
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            {/* Vision Card */}
            <div className="bg-white text-black rounded-xl p-12 w-full md:w-1/2 shadow-lg min-h-[200px] flex flex-col justify-center transition duration-300 transform hover:shadow-2xl hover:scale-[1.02]">
              <div className="flex justify-center mb-4">
                <img
                  src={cityIcon}
                  alt="city icon"
                  className="w-15 h-15 transition transform duration-300 hover:-translate-y-1"
                />
              </div>
              <p className="text-base text-gray-700 leading-relaxed tracking-wide text-justify">
                Our vision is to build cleaner and more responsive urban
                environments by enabling real-time, community-driven waste
                reporting. This encourages public participation and improves
                waste management efficiency.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white text-black rounded-xl p-6 w-full md:w-1/1 shadow-lg min-h-[220px] flex flex-col justify-center transition duration-300 transform hover:shadow-2xl hover:scale-[1.02]">
              <div className="flex justify-center mb-4">
                <img
                  src={trashIcon}
                  alt="city icon"
                  className="w-15 h-15 transition transform duration-300 hover:-translate-y-1"
                />
              </div>
              <p className="text-base text-gray-700 leading-relaxed tracking-wide text-justify">
                We aim to empower citizens to take part in maintaining public
                cleanliness by streamlining communication between communities
                and waste management teams. Leveraging technology, we offer a
                fast, reliable, and scalable platform for reporting trash, while
                promoting sustainable practices through civic responsibility and
                environmental awareness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionMission;
