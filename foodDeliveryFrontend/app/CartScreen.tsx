import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddCartItem from "@/components/cart/AddCartItem";
import { useCart } from "../provider/CartProvider";

const carticon = require("../assets/icons/cartIcon.png");

export default function CartPage() {
  const navigation = useNavigation();
  const { cart } = useCart();

  return (
    <View className="bg-white h-full w-full">
      {cart.length === 0 ? (
        <View className="bg-white h-full w-full top-0 flex items-center justify-center">
          <Image source={carticon} style={{ width: 120, height: 120 }} />
          <Text className="text-black text-center my-4">Cart is Empty</Text>
          <TouchableOpacity
            className="bg-black rounded w-56 h-12 flex items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-bold">Go To Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <AddCartItem />
      )}
    </View>
  );
}