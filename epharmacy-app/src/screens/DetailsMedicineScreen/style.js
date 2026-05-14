import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20 * scaleWidth,
  },
  medicineImage: {
    width: "100%",
    height: 250 * scaleHeight,
    borderRadius: 15 * scaleWidth,
    marginVertical: 15 * scaleHeight,
    resizeMode: "cover",
  },
  detailContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15 * scaleWidth,
    padding: 20 * scaleWidth,
    marginBottom: 20 * scaleHeight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8 * scaleWidth,
    elevation: 3,
  },
  medicineName: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10 * scaleHeight,
  },
  medicineDescription: {
    fontSize: 16 * scaleWidth,
    color: "#666",
    marginBottom: 20 * scaleHeight,
    lineHeight: 22 * scaleWidth,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20 * scaleHeight,
  },
  newPrice: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    color: "#4CD20A",
    marginRight: 10 * scaleWidth,
  },
  oldPrice: {
    fontSize: 20 * scaleWidth,
    color: "#B22222",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  rating: {
    fontSize: 16 * scaleWidth,
    fontWeight: "bold",
    color: "#FFA41B",
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15 * scaleWidth,
    borderRadius: 5,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 18 * scaleWidth,
    color: "#fff",
    fontWeight: "bold",
  },
});
export default styles;
