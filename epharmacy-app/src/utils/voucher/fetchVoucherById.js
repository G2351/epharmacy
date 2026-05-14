import { cos } from "mathjs";
import API_APP from "../config";
const fetchVouchers = async (userId, setVouchers) => {
  try {
    // console.log("userId is", userId);
    const response = await fetch(`${API_APP}/v1/api/voucher?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }); // URL API của bạn
    // console.log("response", response);
    const data = await response.json();
    // console.log("data", data.data.vouchers);

    // validate voucher by expiry date
    const currentDate = new Date();
    const validVouchers = data.data.vouchers.filter((voucher) => {
      const expiryDate = new Date(voucher.expired_at);
      // console.log("expiryDate", expiryDate);
      return expiryDate > currentDate; // Only keep vouchers that are not expired
    });
    console.log("validVouchers", validVouchers);
    setVouchers(validVouchers);
    // setVouchers(data.data.vouchers); // Lưu dữ liệu voucher từ API
  } catch (error) {
    console.error("Error fetching vouchers:", error);
  }
};
export default fetchVouchers;
