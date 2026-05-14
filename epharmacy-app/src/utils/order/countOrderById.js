import API_APP from "../config";
import { increaseCount } from "../../store/slice/countOrderSlice";
const countOrderById = async (id) => {
  // http://localhost:4000/v1/api/orders?userId=2&status=pending
  try {
    const res = await fetch(
      `${API_APP}/v1/api/orders?userId=${id}&status=pending`,
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
    console.log("Count order : ", data.data.count);
    return data.data.count;
  } catch (error) {
    console.log("Error fetching countOrderById ", error.message || error);
  }
};
export default countOrderById;
