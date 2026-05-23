import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity,
  Image, ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import formatCurrency from "../../utils/formatMoney";
import API_APP from "../../utils/config";
import styles from "./style";

const STATUS_CONFIG = {
  pending:    { label: "Chờ xử lý",  color: "#f59e0b", bg: "#fef3c7" },
  processing: { label: "Đang xử lý", color: "#2563eb", bg: "#eff6ff" },
  done:       { label: "Hoàn thành", color: "#16a34a", bg: "#dcfce7" },
  cancelled:  { label: "Đã hủy",     color: "#ef4444", bg: "#fee2e2" },
};

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const { userId } = useSelector((state) => state.profile);

  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [page, setPage]             = useState(1);
  const [hasMore, setHasMore]       = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async (currentPage = 1, reset = false) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_APP}/v1/api/order/history?user_id=${userId}&page=${currentPage}&limit=10`
      ).then((r) => r.json());

      if (res?.data?.orders) {
        const newOrders = res.data.orders;
        setOrders((prev) => (reset ? newOrders : [...prev, ...newOrders]));
        setHasMore(newOrders.length === 10);
      }
    } catch (e) {
      console.error("Fetch orders error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchOrders(1, true);
  }, [userId]);

  const loadMore = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchOrders(nextPage);
  };

  const renderOrder = ({ item: order }) => {
    const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
    const isExpanded = expandedId === order.id;

    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => setExpandedId(isExpanded ? null : order.id)}
        activeOpacity={0.85}
      >
        {/* Header: mã đơn + trạng thái */}
        <View style={styles.orderHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.orderCode}>{order.order_code}</Text>
            <Text style={styles.orderDate}>
              {new Date(order.created_at).toLocaleDateString("vi-VN", {
                day: "2-digit", month: "2-digit", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}>
            <Text style={[styles.statusText, { color: statusCfg.color }]}>
              {statusCfg.label}
            </Text>
          </View>
        </View>

        {/* Preview 2 sản phẩm đầu */}
        <View style={styles.itemsPreview}>
          {order.items?.slice(0, 2).map((item, idx) => (
            <View key={idx} style={styles.previewRow}>
              <Image
                source={{ uri: item.image }}
                style={styles.previewImg}
                resizeMode="contain"
              />
              <Text style={styles.previewName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.previewQty}>x{item.quantity}</Text>
            </View>
          ))}
          {(order.items?.length || 0) > 2 && !isExpanded && (
            <Text style={styles.moreItems}>
              +{order.items.length - 2} sản phẩm khác • Nhấn để xem
            </Text>
          )}
        </View>

        {/* Chi tiết mở rộng */}
        {isExpanded && (
          <View style={styles.expandedSection}>
            {/* Các sản phẩm còn lại */}
            {order.items?.slice(2).map((item, idx) => (
              <View key={idx} style={styles.previewRow}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.previewImg}
                  resizeMode="contain"
                />
                <Text style={styles.previewName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.previewQty}>x{item.quantity}</Text>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Icon name="location-outline" size={14} color="#64748b" />
              <Text style={styles.infoText}>{order.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="call-outline" size={14} color="#64748b" />
              <Text style={styles.infoText}>{order.phone}</Text>
            </View>
            {order.discount_amount > 0 && (
              <View style={styles.infoRow}>
                <Icon name="pricetag-outline" size={14} color="#16a34a" />
                <Text style={[styles.infoText, { color: "#16a34a" }]}>
                  Giảm {formatCurrency(order.discount_amount)}
                </Text>
              </View>
            )}
            {order.note ? (
              <View style={styles.infoRow}>
                <Icon name="chatbox-outline" size={14} color="#64748b" />
                <Text style={styles.infoText}>{order.note}</Text>
              </View>
            ) : null}
          </View>
        )}

        {/* Footer: số sp + tổng tiền */}
        <View style={styles.orderFooter}>
          <Text style={styles.itemCount}>
            {order.items?.length || 0} sản phẩm
          </Text>
          <Text style={styles.orderTotal}>
            {formatCurrency(order.total_amount)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && orders.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.centered}>
          <Icon name="bag-outline" size={60} color="#cbd5e1" />
          <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderOrder}
          contentContainerStyle={{ padding: 12 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loading
              ? <ActivityIndicator color="#2563eb" style={{ marginVertical: 12 }} />
              : null
          }
        />
      )}
    </View>
  );
};

export default OrderHistoryScreen;