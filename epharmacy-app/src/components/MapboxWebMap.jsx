import React, { useRef, useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View, Text, Button } from "react-native";
import * as Location from "expo-location";
import { MAPBOX_KEY } from "../utils/config";
const MapboxWebMap = ({ route }) => {
  const webViewRef = useRef(null);
  const [directionsEnabled, setDirectionsEnabled] = useState(false);
  const [currentCoords, setCurrentCoords] = useState([
    route.params.address.startAddress.longitude,
    route.params.address.startAddress.latitude,
  ]);
  const endCoords = [
    route.params.address.endAddress.longitude,
    route.params.address.endAddress.latitude,
  ];
  useEffect(() => {
    // Hỏi quyền truy cập vị trí người dùng
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Theo dõi vị trí người dùng theo thời gian thực
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Cập nhật mỗi giây
          distanceInterval: 1, // Cập nhật khi di chuyển hơn 1 mét
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setCurrentCoords([longitude, latitude]); // Cập nhật vị trí
        }
      );
    })();
  }, []);
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mapbox Navigation</title>
  <script src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"></script>
  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.js"></script>
  <link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet" />
  <link
    href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.css"
    rel="stylesheet"
  />
  <style>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    mapboxgl.accessToken = '${MAPBOX_KEY}'; // Thay bằng token của bạn
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [${currentCoords[0]}, ${currentCoords[1]}], // Vị trí hiện tại làm trung tâm
      zoom: 14,
      // interactive: false,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });
 let directionsEnabled = false;

      // Lắng nghe sự kiện từ React Native
      window.addEventListener("message", function(event) {
        const action = event.data;
        if (action === 'toggleDirections') {
          if (directionsEnabled) {
            map.removeControl(directions);
            directionsEnabled = false;
            fetch(
          'https://api.mapbox.com/directions/v5/mapbox/driving/${currentCoords[0]},${currentCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=${MAPBOX_KEY}'
        )
          .then((response) => response.json())
          .then((data) => {
            const route = data.routes[0].geometry;

            // Thêm tuyến đường vào bản đồ
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: route,
              },
            });

            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
              },
            });
          });
          } else {
            map.addControl(directions, 'top-left');
            directions.setOrigin([${currentCoords[0]}, ${currentCoords[1]}]);
            directions.setDestination([${endCoords[0]}, ${endCoords[1]}]);
            directionsEnabled = true;
          }
        }
      });
    // map.addControl(directions, 'top-left');

    // // Cập nhật vị trí hiện tại và đích đến theo thời gian thực
    // directions.setOrigin([${currentCoords[0]}, ${currentCoords[1]}]); // Vị trí hiện tại
    // directions.setDestination([${endCoords[0]}, ${endCoords[1]}]); // Vị trí kết thúc

  </script>
</body>
</html>`;
  const toggleDirections = () => {
    webViewRef.current.postMessage("toggleDirections"); // Gửi thông điệp tới WebView
    setDirectionsEnabled(!directionsEnabled); // Cập nhật trạng thái
  };
  return (
    <View style={styles.container}>
      <Button
        title={directionsEnabled ? "Tắt Chỉ Đường" : "Bật Chỉ Đường"}
        onPress={toggleDirections}
      />
      <WebView
        ref={webViewRef}
        source={{ html: html }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => console.log(event.nativeEvent.data)}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("HTTP error: ", nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  webview: {
    flex: 1,
  },
});

export default MapboxWebMap;
