import API_APP from "../config";
const fetchMedicinesByCategory = async (id, setMedicines) => {
  try {
    const res = await fetch(`${API_APP}/v1/api/medicines?categoryId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    setMedicines(data.data.medicines);
  } catch (error) {
    console.log(
      "Error fetching get MedicinesByCategory:",
      error.message || error
    );
  }
};
export default fetchMedicinesByCategory;
