import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, Pressable } from "react-native";
import styles from "./style";
import fetchMedicines from "../../utils/medicines/fetchMedicines";
import { SearchBar } from "react-native-elements";
// import {debounce} from '../../utils/debounce';
import debounce from "lodash.debounce";
import HorizontalScroll from "../../components/HorizontalScroll";
import ListMedicines from "../../components/ListMedicines";
import searchMedicineByName from "../../utils/medicines/searchMedicineByName";
import countOrderById from "../../utils/order/countOrderById";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import increaseCount from "../../store/slice/countOrderSlice";
export default function MedicinesScreen() {
  const navigation = useNavigation();
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  // const [count, setCount] = useState(0);
  const [idCategory, setIdCategory] = useState("");
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.profile);
  const { count } = useSelector((state) => state.countOrder);
  console.log("count", count);
  console.log("userId", userId);
  const updateSearch = (text) => {
    setSearch(text);
    debouncedSearch(text);
  };
  const debouncedSearch = useCallback(
    debounce(
      (text) => searchMedicineByName(text, idCategory, setMedicines),
      500
    ), // 500ms delay
    [idCategory]
  );
  const handleArrow = () => {
    navigation.navigate("BenefitScreen");
  };
  const handleNavigatorCart = () => {
    navigation.navigate("Cart");
  };
  useEffect(() => {
    const fethchData = async () => {
      try {
        fetchMedicines(setMedicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };
    fethchData();
  }, []);
  // useEffect(() => {
  //   const countData = async (userId) => {
  //     try {
  //       countOrderById(userId, setCount, dispatch);
  //     } catch (error) {
  //       console.error("Error fetching medicines:", error);
  //     }
  //   };
  //   countData(userId);
  // }, []);
  return (
    <View style={styles.container}>
      <View style={styles.row_title}>
        <Text style={styles.title_medicine}>Mua thuốc</Text>
        <Pressable onPress={handleNavigatorCart}>
          <Image
            source={require("../../assets/icon/cart.png")}
            style={styles.img_item_service}
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.container_seach_bar}>
        <SearchBar
          placeholder="Tìm kiếm thuốc tại đây..."
          onChangeText={updateSearch}
          value={search}
          style={{ margin: 0, padding: 0 }}
          platform="default"
          placeholderTextColor="#888"
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.searchBarInput}
        />
      </View>
      <Pressable onPress={handleArrow}>
        <View style={styles.contaniner_note}>
          <View style={styles.container_icon_note}>
            <Image
              source={require("../../assets/icon/note.png")}
              style={styles.img_item_service}
            />
          </View>
          <View>
            <Text style={styles.text_title_note}>Lưu ý!</Text>
            <Text style={styles.text_content_note}>
              Dùng thuốc cần theo chỉ định của bác sĩ,{"\n"}Không nên tự ý mua
              và sử dụng
            </Text>
          </View>
          <View style={styles.container_icon_note}>
            <Pressable onPress={handleArrow}>
              <Image
                source={require("../../assets/icon/arrow.png")}
                style={styles.icon_arrow}
              />
            </Pressable>
          </View>
        </View>
      </Pressable>
      <HorizontalScroll
        setMedicines={setMedicines}
        setIdCategory={setIdCategory}
        search={search}
      />
      <ListMedicines
        medicines={medicines}
        loading={loading}
        navigation={navigation}
      />
    </View>
  );
}
