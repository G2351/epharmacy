import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from "expo-linear-gradient";
import { scaleHeight, scaleWidth } from "../utils/config";
const GradientButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.btn_submit}>
      <LinearGradient
        colors={["#00E563", "#2E8B57", "#2E8B57", "#32CD32"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn_submit: {
    width: "100%",
    overflow: "hidden",
  },
  button: {
    paddingVertical: 15 * scaleHeight,
    paddingHorizontal: 40 * scaleWidth,
    borderRadius: 25 * scaleWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
  },
});

export default GradientButton;
