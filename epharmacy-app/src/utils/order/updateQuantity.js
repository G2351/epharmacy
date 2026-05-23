import API_APP from "../config";

const updateQuantity = async (id, quantity) => {
  try {
    const res = await fetch(`${API_APP}/v1/api/order`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idOrder: id,
        payload: { quantity, status: "pending" },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default updateQuantity;