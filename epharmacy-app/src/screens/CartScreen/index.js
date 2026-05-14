import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CartItem from "../../components/ItemCart";
import fetchOrderById from "../../utils/order/fetchOrderById";
import { getProfile } from "../../utils/user/profileUser";
import deleteOrderById from "../../utils/order/deleteOrderById";
import updateQuantity from "../../utils/order/updateQuantity";
import formatCurrency from "../../utils/formatMoney";
import styles from "./style";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { descreaseCount, setCount } from "../../store/slice/countOrderSlice";

const CartScreen = () => {
  const [items, setItems] = useState([]);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { userId } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const increaseQuantity = async (id) => {
    const quantity = items.find((item) => item.id === id).quantity;
    await updateQuantity(id, quantity + 1);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = async (id) => {
    const quantity = items.find((item) => item.id === id).quantity;
    await updateQuantity(id, quantity - 1);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = async (id) => {
    await deleteOrderById(id);
    dispatch(descreaseCount());
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!itemsSelected.length) {
      Alert.alert("Thông báo", "Vui lòng chọn sản phẩm để thanh toán!");
      return;
    }
    const selectedItems = items.filter((item) =>
      itemsSelected.includes(item.id)
    );
    navigation.navigate("Checkout", {
      items: selectedItems,
      itemIds: itemsSelected,
      totalAmount,
    });
  };

  const selectItem = (id) => {
    if (itemsSelected.includes(id)) {
      setItemsSelected(itemsSelected.filter((item) => item !== id));
    } else {
      setItemsSelected([...itemsSelected, id]);
    }
  };

  useEffect(() => {
    const total = items
      .filter((item) => itemsSelected.includes(item.id))
      .reduce((total, item) => total + item.new_price * item.quantity, 0);
    setTotalAmount(total);
  }, [itemsSelected, items]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId } = await getProfile();
        if (userId) {
          await fetchOrderById(userId, "pending", setItems);
        }
      } catch (error) {
        console.error("Error fetching profile or cart:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setCount(items.length));
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>
      {items.length ? (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onDelete={deleteItem}
              selectItem={selectItem}
              itemsSelected={itemsSelected}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      ) : (
        <View style={styles.noCart}>
          <Icon name="cart" size={40} />
          <Text style={styles.textNoProduct}>Không có sản phẩm nào</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate("Medicines")}
          >
            <Text style={styles.checkoutButtonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Thành Tiền:</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
        <TouchableOpacity
          disabled={!itemsSelected.length}
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;