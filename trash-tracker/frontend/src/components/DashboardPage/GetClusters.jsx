import axios from "axios";

const GetClusters= () => {
  const handleGetClusters = async () => {
    try {
      const res = await axios.post("http://localhost:3000/cluster", {
        lat: -6.205, // organizer lat
        lng: 106.82, // organizer lng
        k: 5         // number of clusters
      });
      console.log("Cluster result:", res.data);
      alert("Clusters fetched! Check console for details.");
    } catch (err) {
      console.error("Error fetching clusters:", err);
      alert("Failed to get clusters");
    }
  };

  return (
    <button
      onClick={handleGetClusters}
      className="bg-[#93B088] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#7a9671] transition-colors"
    >
      Get Clusters
    </button>
  );
};

export default GetClusters;
