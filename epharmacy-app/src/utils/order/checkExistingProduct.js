import API_APP from "../config";
const checkExistingProduct = async (user_id, product_id) => {
  console.log("checkExistingProduct", user_id, product_id);
  // http://localhost:4000/v1/api/orders?userId=2&status=pending
  try {
    const res = await fetch(
      `${API_APP}/v1/api/orders/existing?user_id=${user_id}&product_id=${product_id}&status=pending`,
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
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log("Error fetching fetchOrderById ", error.message || error);
  }
};
export default checkExistingProduct;
