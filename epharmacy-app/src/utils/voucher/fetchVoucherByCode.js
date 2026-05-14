import API_APP from "../config";

const fetchVoucherByCode = async ({ userId, voucherCode }) => {
  try {
    const response = await fetch(`${API_APP}/v1/api/getVoucherByCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, voucherCode }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchVoucherByCode error:", error);
    return { error: error.message };
  }
};

export default fetchVoucherByCode;