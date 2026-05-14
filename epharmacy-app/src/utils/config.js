import Constants from "expo-constants";
import { Dimensions } from "react-native";
const API_APP = Constants.expoConfig.extra.apiUrl;
const API_URL_PAYMENT = Constants.expoConfig.extra.apiUrlPayment;
const PUBLIC_KEY = Constants.expoConfig.extra.publicKey;
const GOOGLE_KEY = Constants.expoConfig.extra.googleKey;
const MAPBOX_KEY = Constants.expoConfig.extra.mapboxKey;
// console.log(API_APP);
// console.log(API_URL_PAYMENT);
// console.log(PUBLIC_KEY);
const { width, height } = Dimensions.get("window");

// Tính toán tỷ lệ dựa trên kích thước màn hình
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 812;
const scaleWidth = width / SCREEN_WIDTH;
const scaleHeight = height / SCREEN_HEIGHT;
export default API_APP;
export {
  scaleWidth,
  scaleHeight,
  API_URL_PAYMENT,
  PUBLIC_KEY,
  GOOGLE_KEY,
  MAPBOX_KEY,
};
