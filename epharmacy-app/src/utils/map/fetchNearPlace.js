import API_APP from "../config";
const fetchNearPlace = async (latitude, longitude, setPlaces) => {
  try {
    const res = await fetch(
      `${API_APP}/v1/api/near-places?latitude=${latitude}&longitude=${longitude}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log(data);
    setPlaces(data);
    return data;
  } catch (error) {
    console.log("Error fetching nearplace:", error.message || error);
  }
};
export default fetchNearPlace;
