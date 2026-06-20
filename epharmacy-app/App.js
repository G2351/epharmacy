import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import Routes from "./src/routes";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./src/store/store";
import { Provider, useDispatch } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { PUBLIC_KEY } from "./src/utils/config";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
import { LogBox } from "react-native";
import { getProfile } from "./src/utils/user/profileUser";
import { setProfileRedux } from "./src/store/slice/profileSlice";

LogBox.ignoreLogs(["A props object containing a \"key\" prop"]);

const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("Support for defaultProps will be removed")) return;
  originalError(...args);
};


const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfile();
      if (profile?.userId) {
        dispatch(setProfileRedux(profile));
      }
    };
    loadProfile();
  }, []);

  return children;
};

const App = () => {
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl(url);
      }
    });

    const subscription = Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleUrl = (url) => {
    if (url.startsWith("myapp://stripe-redirect")) {
      Alert.alert("Payment completed!", "You have completed the payment.");
    }
  };

  return (
    <Provider store={store}>
      <AppInitializer>
        <GestureHandlerRootView>
          <ErrorBoundary>
            <SafeAreaView style={{ flex: 1 }}>
              <StripeProvider publishableKey={PUBLIC_KEY}>
                <Routes />
              </StripeProvider>
            </SafeAreaView>
          </ErrorBoundary>
        </GestureHandlerRootView>
      </AppInitializer>
    </Provider>
  );
};
export default App;