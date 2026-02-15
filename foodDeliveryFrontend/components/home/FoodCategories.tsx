import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ScrollView, View } from "react-native";

function FoodCategories() {
  return (
    <View className="w-11/12 left-5 right-5 bg-white relative top-28">
      <ScrollView horizontal={true} className="flex flex-wrap">
        <TouchableOpacity className="w-24 h-24 bg-gray-100 ml-3">
          <Text>Fast Food</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-24 h-24 bg-gray-100 ml-9">
          <Text>Healthy & Organic</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-24 h-24 bg-gray-100 ml-9">
          <Text>Asian Cuisine</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-24 h-24 bg-gray-100 ml-9">
          <Text>Desserts & Beverages </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-24 h-24 bg-gray-100 ml-9">
          <Text>Local & Traditional</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-24 h-24 bg-gray-100 ml-9">
          <Text>Gourmet & Fine Dining</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default FoodCategories;
