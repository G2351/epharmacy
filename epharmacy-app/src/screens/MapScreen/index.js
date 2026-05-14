import React, { useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./style";
export default function MapScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({
      latitude,
      longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.028511, // Tọa độ mặc định
          longitude: 105.804817,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            description={`Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}`}
          />
        )}
      </MapView>
      {selectedLocation && (
        <View style={styles.locationInfo}>
          <Text>Latitude: {selectedLocation.latitude}</Text>
          <Text>Longitude: {selectedLocation.longitude}</Text>
        </View>
      )}
    </View>
  );
}
