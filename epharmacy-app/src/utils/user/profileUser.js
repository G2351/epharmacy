import AsyncStorage from "@react-native-async-storage/async-storage";

const getProfile = async () => {
  try {
    const userId = await AsyncStorage.getItem("user_id");
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const phone = await AsyncStorage.getItem("phone");
    const address = await AsyncStorage.getItem("address");
    return { userId, name, email, phone, address };
  } catch (e) {
    console.error("Failed to retrieve the profile user", e);
  }
};

const setProfile = async (userId, name, email, phone, address) => {
  try {
    await AsyncStorage.setItem("user_id", userId);
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("email", email);
    if (phone) await AsyncStorage.setItem("phone", phone);
    if (address) await AsyncStorage.setItem("address", address);
  } catch (e) {
    console.error("Failed to save the profile user", e);
  }
};

const deleteProfile = async () => {
  try {
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("phone");
    await AsyncStorage.removeItem("address");
  } catch (e) {
    console.error("Failed to delete the profile.", e);
  }
};

const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("@user_id");
    return userId;
  } catch (e) {
    console.error("Failed to retrieve the user ID.", e);
  }
};

const getUserName = async () => {
  try {
    const name = await AsyncStorage.getItem("@name");
    return name;
  } catch (e) {
    console.error("Failed to retrieve the name.", e);
  }
};

const setUserId = async (userId) => {
  try {
    await AsyncStorage.setItem("user_id", userId);
  } catch (e) {
    console.error("Failed to save the user ID.", e);
  }
};

const setUserName = async (username) => {
  try {
    await AsyncStorage.setItem("name", username);
  } catch (e) {
    console.error("Failed to save the user name.", e);
  }
};

export {
  setUserId, getUserId, getUserName, setUserName,
  getProfile, setProfile, deleteProfile,
};