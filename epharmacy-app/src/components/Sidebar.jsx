// Sidebar.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { getProfile } from "../utils/user/profileUser";
import { scaleHeight, scaleWidth } from "../utils/config";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window"); // lấy cả chiều cao màn hình

const Sidebar = ({ navigation, toggleSidebar, visible }) => {
  const { name } = useSelector((state) => state.profile);
  console.log(name);
  // const [profile, setProfile] = useState(null);
  // console.log('profile: ', profile);
  const [translateX] = useState(new Animated.Value(-width * 0.75)); // 3/4 màn hình
  // const fetchProfile = async () => {
  //   const { userId, name, email } = await getProfile();
  //   // console.log({userId, name});
  //   setProfile({ userId, name, email });
  // };
  // useEffect(() => {
  //   fetchProfile();
  // }, []);
  // Hiệu ứng mở và đóng Sidebar
  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateX]);

  // Điều hướng khi chọn item
  const handleNavigate = (screen) => {
    toggleSidebar();
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Overlay khi sidebar mở */}
      {visible && <Pressable style={styles.overlay} onPress={toggleSidebar} />}

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        <View style={styles.row_logo}>
          <View>
            <Text style={styles.text_profile}>
              Chào <Text>{name ? name : "Bạn "}!</Text>
            </Text>
            <Text style={styles.text_hello}>Hôm nay bạn thế nào ?</Text>
          </View>
          <Image
            source={require("../assets/img/logo_stand.png")}
            style={styles.logo}
          />
        </View>
        
        <TouchableOpacity
          onPress={() => handleNavigate("Cart")}
          style={styles.menuItem}
        >
          <Text style={styles.menuText}>Giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNavigate("Medicines")}
          style={styles.menuItem}
        >
          <Text style={styles.menuText}>Mua thuốc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigate("Articles")}
          style={styles.menuItem}
        >
          <Text style={styles.menuText}>Bài viết</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute", // Đặt Sidebar lên toàn bộ màn hình
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10, // Đảm bảo Sidebar nằm trên các thành phần khác
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 5, // Đặt overlay đè lên nội dung phía sau
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.8, // 3/4 màn hình
    height: height, // Chiều cao toàn màn hình
    backgroundColor: "#fff",
    zIndex: 10,
    padding: 20 * scaleWidth,
  },
  sidebarTitle: {
    fontSize: 22 * scaleWidth,
    fontWeight: "bold",
    marginBottom: 20 * scaleHeight,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16 * scaleWidth,
    color: "#333",
  },
  row_logo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 60 * scaleWidth,
    height: 60 * scaleHeight,
  },
  text_profile: {
    paddingTop: 10 * scaleHeight,
    fontSize: 18 * scaleWidth,
    color: "#006980",
  },
  text_hello: {
    fontSize: 16 * scaleWidth,
    color: "#4CD20A",
  },
});

export default Sidebar;
