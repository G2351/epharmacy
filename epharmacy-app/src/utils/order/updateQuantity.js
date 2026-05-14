import API_APP from "../config";
const updateQuantity = async (id, quantity) => {
  // http://localhost:3000/v1/api/order
  // {"idOrder":28,
  //  "payload":{"quantity":8000,"status":"pending"}
  // }
  try {
    const res = await fetch(`${API_APP}/v1/api/order`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idOrder: id,
        payload: {
          quantity,
          status: "pending",
        },
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching updateQuantity:", error.message || error);
  }
};
export default updateQuantity;
