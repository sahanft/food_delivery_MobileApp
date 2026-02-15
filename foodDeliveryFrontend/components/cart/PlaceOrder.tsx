// PlaceOrder.tsx
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function PlaceOrder({ totalPrice, delivery = 2.99 }) {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const navigation = useNavigation();

  // Available promo codes (in a real app, these would come from an API)
  const availablePromoCodes = {
    FIRST10: 10,
    WELCOME20: 20,
    SPECIAL15: 15,
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      Alert.alert("Error", "Please enter a promo code");
      return;
    }

    const discountPercentage = availablePromoCodes[promoCode.toUpperCase()];

    if (discountPercentage) {
      const discount = (totalPrice * discountPercentage) / 100;
      setPromoDiscount(discount);
      setPromoApplied(true);
      Alert.alert("Success", `${discountPercentage}% discount applied!`);
    } else {
      Alert.alert("Invalid Code", "This promo code is invalid or expired");
      setPromoDiscount(0);
      setPromoApplied(false);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return (totalPrice + delivery - promoDiscount).toFixed(2);
  };

  return (
    <View className="w-full h-80 absolute bottom-0 bg-white">
      {/* Promotion */}
      <View className="w-11/12 bg-emerald-50 h-12 absolute top-0 left-5 right-5 rounded-lg border-emerald-200 border flex-row items-center pl-3 pr-3">
        <Icon name="ticket" size={16} color="#10b981" />
        <TextInput
          placeholder="Enter promo code"
          className="flex-1 ml-3 h-full"
          value={promoCode}
          onChangeText={setPromoCode}
          editable={!promoApplied}
        />
        <TouchableOpacity
          className={`px-4 py-1 rounded-lg ${
            promoApplied ? "bg-gray-300" : "bg-emerald-500"
          }`}
          onPress={applyPromoCode}
          disabled={promoApplied}
        >
          <Text className="color-white font-bold">
            {promoApplied ? "Applied" : "Apply"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cal Total */}
      <View className="w-11/12 bg-white h-48 absolute top-16 left-5 right-5 m-auto rounded-lg">
        <View className="h-14 w-full border-b-2 border-gray-200">
          <Text className="absolute left-0 top-4 font-bold text-gray-400">
            SubTotal
          </Text>
          <Text className="absolute right-0 top-4 font-bold text-black text-xl">
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
        <View className="h-14 w-full border-b-2 border-gray-200">
          <Text className="absolute left-0 top-4 font-bold text-gray-400">
            Delivery
          </Text>
          <Text className="absolute right-0 top-4 font-bold text-black text-xl">
            ${delivery.toFixed(2)}
          </Text>
        </View>
        {promoDiscount > 0 && (
          <View className="h-14 w-full border-b-2 border-gray-200">
            <Text className="absolute left-0 top-4 font-bold text-green-600">
              Discount
            </Text>
            <Text className="absolute right-0 top-4 font-bold text-green-600 text-xl">
              -${promoDiscount.toFixed(2)}
            </Text>
          </View>
        )}
        <View className="h-14 w-full">
          <Text className="absolute left-0 top-4 font-bold text-gray-800 text-2xl">
            Total
          </Text>
          <Text className="absolute right-0 top-4 font-bold text-emerald-500 text-2xl">
            ${calculateTotal()}
          </Text>
        </View>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity
        className="w-11/12 bg-green-900 absolute z-10 h-12 bottom-6 left-5 right-5 rounded-full justify-center"
        onPress={() => navigation.navigate("AddOrderDetails")}
      >
        <Text className="text-center font-bold text-white">Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PlaceOrder;
