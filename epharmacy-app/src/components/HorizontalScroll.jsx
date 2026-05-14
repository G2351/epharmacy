import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import fetchMedicinesCategories from "../utils/medicines/fetchMedicineCategories";
import ItemCategory from "./ItemCategory";
import { scaleHeight, scaleWidth } from "../utils/config";
import searchMedicineByName from "../utils/medicines/searchMedicineByName";
const HorizontalScroll = ({ setMedicines, setIdCategory, search }) => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const handlePressAll = async (name) => {
    setSelectedOption(name);
    try {
      setIdCategory("");
      await searchMedicineByName(search, "", setMedicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };
  const handlePress = async (name, id) => {
    setIdCategory(id);
    setSelectedOption(name);
    try {
      await searchMedicineByName(search, id, setMedicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };
  useEffect(() => {
    fetchMedicinesCategories(setCategories);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Pressable
          style={[
            styles.button,
            selectedOption === "all" && styles.activeButton,
          ]}
          onPress={() => handlePressAll("all")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === "all" && styles.activeButtonText,
            ]}
          >
            Tất cả
          </Text>
        </Pressable>
        {categories.map((item, index) => {
          return (
            <ItemCategory
              key={index}
              category={item}
              handlePress={handlePress}
              selectedOption={selectedOption}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10 * scaleWidth,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    height: 60 * scaleHeight,
  },
  contentContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 15 * scaleWidth,
    padding: 10 * scaleWidth,
    marginHorizontal: 10 * scaleWidth,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16 * scaleWidth,
    color: "#000",
  },
  activeButton: {
    backgroundColor: "#59c606",
  },
  activeButtonText: {
    color: "#fff",
  },
});

export default HorizontalScroll;
