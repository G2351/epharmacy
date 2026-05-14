import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const ProtectedRoute = ({ children }) => {
  const navigation = useNavigation();
  const userId = useSelector((state) => state.profile.userId); // Lấy userId từ Redux

  if (!userId) {
    // Nếu chưa đăng nhập, điều hướng đến màn hình đăng nhập
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Bạn cần đăng nhập để sử dụng tính năng này</Text>
        <Button
          title="Đăng nhập "
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }], // Điều hướng tới màn hình Login và reset stack
            })
          } // Điều hướng tới màn hình đăng nhập
        />
      </View>
    );
  }

  // Nếu đã đăng nhập, hiển thị màn hình con
  return children;
};
const styles = StyleSheet.create({});
export default ProtectedRoute;
