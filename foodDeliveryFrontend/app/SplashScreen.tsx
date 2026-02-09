import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// SplashScreen Component
const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-green-900 justify-center items-center">
      <StatusBar barStyle="light-content" />
      <View className="items-center">
        <Text className="text-white text-4xl font-bold">HotPlate</Text>
        <View className="flex-row mt-2">
          {[0, 1, 2, 3].map((dot, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full bg-white mx-0.5 ${
                index === 3 ? "" : "opacity-50"
              }`}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;