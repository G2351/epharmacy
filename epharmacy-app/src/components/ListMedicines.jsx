import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ItemMedicines from "./ItemMedicines";
import { scaleHeight, scaleWidth } from "../utils/config";
export default function ListMedicines({
  navigation,
  medicines,
  loading,
  setCount,
}) {
  return (
    <View style={styles.view_holder}>
      <View>
        <Text style={styles.title_medicine}>Danh sách thuốc</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={medicines}
          renderItem={({ item, index }) => (
            <ItemMedicines key={index} item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  view_holder: {
    paddingRight: 3 * scaleWidth,
  },
  title_medicine: {
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
    marginLeft: 15 * scaleWidth,
    marginBottom: 10,
  },

  container: {
    paddingBottom: 5 * scaleHeight,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10 * scaleHeight,
  },
  loadingContainer: {
    flex: 1,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
