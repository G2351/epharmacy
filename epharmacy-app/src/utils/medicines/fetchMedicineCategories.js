import API_APP from "../config";
const fetchMedicinesCategories = async (setCategories) => {
  try {
    const res = await fetch(`${API_APP}/v1/api/category-medicine`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    setCategories(data.data.categoryMedicine.reverse());
  } catch (error) {
    console.log(error);
  }
};
export default fetchMedicinesCategories;
