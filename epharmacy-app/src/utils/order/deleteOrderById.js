import API_APP from "../config";
const deleteOrderById = async (id) => {
  // http://localhost:3000/v1/api/order/9
  try {
    const res = await fetch(`${API_APP}/v1/api/order/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching deleteOrderById ", error.message || error);
  }
};
export default deleteOrderById;
