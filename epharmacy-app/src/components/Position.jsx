import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import fetchNearPlace from "../utils/map/fetchNearPlace";
import formatDistance from "../utils/map/formatDistance";
import FullScreenLoading from "./FulllScreenLoading";
import { useNavigation } from "@react-navigation/native";

const Position = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const handleOpenMap = (item) => {
    navigation.navigate("MapBox", {
      address: {
        startAddress: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        endAddress: {
          latitude: item.latitude,
          longitude: item.longitude,
        },
      },
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      if (currentLocation) {
        const resAddress = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&format=json`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const dataAddress = await resAddress.json();
        setAddress(dataAddress.display_name);
        setLoading(false);

        await fetchNearPlace(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          setPlaces
        );
      }
    })();
  }, []);

  if (loading) return <FullScreenLoading />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vị trí của bạn:</Text>

      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        location && <Text style={styles.location}>{address}</Text>
      )}

      <Text style={styles.subHeader}>Nhà thuốc gần đây:</Text>

      <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy nhà thuốc gần đây</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.distance}>
              Khoảng cách: {formatDistance(item.distance)} km
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleOpenMap(item)}
              >
                <Text style={styles.buttonText}>Đường đi</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    marginBottom: 8,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  address: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  distance: {
    fontSize: 13,
    color: "#888",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Position;