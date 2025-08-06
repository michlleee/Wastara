export default function FeatureItem({ imageOnLeft, text, imageSrc }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-13 mb-20">
      {/* Image on the left */}
      {imageOnLeft && (
        <img
          src={imageSrc}
          alt="feature"
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />
      )}

      {/* Text Card */}
      <div className="bg-white text-black rounded-xl p-6 w-full h-64 md:w-1/1 shadow-lg flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-gray-300 rounded mb-4"></div>
        <p className="text-sm leading-relaxed">{text}</p>
      </div>

      {/* Image on the right */}
      {!imageOnLeft && (
        <img
          src={imageSrc}
          alt="feature"
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />
      )}
    </div>
  );
}
