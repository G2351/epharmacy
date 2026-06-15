import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import styles from "./style";
import formatCurrency from "../../utils/formatMoney";
import { getProfile } from "../../utils/user/profileUser";
import buyMedicines from "../../utils/medicines/buyMedinces";
import BuyMedicineModel from "../../components/Modal/BuyMedicineModel";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { increaseCount } from "../../store/slice/countOrderSlice";
import checkExistingProduct from "../../utils/order/checkExistingProduct";
import { scaleWidth, scaleHeight } from "../../utils/config";
import API_APP from "../../utils/config";

export default function DetailsMedicineScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const [medicine, setMedicine] = useState(item);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_APP}/v1/api/medicines/${item.id}`).then((r) => r.json());
        if (res?.data) setMedicine(res.data);
      } catch (e) {
        console.error("Error fetching medicine detail:", e);
      } finally {
        setLoadingDetail(false);
      }
    };
    fetchDetail();
  }, [item.id]);

  const handleDecrease = () => { if (quantity > 1) setQuantity(quantity - 1); };
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleBuyPress = () => setModalVisible(true);

  const handleBuyMedicine = async () => {
    const { userId } = await getProfile();
    const data = {
      user_id: +userId,
      product_id: medicine.id,
      quantity,
      status: "pending",
      image: medicine.image,
      name: medicine.name,
      description: medicine.description,
      old_price: medicine.old_price,
      new_price: medicine.new_price,
    };
    const exist = await checkExistingProduct(userId, medicine.id);
    await buyMedicines(data);
    if (!exist) dispatch(increaseCount());
    setQuantity(1);
    setModalVisible(false);
    navigation.navigate("Medicines");
  };

  const handleCloseModal = () => { setModalVisible(false); setQuantity(1); };

  const InfoBlock = ({ title, content }) => {
    if (!content) return null;
    return (
      <View style={detailStyles.infoBlock}>
        <Text style={detailStyles.infoTitle}>{title}</Text>
        <Text style={detailStyles.infoContent}>{content}</Text>
      </View>
    );
  };

  if (loadingDetail) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#006980" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: medicine.image }} style={styles.medicineImage} />
      <View style={styles.detailContainer}>
        <Text style={styles.medicineName}>{medicine.name}</Text>

        <View style={detailStyles.priceRow}>
          <Text style={detailStyles.newPrice}>{formatCurrency(medicine.new_price)}</Text>
          {medicine.old_price ? (
            <Text style={detailStyles.oldPrice}>{formatCurrency(medicine.old_price)}</Text>
          ) : null}
        </View>

        {medicine.rate ? (
          <View style={detailStyles.ratingRow}>
            <Text style={detailStyles.ratingText}>{medicine.rate} / 5</Text>
          </View>
        ) : null}

        {medicine.stock !== undefined && (
          <View style={[detailStyles.stockBadge, { backgroundColor: medicine.stock > 10 ? "#dcfce7" : medicine.stock > 0 ? "#fef3c7" : "#fee2e2" }]}>
            <Text style={[detailStyles.stockText, { color: medicine.stock > 10 ? "#16a34a" : medicine.stock > 0 ? "#d97706" : "#ef4444" }]}>
              {medicine.stock > 0 ? `Còn ${medicine.stock} sản phẩm` : "Hết hàng"}
            </Text>
          </View>
        )}

        <View style={detailStyles.divider} />

        <InfoBlock title="Mô tả" content={medicine.description} />
        <InfoBlock title="Quy cách đóng gói" content={medicine.packaging} />
        <InfoBlock title="Trường hợp dùng" content={medicine.indications} />
        <InfoBlock title="Trường hợp không dùng" content={medicine.contraindications} />

        {(medicine.brand?.name || medicine.categoryMedicine?.name) && (
          <View style={detailStyles.tagRow}>
            {medicine.categoryMedicine?.name && (
              <View style={detailStyles.tag}>
                <Text style={detailStyles.tagText}>{medicine.categoryMedicine.name}</Text>
              </View>
            )}
            {medicine.brand?.name && (
              <View style={[detailStyles.tag, { backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }]}>
                <Text style={[detailStyles.tagText, { color: "#2563eb" }]}>{medicine.brand.name}</Text>
              </View>
            )}
          </View>
        )}

        <View style={detailStyles.divider} />

        <Pressable
          style={[styles.buyButton, medicine.stock === 0 && { backgroundColor: "#94a3b8" }]}
          onPress={handleBuyPress}
          disabled={medicine.stock === 0}
        >
          <Text style={styles.buyButtonText}>
            {medicine.stock === 0 ? "Hết hàng" : "Mua hàng"}
          </Text>
        </Pressable>
      </View>

      {modalVisible && (
        <BuyMedicineModel
          modalVisible={modalVisible}
          item={medicine}
          handleCloseModal={handleCloseModal}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          handleBuyMedicine={handleBuyMedicine}
          quantity={quantity}
        />
      )}
    </ScrollView>
  );
}

const detailStyles = StyleSheet.create({
  priceRow: { flexDirection: "row", alignItems: "center", gap: 12 * scaleWidth, marginTop: 8 * scaleHeight, marginBottom: 4 * scaleHeight },
  newPrice: { fontSize: 22 * scaleWidth, fontWeight: "700", color: "#16a34a" },
  oldPrice: { fontSize: 15 * scaleWidth, color: "#94a3b8", textDecorationLine: "line-through" },
  ratingRow: { marginBottom: 8 * scaleHeight },
  ratingText: { fontSize: 14 * scaleWidth, color: "#f59e0b", fontWeight: "600" },
  stockBadge: { alignSelf: "flex-start", paddingHorizontal: 12 * scaleWidth, paddingVertical: 4 * scaleHeight, borderRadius: 20 * scaleWidth, marginBottom: 12 * scaleHeight },
  stockText: { fontSize: 13 * scaleWidth, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 12 * scaleHeight },
  infoBlock: { marginBottom: 12 * scaleHeight },
  infoTitle: { fontSize: 14 * scaleWidth, fontWeight: "700", marginBottom: 4 * scaleHeight, color: "#006980" },
  infoContent: { fontSize: 14 * scaleWidth, color: "#475569", lineHeight: 22 * scaleHeight },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 * scaleWidth, marginTop: 4 * scaleHeight },
  tag: { backgroundColor: "#f0fdf4", borderWidth: 1, borderColor: "#bbf7d0", borderRadius: 20 * scaleWidth, paddingHorizontal: 12 * scaleWidth, paddingVertical: 4 * scaleHeight },
  tagText: { fontSize: 12 * scaleWidth, color: "#16a34a", fontWeight: "600" },
});