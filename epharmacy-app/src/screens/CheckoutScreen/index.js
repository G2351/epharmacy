import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, Alert, ActivityIndicator, StyleSheet, Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import formatCurrency from "../../utils/formatMoney";
import createPaymentIntent from "../../utils/payment/createPaymentIntent";
import { useStripe } from "@stripe/stripe-react-native";
import checkoutOrder from "../../utils/order/checkoutOrder";
import fetchVoucherByCode from "../../utils/voucher/fetchVoucherByCode";
import { scaleWidth, scaleHeight } from "../../utils/config";
import { useNavigation, useRoute } from "@react-navigation/native";
import AddressPicker from "../../components/AddressPicker";

const SHIPPING_FEE = 20000;

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { items, totalAmount } = route.params;
  const { userId, email, name, phone: savedPhone, address: savedAdress } = useSelector((state) => state.profile);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [address, setAddress] = useState(savedAdress || "");
  const [detailAddress, setDetailAddress] = useState(savedAdress || "");
  const [areaAddress, setAreaAddress] = useState("");
  const [phone, setPhone] = useState(savedPhone || "");
  const [note, setNote] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucherError, setVoucherError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const discount = voucher ? voucher.discount_amount || 0 : 0;
  const finalAmount = Math.max(0, totalAmount + SHIPPING_FEE - discount);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;
    setVoucherLoading(true);
    setVoucherError("");
    setVoucher(null);
    try {
      const res = await fetchVoucherByCode({ voucherCode: voucherCode.trim() });
      if (res?.data) {
        const voucherData = res.data;
        if (voucherData.is_used) { setVoucherError("Voucher đã được sử dụng!"); return; }
        const now = new Date();
        const expiry = new Date(voucherData.expired_at);
        if (expiry < now) { setVoucherError("Voucher đã hết hạn!"); return; }
        setVoucher(voucherData);
      } else {
        setVoucherError("Voucher không hợp lệ hoặc không tồn tại!");
      }
    } catch (e) {
      setVoucherError("Voucher không hợp lệ hoặc không tồn tại!");
    } finally {
      setVoucherLoading(false);
    }
  };

  const handleCOD = async () => {
    if (!address.trim()) { Alert.alert("Lỗi", "Vui lòng nhập địa chỉ giao hàng!"); return; }
    if (!phone.trim()) { Alert.alert("Lỗi", "Vui lòng nhập số điện thoại!"); return; }
    setLoading(true);
    try {
      await checkoutOrder({
        user_id: userId,
        cart_ids: items.map((item) => item.id),
        recipient_name: name,
        email,
        phone: phone.trim(),
        address: address.trim(),
        note: note.trim() || null,
        voucher_code: voucher?.voucher_code || voucherCode.trim() || null,
        discount_amount: discount,
        shipping_fee: SHIPPING_FEE,
        total_amount: finalAmount,
        payment_method: "cod",
      });
      Alert.alert("Thành công", "Đặt hàng thành công! Thanh toán khi nhận hàng.", [
        { text: "Xem đơn hàng", onPress: () => navigation.navigate("OrderHistory") },
        { text: "Về trang chủ", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (e) {
      Alert.alert("Lỗi", e.message || "Đã xảy ra lỗi khi đặt hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleStripe = async () => {
    if (!address.trim()) { Alert.alert("Lỗi", "Vui lòng nhập địa chỉ giao hàng!"); return; }
    if (!phone.trim()) { Alert.alert("Lỗi", "Vui lòng nhập số điện thoại!"); return; }
    setLoading(true);
    try {
      const responseCreatePaymentIntent = await createPaymentIntent(finalAmount);
      if (!responseCreatePaymentIntent) { Alert.alert("Lỗi", "Không thể tạo thanh toán. Vui lòng thử lại."); return; }
      if (responseCreatePaymentIntent.error) { Alert.alert("Lỗi", responseCreatePaymentIntent.error); return; }
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "E-Pharmacy",
        paymentIntentClientSecret: responseCreatePaymentIntent.paymentIntent,
        customerId: userId,
        returnURL: "myapp://stripe-redirect",
      });
      if (initError) { Alert.alert("Lỗi", initError.message); return; }
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) { Alert.alert("Lỗi thanh toán", paymentError.message); return; }
      await checkoutOrder({
        user_id: userId,
        cart_ids: items.map((item) => item.id),
        recipient_name: name,
        email,
        phone: phone.trim(),
        address: address.trim(),
        note: note.trim() || null,
        voucher_code: voucher?.voucher_code || voucherCode.trim() || null,
        discount_amount: discount,
        shipping_fee: SHIPPING_FEE,
        total_amount: finalAmount,
        payment_method: "stripe",
      });
      Alert.alert("Thành công", "Đặt hàng thành công!", [
        { text: "Xem đơn hàng", onPress: () => navigation.navigate("OrderHistory") },
        { text: "Về trang chủ", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (e) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi trong quá trình thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "cod") handleCOD();
    else handleStripe();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh Toán</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="location-outline" size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
          </View>
          <Text style={styles.label}>Họ tên người nhận</Text>
          <View style={styles.inputReadonly}><Text style={styles.inputReadonlyText}>{name}</Text></View>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputReadonly}><Text style={styles.inputReadonlyText}>{email}</Text></View>
          <Text style={styles.label}>Số điện thoại *</Text>
          <TextInput style={styles.input} placeholder="Nhập số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Text style={styles.label}>Địa chỉ giao hàng *</Text>
          <TextInput
            style={styles.input}
            placeholder="Số nhà, tên đường..."
            value={detailAddress}
            onChangeText={(text) => {
              setDetailAddress(text);
              setAddress(text + (areaAddress ? ", " + areaAddress : ""));
            }}
          />
          <AddressPicker onSelect={(area) => { setAreaAddress(area); setAddress((detailAddress ? detailAddress + ", " : "") + area); }} />
          <Text style={styles.label}>Ghi chú</Text>
          <TextInput style={[styles.input, styles.inputMultiline]} placeholder="Ghi chú cho đơn hàng (không bắt buộc)" value={note} onChangeText={setNote} multiline numberOfLines={2} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="bag-outline" size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Sản phẩm ({items.length})</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productQty}>x{item.quantity}</Text>
              </View>
              <Text style={styles.productPrice}>{formatCurrency(item.new_price * item.quantity)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="pricetag-outline" size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Mã giảm giá</Text>
          </View>
          <View style={styles.voucherRow}>
            <TextInput
              style={styles.voucherInput}
              placeholder="Nhập mã voucher"
              value={voucherCode}
              onChangeText={(text) => { setVoucherCode(text); setVoucherError(""); setVoucher(null); }}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.voucherButton} onPress={handleApplyVoucher} disabled={voucherLoading}>
              {voucherLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.voucherButtonText}>Áp dụng</Text>}
            </TouchableOpacity>
          </View>
          {voucherError ? <Text style={styles.voucherError}>{voucherError}</Text> : null}
          {voucher ? (
            <View style={styles.voucherSuccess}>
              <Icon name="checkmark-circle" size={16} color="#16a34a" />
              <Text style={styles.voucherSuccessText}>Áp dụng thành công! Giảm {formatCurrency(voucher.discount_amount || 0)}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="receipt-outline" size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>{formatCurrency(totalAmount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí giao hàng</Text>
            <Text style={styles.summaryValue}>{formatCurrency(SHIPPING_FEE)}</Text>
          </View>
          {voucher ? (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: "#16a34a" }]}>Giảm giá</Text>
              <Text style={[styles.summaryValue, { color: "#16a34a" }]}>-{formatCurrency(discount)}</Text>
            </View>
          ) : null}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>{formatCurrency(finalAmount)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="card-outline" size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          </View>
          <TouchableOpacity style={[styles.paymentOption, paymentMethod === "stripe" && styles.paymentOptionActive]} onPress={() => setPaymentMethod("stripe")}>
            <Icon name="card" size={20} color={paymentMethod === "stripe" ? "#2563eb" : "#64748b"} />
            <Text style={[styles.paymentOptionText, paymentMethod === "stripe" && styles.paymentOptionTextActive]}>Thẻ tín dụng / Ghi nợ (Stripe)</Text>
            {paymentMethod === "stripe" && <Icon name="checkmark-circle" size={18} color="#16a34a" style={{ marginLeft: "auto" }} />}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paymentOption, paymentMethod === "cod" && styles.paymentOptionActive]} onPress={() => setPaymentMethod("cod")}>
            <Icon name="cash" size={20} color={paymentMethod === "cod" ? "#2563eb" : "#64748b"} />
            <Text style={[styles.paymentOptionText, paymentMethod === "cod" && styles.paymentOptionTextActive]}>Thanh toán khi nhận hàng (COD)</Text>
            {paymentMethod === "cod" && <Icon name="checkmark-circle" size={18} color="#16a34a" style={{ marginLeft: "auto" }} />}
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Tổng thanh toán</Text>
          <Text style={styles.footerTotalValue}>{formatCurrency(finalAmount)}</Text>
        </View>
        <TouchableOpacity style={[styles.payButton, loading && styles.payButtonDisabled]} onPress={handlePayment} disabled={loading}>
          {loading
            ? <ActivityIndicator size="small" color="#fff" />
            : <Text style={styles.payButtonText}>{paymentMethod === "cod" ? "Đặt hàng (COD)" : "Đặt hàng & Thanh toán"}</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    backgroundColor: "#2563eb",
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingTop: 50 * scaleHeight, paddingBottom: 15 * scaleHeight, paddingHorizontal: 16 * scaleWidth,
  },
  headerTitle: { color: "#fff", fontSize: 18 * scaleWidth, fontWeight: "bold" },
  scroll: { flex: 1 },
  section: {
    backgroundColor: "#fff", marginHorizontal: 12 * scaleWidth, marginTop: 12 * scaleHeight,
    borderRadius: 12 * scaleWidth, padding: 16 * scaleWidth,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 * scaleWidth, marginBottom: 12 * scaleHeight },
  sectionTitle: { fontSize: 15 * scaleWidth, fontWeight: "700", color: "#1e293b" },
  label: { fontSize: 13 * scaleWidth, color: "#64748b", marginBottom: 4 * scaleHeight, marginTop: 8 * scaleHeight },
  input: { borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 8 * scaleWidth, padding: 10 * scaleWidth, fontSize: 14 * scaleWidth, color: "#1e293b", backgroundColor: "#f8fafc" },
  inputMultiline: { minHeight: 60 * scaleHeight, textAlignVertical: "top" },
  inputReadonly: { borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 8 * scaleWidth, padding: 10 * scaleWidth, backgroundColor: "#f1f5f9" },
  inputReadonlyText: { fontSize: 14 * scaleWidth, color: "#64748b" },
  productItem: { flexDirection: "row", alignItems: "center", paddingVertical: 8 * scaleHeight, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  productImage: { width: 50 * scaleWidth, height: 50 * scaleWidth, borderRadius: 8 * scaleWidth, backgroundColor: "#f8fafc" },
  productInfo: { flex: 1, marginHorizontal: 10 * scaleWidth },
  productName: { fontSize: 13 * scaleWidth, fontWeight: "600", color: "#1e293b" },
  productQty: { fontSize: 12 * scaleWidth, color: "#64748b", marginTop: 2 * scaleHeight },
  productPrice: { fontSize: 13 * scaleWidth, fontWeight: "700", color: "#2563eb" },
  voucherRow: { flexDirection: "row", gap: 8 * scaleWidth },
  voucherInput: { flex: 1, borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 8 * scaleWidth, padding: 10 * scaleWidth, fontSize: 14 * scaleWidth, color: "#1e293b", backgroundColor: "#f8fafc" },
  voucherButton: { backgroundColor: "#2563eb", borderRadius: 8 * scaleWidth, paddingHorizontal: 16 * scaleWidth, justifyContent: "center", alignItems: "center" },
  voucherButtonText: { color: "#fff", fontWeight: "700", fontSize: 13 * scaleWidth },
  voucherError: { color: "#ef4444", fontSize: 12 * scaleWidth, marginTop: 6 * scaleHeight },
  voucherSuccess: { flexDirection: "row", alignItems: "center", gap: 6 * scaleWidth, marginTop: 6 * scaleHeight },
  voucherSuccessText: { color: "#16a34a", fontSize: 12 * scaleWidth, fontWeight: "600" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 * scaleHeight },
  summaryLabel: { fontSize: 14 * scaleWidth, color: "#64748b" },
  summaryValue: { fontSize: 14 * scaleWidth, color: "#1e293b", fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 8 * scaleHeight },
  totalLabel: { fontSize: 16 * scaleWidth, fontWeight: "700", color: "#1e293b" },
  totalValue: { fontSize: 16 * scaleWidth, fontWeight: "700", color: "#2563eb" },
  paymentOption: {
    flexDirection: "row", alignItems: "center", gap: 10 * scaleWidth,
    padding: 12 * scaleWidth, borderRadius: 8 * scaleWidth,
    borderWidth: 1, borderColor: "#e2e8f0", marginBottom: 8 * scaleHeight,
    backgroundColor: "#f8fafc",
  },
  paymentOptionActive: { borderColor: "#2563eb", backgroundColor: "#eff6ff" },
  paymentOptionText: { fontSize: 14 * scaleWidth, color: "#64748b", fontWeight: "600" },
  paymentOptionTextActive: { color: "#1e293b" },
  footer: {
    backgroundColor: "#fff", padding: 16 * scaleWidth, paddingBottom: 30 * scaleHeight,
    borderTopWidth: 1, borderTopColor: "#e2e8f0",
    shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 5,
  },
  footerTotal: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 * scaleHeight },
  footerTotalLabel: { fontSize: 14 * scaleWidth, color: "#64748b" },
  footerTotalValue: { fontSize: 16 * scaleWidth, fontWeight: "700", color: "#2563eb" },
  payButton: { backgroundColor: "#2563eb", borderRadius: 12 * scaleWidth, padding: 16 * scaleWidth, alignItems: "center" },
  payButtonDisabled: { backgroundColor: "#93c5fd" },
  payButtonText: { color: "#fff", fontSize: 16 * scaleWidth, fontWeight: "700" },
});

export default CheckoutScreen;