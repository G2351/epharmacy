import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10 * scaleWidth,
  },
  title: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    marginBottom: 10 * scaleHeight,
    color: "black",
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  footer: {
    padding: 10 * scaleWidth,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 22 * scaleWidth,
    color: "green",
    marginVertical: 10 * scaleHeight,
  },
  checkoutButton: {
    backgroundColor: "#4caf50",
    padding: 10 * scaleWidth,
    borderRadius: 5 * scaleWidth,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16 * scaleWidth,
    fontWeight: "bold",
    textAlign: "center",
  },
  noCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textNoProduct: {
    fontSize: 20 * scaleWidth,
    marginBottom: 10 * scaleHeight,
    textAlign: "center",
  },
});
export default styles;
