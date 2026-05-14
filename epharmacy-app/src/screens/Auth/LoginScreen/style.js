import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../../utils/config";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  logo: {
    width: 150 * scaleWidth,
    height: 150 * scaleHeight,
  },
  title: {
    marginVertical: 10 * scaleHeight,
    fontSize: 30 * scaleWidth,
    color: "#000000",
  },
  container_input: {
    width: "80%",
    justifyContent: "center",
  },
  input: {
    height: 50 * scaleHeight,
    margin: 5,
    paddingHorizontal: 15 * scaleWidth,
    borderWidth: 1,
    borderRadius: 10 * scaleWidth,
    borderColor: "#000000",
    fontSize: 16 * scaleWidth,
    fontWeight: "400",
  },
  input_password: {
    fontSize: 16 * scaleWidth,
  },
  container_error: {
    paddingLeft: 20 * scaleWidth,
    height: 20 * scaleHeight,
  },
  text_error: {
    color: "red",
  },
  container_btn_submit: {
    width: "75%",
    marginVertical: 40 * scaleHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  container_no_login: {
    width: "75%",
    marginVertical: 15 * scaleHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  text_no_login: {
    fontWeight: "bold",
    color: "green",
  },
  container_icon_input: {
    position: "relative",
    width: "100%",
    height: 60 * scaleHeight,
  },
  icon_eye: {
    poisition: "absolute",
    left: "87%",
    top: "-65%",
  },
  link_register: {
    color: "blue",
  },
  container_link_register: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 10 * scaleWidth,
  },
  text_link_register: {
    font_weight: "bold",
    color: "black",
    textDecorationLine: "underline",
  },
});
export default styles;
