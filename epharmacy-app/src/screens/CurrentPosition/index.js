import React from "react";
import styles from "./style";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Sample data
const locations = [
  {
    id: 3,
    address: "Chi nhánh 1, Hà Nội",
    latitude: 21.0285,
    longitude: 105.8542,
    distance: 1.21789138, // in meters
  },
  {
    id: 4,
    address: "Chi nhánh 2, Thành phố Hồ Chí Minh",
    latitude: 10.7769,
    longitude: 106.6951,
    distance: 1138001.95396974, // in meters
  },
];

const LocationsScreen = () => {
    
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.address}</Text>
      <Text style={styles.distanceText}>
        {(item.distance / 1000).toFixed(2)} km {/* Convert to km */}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default LocationsScreen;
