
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
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const MENU_ITEMS = [
  { label: "Giỏ hàng",           screen: "Cart",          icon: "bag-outline" },
  { label: "Mua thuốc",          screen: "Medicines",     icon: "medkit-outline" },
  { label: "Lịch sử đơn hàng",   screen: "OrderHistory",  icon: "receipt-outline" },
  { label: "Bài viết",           screen: "Articles",      icon: "newspaper-outline" },
];

const Sidebar = ({ navigation, toggleSidebar, visible }) => {
  const { name } = useSelector((state) => state.profile);
  const [translateX] = useState(new Animated.Value(-width * 0.75));

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -width * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, translateX]);

  const handleNavigate = (screen) => {
    toggleSidebar();
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {visible && <Pressable style={styles.overlay} onPress={toggleSidebar} />}

      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        {/* Header */}
        <View style={styles.row_logo}>
          <View>
            <Text style={styles.text_profile}>
              Chào <Text>{name || "Bạn "}!</Text>
            </Text>
            <Text style={styles.text_hello}>Hôm nay bạn thế nào ?</Text>
          </View>
          <Image
            source={require("../assets/img/logo_stand.png")}
            style={styles.logo}
          />
        </View>

        {/* Menu items */}
        {MENU_ITEMS.map(({ label, screen, icon }) => (
          <TouchableOpacity
            key={screen}
            onPress={() => handleNavigate(screen)}
            style={styles.menuItem}
          >
            <Icon name={icon} size={20 * scaleWidth} color="#006980" style={styles.menuIcon} />
            <Text style={styles.menuText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 10,
  },
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 5,
  },
  sidebar: {
    position: "absolute",
    top: 0, left: 0, bottom: 0,
    width: width * 0.8,
    height: height,
    backgroundColor: "#fff",
    zIndex: 10,
    padding: 20 * scaleWidth,
  },
  row_logo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10 * scaleHeight,
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuIcon: {
    marginRight: 12 * scaleWidth,
  },
  menuText: {
    fontSize: 16 * scaleWidth,
    color: "#333",
  },
});

export default Sidebar;