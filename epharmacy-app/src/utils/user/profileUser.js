import AsyncStorage from "@react-native-async-storage/async-storage";

const getProfile = async () => {
  try {
    console.log("take profile");
    const userId = await AsyncStorage.getItem("user_id");
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    if (userId !== null && name !== null && email !== null) {
      console.log("User ID:", userId);
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("--------------------------------------");
      // Do something with the user ID, e.g., navigate to the home screen
    }
    return { userId, name, email };
  } catch (e) {
    console.error("Failed to retrieve the profile user", e);
  }
};
const setProfile = async (userId, name, email) => {
  try {
    console.log("set profile");
    await AsyncStorage.setItem("user_id", userId);
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("email", email);
    console.log("User ID saved successfully", userId);
    console.log("Name saved successfully", name);
    console.log("Email saved successfully", email);
    console.log(".............................");
  } catch (e) {
    console.error("Failed to save the profile user", e);
  }
};
const deleteProfile = async () => {
  try {
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("email");
    console.log("Profile deleted successfully");
  } catch (e) {
    console.error("Failed to delete the profile.", e);
  }
};
const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("@user_id");
    if (userId !== null) {
      console.log("User ID:", userId);
      // Do something with the user ID, e.g., navigate to the home screen
    }
    return userId;
  } catch (e) {
    console.error("Failed to retrieve the user ID.", e);
  }
};
const getUserName = async () => {
  try {
    const name = await AsyncStorage.getItem("@name");
    console.log("take user name");
    if (name !== null) {
      console.log("Name:", name);
    }
    return name;
  } catch (e) {
    console.error("Failed to retrieve the name.", e);
  }
};
const setUserId = async (userId) => {
  try {
    await AsyncStorage.setItem("user_id", userId);
    console.log("User ID saved successfully");
  } catch (e) {
    console.error("Failed to save the user ID.", e);
  }
};

const setUserName = async (username) => {
  try {
    await AsyncStorage.setItem("name", username);
    console.log("User username saved successfully");
  } catch (e) {
    console.error("Failed to save the user name.", e);
  }
};
export {
  setUserId,
  getUserId,
  getUserName,
  setUserName,
  getProfile,
  setProfile,
  deleteProfile,
};
