import { API_URL_PAYMENT } from "../config";

const createPaymentIntent = async (amount) => {
  try {
    const res = await fetch(`${API_URL_PAYMENT}/payments/intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export default createPaymentIntent;