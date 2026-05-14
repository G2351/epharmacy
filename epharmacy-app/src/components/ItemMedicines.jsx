import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Rating } from "react-native-ratings";
import formatCurrency from "../utils/formatMoney";
import { scaleHeight, scaleWidth } from "../utils/config";
export default function ItemMedicines({ item, navigation }) {
  const [medicine, setMedicine] = useState(item);
  const handleMedicineDetail = () => {
    navigation.navigate("DetailsMedicine", { item: medicine });
  };
  return (
    <View style={styles.item_medicines}>
      <Pressable onPress={handleMedicineDetail}>
        <View style={styles.container_img}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.container_content}>
          <View style={styles.container_name}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.container_price}>
            <Text style={styles.text_new_price}>
              {formatCurrency(item.new_price)}
            </Text>
            <Text style={styles.text_old_price}>
              {formatCurrency(item.old_price)}
            </Text>
          </View>
          <Rating
            startingValue={item.rate}
            imageSize={10}
            readonly
            fractions={1}
            style={styles.container_rate}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item_medicines: {
    width: "48%",
    height: 190 * scaleHeight,
    backgroundColor: "#fff",
    padding: 5 * scaleWidth,
    borderRadius: 10 * scaleWidth,
  },
  container_img: {
    width: "100%",
    height: "45%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5 * scaleHeight,
  },
  image: {
    width: 80 * scaleWidth,
    height: "100%",
    borderRadius: 8 * scaleWidth,
  },
  container_content: {
    marginTop: 10 * scaleHeight,
    height: "45%",
    flexDirection: "column",
  },
  container_name: {
    height: 20 * scaleHeight,
    justifyContent: "center",
  },
  container_price: {
    flexDirection: "row",
    columnGap: 10 * scaleWidth,
    alignItems: "center",
  },
  text_new_price: {
    fontWeight: "bold",
    fontSize: 14 * scaleWidth,
  },
  text_old_price: {
    color: "red",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "red",
  },
  container_rate: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
});
