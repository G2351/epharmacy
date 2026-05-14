import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20 * scaleWidth,
    borderTopLeftRadius: 20 * scaleWidth,
    borderTopRightRadius: 20 * scaleWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
    marginBottom: 10 * scaleHeight,
  },
  modalText: {
    fontSize: 16 * scaleWidth,
    marginBottom: 20 * scaleHeight,
  },
  buyMedicineButton: {
    backgroundColor: "green",
    paddingVertical: 10 * scaleHeight,
    borderRadius: 5 * scaleWidth,
    alignItems: "center",
    flex: 1,
  },
  closeModalButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 10 * scaleHeight,
    borderRadius: 5 * scaleWidth,
    alignItems: "center",
    flex: 1,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20 * scaleHeight,
  },
  quantityButton: {
    padding: 10 * scaleWidth,
    backgroundColor: "#FF5722",
    borderRadius: 5 * scaleWidth,
    marginHorizontal: 10 * scaleWidth,
  },
  buttonText: {
    fontSize: 20 * scaleWidth,
    color: "#fff",
  },
  quantity: {
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
    paddingHorizontal: 20 * scaleWidth,
  },
  container_btn: {
    flexDirection: "row",
    columnGap: 20 * scaleWidth,
  },
  container_quantity: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default styles;
