import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 40 * scaleHeight,
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
  },
  userName: {
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
    marginTop: 10 * scaleHeight,
    marginBottom: 5 * scaleHeight,
  },
  userEmail: {
    fontSize: 16 * scaleWidth,
    marginTop: 5 * scaleHeight,
  },
  updateText: {
    fontSize: 16 * scaleWidth,
    color: "#4CD20A",
    fontWeight: "bold",
    marginVertical: 10 * scaleHeight,
  },
  cancelText: {
    fontSize: 16 * scaleWidth,
    color: "red",
    fontWeight: "bold",
    marginVertical: 10 * scaleHeight,
    textAlign: "center",
  },
  editText: {
    marginVertical: 14 * scaleHeight,
    fontSize: 16 * scaleWidth,
    color: "#3498db",
  },
  container_input: {
    marginVertical: 20 * scaleHeight,
    width: "80%",
    justifyContent: "center",
  },
  input: {
    height: 50 * scaleHeight,
    margin: 5,
    paddingHorizontal: 25 * scaleWidth,
    borderWidth: 1,
    borderRadius: 10 * scaleWidth,
    borderColor: "#000000",
    fontSize: 16 * scaleWidth,
    fontWeight: "400",
  },
  logoutButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 10 * scaleHeight,
    paddingHorizontal: 20 * scaleWidth,
    borderRadius: 30 * scaleWidth,
  },
  logoutText: {
    color: "#fff",
    fontSize: 15 * scaleWidth,
    fontWeight: "bold",
  },
  updateButton: {
    width: "60%",
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  disabledButton: {
    backgroundColor: "#d3e8e2",
    borderColor: "#b2d3b2",
    borderWidth: 1,
    opacity: 0.8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    shadowColor: "transparent",
  },

  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  disabledText: {
    color: "#7f7f7f",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default styles;
