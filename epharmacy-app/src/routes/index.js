import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProtectedRoute from "../components/ProtectedRoute";
import HomeVip from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ArticlesScreen from "../screens/ArticlesScreen";
import MedicineBenefitScreen from "../components/MedicineBenefitScreen";
import TermsPrivacyScreen from "../components/TermsPrivacyScreen";
import DetailsMedicineScreen from "../screens/DetailsMedicineScreen";
import MedicinesScreen from "../screens/MedicinesScreen";
import ArticlesDetailsScreen from "../screens/ArticlesDetailsScreen";
import ProfileScreen from "../screens/Profile";
import MapScreen from "../screens/MapScreen";
import MapboxWebMap from "../components/MapboxWebMap";
import ChangePasswordScreen from "../components/ChangePasswordScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="MapBox" component={MapboxWebMap} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeVip} options={{ headerShown: false }} />
        <Stack.Screen name="Medicines" component={MedicinesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Articles" component={ArticlesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ArticlesDetails" component={ArticlesDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TermsPrivacyScreen" component={TermsPrivacyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BenefitScreen" component={MedicineBenefitScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderHistory" options={{headerShown: false}}>
          {() => (
            <ProtectedRoute>
              <OrderHistoryScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="DetailsMedicine" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <DetailsMedicineScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="Cart" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <CartScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;