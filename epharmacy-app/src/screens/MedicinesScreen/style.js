import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15 * scaleWidth,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  row_title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title_medicine: {
    fontSize: 20 * scaleWidth,
    color: "black",
  },
  img_item_service: {
    width: 30 * scaleWidth,
    height: 30 * scaleHeight,
    color: "white",
  },
  container_seach_bar: {
    marginVertical: 5 * scaleHeight,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchBarInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 15 * scaleWidth,
  },
  searchBarInput: {
    color: "#333",
  },
  contaniner_note: {
    padding: 20 * scaleWidth,
    borderRadius: 16 * scaleWidth,
    backgroundColor: "#FEF7E6",
    flexDirection: "row",
    columnGap: 10 * scaleWidth,
    elevation: 3 * scaleWidth,
    marginBottom: 5 * scaleWidth,
    justifyContent: "space-between",
  },
  container_icon_note: {
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    width: 10 * scaleWidth,
    height: 10 * scaleHeight,
  },
  text_title_note: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20 * scaleWidth,
  },
  text_content_note: {
    fontSize: 12 * scaleWidth,
    color: "#333333",
  },
  icon_arrow: {
    color: "#666666",
    width: 15 * scaleWidth,
    height: 15 * scaleHeight,
  },
  badge: {
    position: "absolute",
    top: -5, // Điều chỉnh vị trí của badge
    right: -5,
    backgroundColor: "red",
    borderRadius: 10, // Làm tròn cho badge
    width: 20,
    height: 20,
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
