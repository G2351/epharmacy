import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { scaleHeight, scaleWidth } from "../utils/config";
const FullScreenLoading = ({ visible }) => {
  console.log(visible);
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    backgroundColor: "#333", // Darker background for the loading indicator
    padding: 20 * scaleWidth,
    borderRadius: 10 * scaleWidth,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10 * scaleHeight,
    color: "#fff",
    fontSize: 18 * scaleWidth,
    fontWeight: "bold",
  },
});

export default FullScreenLoading;
