import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10 * scaleWidth,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  row_logo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 70 * scaleWidth,
    height: 70 * scaleHeight,
  },
  logo_doctor: {
    width: 100 * scaleWidth,
    height: 100 * scaleHeight,
    borderRadius: 40,
  },
  text_profile: {
    paddingTop: 10 * scaleHeight,
    fontSize: 22 * scaleWidth,
    color: "#006980",
  },
  text_hello: {
    fontSize: 16 * scaleWidth,
    color: "#4CD20A",
  },

  container_row_appoiment: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 5 * scaleHeight,
  },
  row_appoiment: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40 * scaleWidth,
    paddingVertical: 25 * scaleHeight,
    borderRadius: 20 * scaleWidth,
    backgroundColor: "#4CD20A",
  },
  text_row_appoiment: {
    color: "white",
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
  },
  container_button_appoiment: {
    marginVertical: 10 * scaleHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20 * scaleWidth,
    width: 150 * scaleWidth,
    padding: 10 * scaleHeight,
  },
  text_button_appoiment: {
    color: "#4DD409",
    fontSize: 16 * scaleWidth,
  },
  service: {},
  service_title: {
    marginVertical: 10 * scaleHeight,
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
    color: "#006980",
  },
  service_list: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8 * scaleHeight,
  },
  container_item_service: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2 * scaleWidth,
  },
  item_service: {
    width: 80 * scaleWidth,
    paddingVertical: 12 * scaleWidth,
    paddingHorizontal: 10 * scaleWidth,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18 * scaleWidth,
    borderWidth: 3 * scaleWidth,
    borderColor: "#cccccc",
    zIndex: 1,
  },
  img_item_service: {
    width: 30 * scaleWidth,
    height: 30 * scaleHeight,
  },
  name_item_service: {
    textAlign: "center",
    color: "#00687E",
  },
  appoiment_details: {
    marginTop: 20 * scaleHeight,
    flex: 1,
    // backgroundColor: 'red',
  },
  row_appoiment_details_title: {
    flexDirection: "row",
    marginVertical: 10 * scaleHeight,
    justifyContent: "space-between",
    alignItems: "center",
  },
  appoiment_details_title: {
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
    color: "#006980",
  },
  btn_details: {
    color: "#006D77",
    // fontWeight: 200,
  },
  // sidebar
  menuIcon: {
    padding: 10 * scaleHeight,
  },
  iconText: {
    color: "#fff",
    fontSize: 20 * scaleWidth,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 5,
  },
  badge: {
    position: "absolute",
    top: 8, // Điều chỉnh vị trí của badge
    right: 10,
    backgroundColor: "red",
    borderRadius: 10, // Làm tròn cho badge
    width: 21,
    height: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
export default styles;
