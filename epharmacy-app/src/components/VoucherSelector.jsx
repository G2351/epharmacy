import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import fetchVouchers from "../utils/voucher/fetchVoucherById";
import formatVoucherCode from "../utils/voucher/formatVoucherCode";
import { scaleHeight, scaleWidth } from "../utils/config";
const VoucherSelector = ({ selectedVoucher, setSelectedVoucher }) => {
  const dispatch = useDispatch();
  const { userId, name, email } = useSelector((state) => state.profile);
  const [vouchers, setVouchers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setModalVisible(false);
  };
  const handleClearVoucher = () => {
    setSelectedVoucher(null);
  };
  useEffect(() => {
    fetchVouchers(userId, setVouchers);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voucher của bạn</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.selectedVoucherContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="ticket"
              size={24}
              color={selectedVoucher ? "#00838f" : "#666"}
            />
          </View>

          <Text style={styles.selectedVoucherText}>
            {selectedVoucher
              ? formatVoucherCode(selectedVoucher.voucher_code)
              : "Chưa có voucher được chọn"}
          </Text>
          {selectedVoucher && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearVoucher}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text> Xóa </Text>
                <FontAwesome name="times-circle" size={24} color="#ff0000" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn mã voucher</Text>
            {vouchers.length === 0 && (
              <Text style={styles.text_no_voucher}>
                Không có voucher nào cả
              </Text>
            )}
            <FlatList
              data={vouchers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.voucherItem}
                  onPress={() => handleSelectVoucher(item)}
                >
                  <Text style={styles.voucherCode}>
                    {formatVoucherCode(item.voucher_code)}
                  </Text>
                  <Text style={styles.voucherDescription}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10 * scaleWidth,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
    marginBottom: 10 * scaleHeight,
    textAlign: "center",
  },
  selectedVoucherContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10 * scaleWidth,
    padding: 3 * scaleWidth,
  },
  iconContainer: {
    padding: 10 * scaleWidth,
    backgroundColor: "#e0f7fa",
    borderRadius: 50 * scaleWidth,
    marginRight: 10 * scaleWidth,
  },
  selectedVoucherText: {
    fontSize: 16 * scaleWidth,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10 * scaleWidth,
    padding: 20 * scaleWidth,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  voucherItem: {
    padding: 15 * scaleWidth,
    marginVertical: 5 * scaleHeight,
    backgroundColor: "#f9f9f9",
    borderRadius: 8 * scaleWidth,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  voucherCode: {
    fontSize: 16 * scaleWidth,
    fontWeight: "bold",
  },
  voucherDescription: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    marginTop: 20 * scaleHeight,
    alignSelf: "center",
    padding: 10 * scaleWidth,
    backgroundColor: "#00838f",
    borderRadius: 8 * scaleWidth,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16 * scaleWidth,
  },
  clearButton: {
    marginLeft: 60 * scaleWidth,
  },
  text_no_voucher: {
    color: "#4CAF50",
    textAlign: "center",
  },
});

export default VoucherSelector;
