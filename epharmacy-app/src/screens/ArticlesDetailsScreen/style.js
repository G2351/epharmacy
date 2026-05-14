import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20 * scaleWidth,
    backgroundColor: "#f9f9f9", // Slight background color for header
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8 * scaleHeight,
  },
  description: {
    fontSize: 16 * scaleWidth,
    color: "#555",
  },
  contentContainer: {
    flex: 1, // Allows the content to take the remaining space and become scrollable
    padding: 20 * scaleWidth,
  },
  content: {
    fontSize: 16 * scaleWidth,
    lineHeight: 24 * scaleWidth,
    color: "#666",
  },
});
export default styles;
