import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20 * scaleWidth,
  },
  container_form: {
    alignItems: "center",
  },
  container_logo: {
    flexDirection: "row-reverse",
  },
  logo: {
    width: 70 * scaleWidth,
    height: 70 * scaleHeight,
  },
  text_title: {
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
    color: "black",
    marginVertical: 10 * scaleHeight,
  },
  container_input: {
    width: "85%",
    justifyContent: "center",
    // alignItems: 'center',
  },
  input: {
    height: 50 * scaleHeight,
    margin: 5 * scaleWidth,
    paddingHorizontal: 15 * scaleWidth,
    borderWidth: 1,
    borderRadius: 10 * scaleWidth,
    borderColor: "#000000",
    fontSize: 16 * scaleWidth,
    fontWeight: "400",
  },
  input_password: {
    fontSize: 20 * scaleWidth,
  },
  container_error: {
    paddingLeft: 10 * scaleWidth,
    height: 20 * scaleHeight,
  },
  text_error: {
    color: "red",
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
  container_btn_submit: {
    width: "75%",
    marginVertical: 30 * scaleHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  text_label: {
    marginTop: 10 * scaleHeight,
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
  checkboxContainer: {
    marginTop: 20 * scaleHeight,
    marginBottom: 30 * scaleHeight,
  },
  checkbox: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  checkboxText: {
    fontSize: 16 * scaleWidth,
    color: "#333",
  },
  container_check: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default styles;
