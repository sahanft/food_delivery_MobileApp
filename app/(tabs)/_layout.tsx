import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Platform } from "react-native";
import HomeScreen from "../(tabs)/index";
import ExploreScreen from "./ProfileScreen ";
import OrderScreen from "./OrderScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const activeColor = "#009900";
  const inactiveColor = "#B0B0B0";

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "white",
            height: 60,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          default: {
            backgroundColor: "white",
            height: 50,
            elevation: 5,
          },
        }),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={28}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="history"
              size={28}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ExploreScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={28}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
