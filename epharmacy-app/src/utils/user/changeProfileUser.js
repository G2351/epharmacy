import API_APP from "../config";
const changeProfileUser = async (data) => {
  // try {
  const res = await fetch(`${API_APP}/v1/api/auth/handleChangeInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Something went wrong");
  }
  const dataResponse = await res.json();
  console.log("Response change profileUser : ", dataResponse);
  return dataResponse;
  // } catch (error) {
  //   console.log("Error changeProfileUser", error.message || error);
  // }
};
export default changeProfileUser;
