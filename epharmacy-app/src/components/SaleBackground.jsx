import React, { useEffect } from "react";
import { View, Button, Text, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useNavigation } from "@react-navigation/native"; // Assuming you are using navigation

// Set the notification handler for foreground and background notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const SaleBackground = () => {
  const navigation = useNavigation(); // Assuming you're using React Navigation

  useEffect(() => {
    // Request permissions on mount
    async function requestPermissions() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          alert("You need to enable notifications to receive sale alerts.");
        }
      }
    }

    // Register the device for receiving notifications (for push notifications, if needed)
    async function registerForPushNotifications() {
      if (Device.isDevice) {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);
      } else {
        alert("Must use physical device for notifications");
      }
    }

    // Create notification channel for Android
    async function setupAndroidNotificationChannel() {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("sales-channel", {
          name: "Sales Notifications",
          importance: Notifications.AndroidImportance.MAX,
          sound: "default", // You can specify a custom sound if needed
        });
      }
    }

    requestPermissions();
    registerForPushNotifications();
    setupAndroidNotificationChannel();
    triggerSaleNotification("🎉 Mega Sale!", "70%");
    // Add listener for notification responses (when user taps the notification)
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
        // Navigate to sales screen or perform action based on response
        const saleId = response.notification.request.content.data.saleId;
        if (saleId) {
          navigation.navigate("Medicines", { saleId }); // Navigate to the sales screen with the saleId
        }
      }
    );

    // Cleanup the listener when component unmounts
    return () => subscription.remove();
  }, []);

  // Trigger local sale notification
  const triggerSaleNotification = async (saleTitle, discount) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💊🔥 Medicine Sale!",
        body: `🎉 Get ${
          discount || "50%"
        } off on select medicines! 🏷️ Don't miss out on these great deals!`,
        data: { saleId: "12345", discount }, // Pass saleId in data
      },
      trigger: { seconds: 1 }, // Notification will appear after 5 seconds
    });
  };

  return <View></View>;
};

export default SaleBackground;
