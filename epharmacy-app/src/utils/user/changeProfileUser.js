import AsyncStorage from "@react-native-async-storage/async-storage";
import API_APP from "../config";

const changeProfileUser = async (data) => {
  const res = await fetch(`${API_APP}/v1/api/auth/handleChangeInfo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Something went wrong");
  }
  const dataResponse = await res.json();
  if (data.name) await AsyncStorage.setItem("name", data.name);
  if (data.phone) await AsyncStorage.setItem("phone", data.phone);
  if (data.address) await AsyncStorage.setItem("address", data.address);
  return dataResponse;
};

export default changeProfileUser;