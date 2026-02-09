import { useFonts } from "expo-font";
import "react-native-reanimated";
import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux"; // Redux Provider
import { store } from "../store/store"; // Redux store
import { CartProvider } from "../provider/CartProvider"; // Import CartProvider

import SplashScreen from "../app/SplashScreen";
import LoginScreen from "../app/LoginScreen";
import SignUpScreen from "../app/SignUpScreen";
import CartScreen from "./CartScreen";
import FoodDetails from "../app/FoodDetails";
import AddOrderDetails from "../app/AddOrderDetails";
import TabNavigator from "./(tabs)/_layout";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <CartProvider>
        {" "}
        {/* Wrap the app with CartProvider */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Auth Flow */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="AddOrderDetails" component={AddOrderDetails} />

          {/* Main App Flow */}
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="FoodDetails" component={FoodDetails} />
        </Stack.Navigator>
        <StatusBar />
      </CartProvider>
    </Provider>
  );
}