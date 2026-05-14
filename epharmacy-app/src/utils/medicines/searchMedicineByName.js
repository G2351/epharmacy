import API_APP from "../config";
const searchMedicineByName = async (text, idCategory, setMedicines) => {
  // console.log(text, idCategory);
  try {
    const res = await fetch(
      `${API_APP}/v1/api/medicines?q=${text}&categoryId=${idCategory}`,
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
    // console.log(data);
    setMedicines(data.data.medicines);
  } catch (error) {
    console.log("Error fetching searchMedicineByName:", error.message || error);
  }
};
export default searchMedicineByName;
