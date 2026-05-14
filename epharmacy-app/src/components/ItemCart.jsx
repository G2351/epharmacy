import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import formatCurrency from "../utils/formatMoney";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
import { scaleHeight, scaleWidth } from "../utils/config";
const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onDelete,
  selectItem,
  itemsSelected,
}) => {
  const handleChangeValue = () => {
    console.log("handleChangeValue");
  };
  // Render nút xóa khi vuốt
  const renderRightActions = () => (
    <View style={styles.containerDelete}>
      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={styles.deleteButton}
      >
        <Icon name="trash" size={20} style={styles.deleteButtonText} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <CheckBox
          checked={itemsSelected.includes(item.id)}
          onPress={() => selectItem(item.id)}
        />
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>
            Giá : {formatCurrency(item.new_price)}
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => onDecrease(item.id)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onIncrease(item.id)}
              style={[styles.button, styles.buttonIncreament]}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5 * scaleWidth,
    marginVertical: 10 * scaleHeight,
    flexDirection: "row",
    alignItems: "center",
    padding: 10 * scaleWidth,
    borderRadius: 10 * scaleWidth,
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  image: {
    width: 80 * scaleWidth,
    height: 80 * scaleHeight,
    borderRadius: 10 * scaleWidth,
    marginRight: 15 * scaleWidth,
    backgroundColor: "#f0f0f0",
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18 * scaleWidth,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  price: {
    paddingLeft: 10 * scaleWidth,
    fontSize: 16 * scaleWidth,
    color: "#4caf50",
    marginBottom: 10 * scaleHeight,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 30 * scaleWidth,
    height: 30 * scaleHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 15 * scaleWidth,
    marginHorizontal: 5 * scaleWidth,
  },
  buttonIncreament: {
    backgroundColor: "#4caf50",
  },
  buttonText: {
    fontSize: 20 * scaleWidth,
    color: "#555",
  },
  quantity: {
    fontSize: 16 * scaleWidth,
    marginHorizontal: 10 * scaleWidth,
    color: "#333",
  },
  containerDelete: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40 * scaleWidth,
    height: 40 * scaleHeight,
    backgroundColor: "white",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
  },
});

export default CartItem;
