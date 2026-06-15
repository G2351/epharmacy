import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import Routes from "./src/routes";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { PUBLIC_KEY } from "./src/utils/config";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["A props object containing a \"key\" prop"]);

const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("Support for defaultProps will be removed")) return;
  originalError(...args);
};
const App = () => {
  useEffect(() => {
    // Lấy URL nếu app được mở từ deep link khi khởi chạy
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl(url);
      }
    });

    // Lắng nghe sự kiện mở URL khi app đang chạy
    const subscription = Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    return () => {
      // Hủy đăng ký sự kiện khi component unmount
      subscription.remove();
    };
  }, []);

  const handleUrl = (url) => {
    if (url.startsWith("myapp://stripe-redirect")) {
      // Xử lý logic khi trở về từ thanh toán
      Alert.alert("Payment completed!", "You have completed the payment.");
    }
    // Xử lý URL nhận được, điều hướng người dùng hoặc thực hiện hành động cần thiết
  };
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ErrorBoundary>
          <SafeAreaView style={{ flex: 1 }}>
            <StripeProvider publishableKey={PUBLIC_KEY}>
              <Routes />
            </StripeProvider>
          </SafeAreaView>
        </ErrorBoundary>
      </GestureHandlerRootView>
    </Provider>
  );
};
export default App;
