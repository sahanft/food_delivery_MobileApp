import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../../global.css";
import React from "react";
import OfferCard from "@/components/home/OfferCard";
import SerchBar from "@/components/home/SerchBar";
import Icon from "react-native-vector-icons/FontAwesome";
import FoodCards from "@/components/home/FoodCards";
import { useNavigation } from "@react-navigation/native";
import FoodCategories from "@/components/home/FoodCategories";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="bg-white w-full h-full">
      <View
        className="w-full h-96 bg-green-900"
        style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}
      >
        <Text className="text-white text-xl font-bold top-20 left-5">
          Hellow Shanilka!
        </Text>
        <Text className="text-white text-3xl font-bold top-20 left-5">
          Place Your Order
        </Text>
        <TouchableOpacity
          className="absolute w-12 h-12 rounded-full top-20 right-5"
          onPress={() => navigation.navigate("CartScreen")}
        >
          <Icon
            name="shopping-cart"
            size={25}
            color={"#ffffff"}
            className="top-0 left-0 bottom-0 right-0 m-auto "
          />
        </TouchableOpacity>
        <SerchBar />
      </View>
      <OfferCard />
      <FoodCategories />
      <FoodCards />
    </View>
  );
}
