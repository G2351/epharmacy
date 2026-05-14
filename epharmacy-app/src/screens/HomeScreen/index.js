import React, { useState, useEffect } from "react";
import {
  View, Text, Pressable, Image, ScrollView,
  FlatList, TouchableOpacity, StyleSheet, Dimensions,
} from "react-native";
import styles from "./style";
import { Icon } from "react-native-elements";
import { getProfile } from "../../utils/user/profileUser";
import { setProfileRedux } from "../../store/slice/profileSlice";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import SaleBackground from "../../components/SaleBackground";
import countOrderById from "../../utils/order/countOrderById";
import { setCount } from "../../store/slice/countOrderSlice";
import fetchMedicines from "../../utils/medicines/fetchMedicines";
import fetchArticles from "../../utils/articles/fetchArticles";
import { scaleWidth, scaleHeight } from "../../utils/config";

const { width } = Dimensions.get("window");

export default function HomeVip({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { count } = useSelector((state) => state.countOrder);
  const dispatch = useDispatch();

  const handleNavigate = (screen) => navigation.navigate(screen);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const fetchProfile = async () => {
    try {
      const { userId, name, email } = await getProfile();
      const count = await countOrderById(userId, setCount);
      dispatch(setCount(count));
      dispatch(setProfileRedux({ userId, name, email }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchMedicines(setMedicines);
    fetchArticles(setArticles, setLoading);
  }, []);

  const renderMedicineBanner = ({ item }) => (
    <TouchableOpacity
      style={bannerStyles.medicineCard}
      onPress={() => navigation.navigate("DetailsMedicine", { item })}
    >
      <Image
        source={{ uri: item.image }}
        style={bannerStyles.medicineImage}
        resizeMode="contain"
      />
      <Text style={bannerStyles.medicineName} numberOfLines={2}>{item.name}</Text>
      <Text style={bannerStyles.medicinePrice}>
        {Number(item.new_price).toLocaleString("vi-VN")}đ
      </Text>
    </TouchableOpacity>
  );

  const renderArticleBanner = ({ item }) => (
    <TouchableOpacity
      style={bannerStyles.articleCard}
      onPress={() => navigation.navigate("ArticlesDetails", { item })}
    >
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={bannerStyles.articleImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[bannerStyles.articleImage, { backgroundColor: "#e2e8f0", justifyContent: "center", alignItems: "center" }]}>
          <Text style={{ color: "#94a3b8", fontSize: 12 * scaleWidth }}>Không có ảnh</Text>
        </View>
      )}
      <View style={bannerStyles.articleContent}>
        <Text style={bannerStyles.articleTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={bannerStyles.articleDesc} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row_logo}>
        <Pressable onPress={toggleSidebar} style={styles.menuIcon}>
          <Icon name="menu" size={30} color="#000" />
        </Pressable>
        <Image
          source={require("../../assets/img/logo_stand.png")}
          style={styles.logo}
        />
        <Pressable onPress={() => handleNavigate("Profile")} style={styles.menuIcon}>
          <Icon name="account-circle" size={30} color="#000" />
        </Pressable>
      </View>

      {sidebarVisible && (
        <Sidebar visible={sidebarVisible} toggleSidebar={toggleSidebar} navigation={navigation} />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dịch vụ */}
        <View style={styles.service}>
          <Text style={styles.service_title}>Dịch vụ</Text>
          <View style={styles.service_list}>
            <View style={styles.container_item_service}>
              <Pressable style={styles.item_service} onPress={() => handleNavigate("Medicines")}>
                <Image source={require("../../assets/icon/medicine.png")} style={styles.img_item_service} />
              </Pressable>
              <Text style={styles.name_item_service}>Mua thuốc</Text>
            </View>
            <View style={styles.container_item_service}>
              <Pressable style={styles.item_service} onPress={() => handleNavigate("Cart")}>
                <Image source={require("../../assets/icon/cart.png")} style={styles.img_item_service} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{count}</Text>
                </View>
              </Pressable>
              <Text style={styles.name_item_service}>Giỏ hàng</Text>
            </View>
            <View style={styles.container_item_service}>
              <Pressable style={styles.item_service} onPress={() => handleNavigate("Articles")}>
                <Image source={require("../../assets/icon/blog.png")} style={styles.img_item_service} />
              </Pressable>
              <Text style={styles.name_item_service}>Bài viết</Text>
            </View>
          </View>
        </View>

        {/* Banner sản phẩm */}
        <View style={bannerStyles.section}>
          <View style={bannerStyles.sectionHeader}>
            <Text style={bannerStyles.sectionTitle}>🛒 Sản phẩm nổi bật</Text>
            <TouchableOpacity onPress={() => handleNavigate("Medicines")}>
              <Text style={bannerStyles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={medicines.slice(0, 10)}
            renderItem={renderMedicineBanner}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 * scaleWidth }}
          />
        </View>

        {/* Banner tin tức */}
        <View style={bannerStyles.section}>
          <View style={bannerStyles.sectionHeader}>
            <Text style={bannerStyles.sectionTitle}>📰 Tin tức sức khỏe</Text>
            <TouchableOpacity onPress={() => handleNavigate("Articles")}>
              <Text style={bannerStyles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={articles.slice(0, 10)}
            renderItem={renderArticleBanner}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 * scaleWidth }}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const bannerStyles = StyleSheet.create({
  section: {
    marginTop: 16 * scaleHeight,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8 * scaleHeight,
    paddingHorizontal: 4 * scaleWidth,
  },
  sectionTitle: {
    fontSize: 16 * scaleWidth,
    fontWeight: "700",
    color: "#006980",
  },
  seeAll: {
    fontSize: 13 * scaleWidth,
    color: "#2563eb",
    fontWeight: "600",
  },
  medicineCard: {
    width: 120 * scaleWidth,
    backgroundColor: "#fff",
    borderRadius: 12 * scaleWidth,
    padding: 10 * scaleWidth,
    marginRight: 10 * scaleWidth,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medicineImage: {
    width: 80 * scaleWidth,
    height: 80 * scaleWidth,
    borderRadius: 8 * scaleWidth,
    backgroundColor: "#f8fafc",
  },
  medicineName: {
    fontSize: 12 * scaleWidth,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
    marginTop: 6 * scaleHeight,
  },
  medicinePrice: {
    fontSize: 12 * scaleWidth,
    fontWeight: "700",
    color: "#16a34a",
    marginTop: 4 * scaleHeight,
  },
  articleCard: {
    width: 200 * scaleWidth,
    backgroundColor: "#fff",
    borderRadius: 12 * scaleWidth,
    marginRight: 10 * scaleWidth,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  articleImage: {
    width: "100%",
    height: 100 * scaleHeight,
  },
  articleContent: {
    padding: 8 * scaleWidth,
  },
  articleTitle: {
    fontSize: 13 * scaleWidth,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4 * scaleHeight,
  },
  articleDesc: {
    fontSize: 11 * scaleWidth,
    color: "#64748b",
  },
});