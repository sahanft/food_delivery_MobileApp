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
import { useNavigation } from "expo-router";

const LoginScreen = ({ navigation }) => {
  const nav = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="px-6 pt-10 absolute w-full top-64">
        <View className="items-center mb-12">
          <Text className="text-green-900 text-3xl font-bold">HotPlate</Text>
        </View>

        <Text className="text-xl font-semibold mb-6">
          Login to your Account
        </Text>

        <View className="mb-4">
          <TextInput
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-3 mb-4 h-14"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="border border-gray-300 rounded-md px-4 py-3 h-14"
          />
        </View>

        <TouchableOpacity
          className="bg-green-900 py-3 rounded-md mb-6 h-14"
          onPress={() => nav.navigate("Main")}
        >
          <Text className="text-white text-center font-semibold">Sign in</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mb-6">
          <View className="h-px bg-gray-300 flex-1" />
          <Text className="mx-4 text-gray-500">- Or sign in with -</Text>
          <View className="h-px bg-gray-300 flex-1" />
        </View>

        <View className="flex-row justify-center space-x-6 mb-6">
          <TouchableOpacity className="border border-gray-300 p-3 rounded-md">
            <Text>G</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-green-900 font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
