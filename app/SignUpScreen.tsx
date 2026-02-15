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

const SignUpScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="px-6 pt-10 top-64">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-green-900">←</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center mb-12">
          <Text className="text-green-900 text-3xl font-bold">HotPlate</Text>
        </View>

        <Text className="text-xl font-semibold mb-6">Create your Account</Text>

        <View className="mb-4">
          <TextInput
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-3 mb-4 14"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="border border-gray-300 rounded-md px-4 py-3 mb-4 14"
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            className="border border-gray-300 rounded-md px-4 py-3 14"
          />
        </View>

        <TouchableOpacity className="bg-green-900 py-3 rounded-md mb-6 14">
          <Text className="text-white text-center font-semibold">Sign up</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mb-6">
          <View className="h-px bg-gray-300 flex-1" />
          <Text className="mx-4 text-gray-500">- Or sign up with -</Text>
          <View className="h-px bg-gray-300 flex-1" />
        </View>

        <View className="flex-row justify-center space-x-6">
          <TouchableOpacity className="border border-gray-300 p-3 rounded-md">
            <Text>G</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
