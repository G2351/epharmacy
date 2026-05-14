import API_APP from "../config";
const fetchOrderById = async (id, status, setOrder) => {
  // http://localhost:4000/v1/api/orders?userId=2&status=pending
  try {
    const res = await fetch(
      `${API_APP}/v1/api/orders?userId=${id}&status=${status}`,
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
    setOrder(data.data.carts);
  } catch (error) {
    console.log("Error fetching fetchOrderById ", error.message || error);
  }
};
export default fetchOrderById;
