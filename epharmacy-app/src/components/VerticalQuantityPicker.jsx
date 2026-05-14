import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { scaleHeight, scaleWidth } from "../utils/config";
const VerticalQuantityPicker = ({
  quantity,
  handleDecrease,
  handleIncrease,
}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleDecrease}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable style={styles.button} onPress={handleIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 150 * scaleWidth,
    marginVertical: 20 * scaleHeight,
    backgroundColor: "#f5f5f5",
    borderRadius: 10 * scaleWidth,
    padding: 10 * scaleWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#4CD20A",
    borderRadius: 5 * scaleWidth,
    paddingVertical: 5 * scaleHeight,
    paddingHorizontal: 10 * scaleWidth,
    marginHorizontal: 10 * scaleWidth,
  },
  buttonText: {
    fontSize: 20 * scaleWidth,
    color: "#fff",
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
    color: "#333",
  },
});

export default VerticalQuantityPicker;
