import API_APP from "../config";

const checkoutOrder = async (payload) => {
  const res = await fetch(`${API_APP}/v1/api/order/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Đặt hàng thất bại");
  }
  return res.json();
};

export default checkoutOrder;
