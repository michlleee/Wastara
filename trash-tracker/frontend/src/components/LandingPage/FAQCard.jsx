import { useState } from "react"

function FAQCard() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How does the AI urgency ranking system work?",
      answer:
        "Our hybrid AI system combines keyword-based detection with advanced LLM analysis to evaluate reports based on health hazards, environmental impact, odor severity, scale of waste, and immediate dangers. This ensures the most critical issues are prioritized first.",
    },
    {
      question: "Can I customize my service area as an organizer?",
      answer:
        "Yes! Organizers have full control over their operational parameters. You can set a service radius anywhere between 2 km and 10 km, and limit the maximum number of reports to address in a single trip (top 5 or top 10 most urgent cases).",
    },
    {
      question: "How accurate is the GPS location detection?",
      answer:
        "Our platform uses precise GPS auto-detection to pinpoint exact locations. Users can also manually place pins on the map for additional accuracy. This ensures organizers can locate problems quickly without wasting time searching.",
    },
    {
      question: "Does the route optimization really save time?",
      answer:
        "Our system uses nearest-neighbor heuristic with 2-opt optimization to create the most efficient pickup routes. This minimizes travel time, reduces fuel usage, and significantly improves productivity for cleanup operations.",
    },
    {
      question: "Can I attach photos to my waste reports?",
      answer:
        "Yes, you can optionally attach photos to provide better visual context for your reports. This helps organizers understand the nature and scale of the problem before arriving at the location.",
    },
    {
      question: "How does the Google Maps integration work?",
      answer:
        "The platform automatically generates optimized Google Maps route links that match your pickup order. Simply open the link on your device for real-time navigation with traffic awareness and turn-by-turn directions.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full py-20 bg-[#141414] text-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-[#88A47C] to-[#a8c49c] bg-clip-text mb-4 animate-fade-in">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#88A47C] to-[#a8c49c] mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 text-lg">
            Got questions? We've got answers to help you get started with Wastara.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#88A47C] focus:ring-inset"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r from-[#88A47C] to-[#a8c49c] flex items-center justify-center transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="h-px bg-gradient-to-r from-[#88A47C] to-[#a8c49c] mb-4 opacity-30"></div>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6 text-lg">Still have questions? We're here to help!</p>
          <button className="bg-gradient-to-r from-[#88A47C] to-[#a8c49c] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default FAQCard