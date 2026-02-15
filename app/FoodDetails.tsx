import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/solid";

function FoodDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");

  const route = useRoute();
  const { foodData } = route.params;

  // Dummy data based on the image
  const coffeeData = {
    name: "Blue Mountain Coffee",
    rating: 4.8,
    reviews: 125,
    prepTime: 16, // minutes
    sizes: [
      { name: "Small", price: 0 },
      { name: "Medium", price: 3 },
      { name: "Large", price: 5 },
    ],
    basePrice: 19.125, // Base price per coffee
    image: require("../assets/images/coffee.jpg"),
  };

  // Calculate total price
  const calculateTotal = () => {
    const sizePrice =
      coffeeData.sizes.find((size) => size.name === selectedSize)?.price || 0;
    return ((foodData.price + sizePrice) * quantity).toFixed(2);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const navigate = useNavigation();

  return (
    <ScrollView className=" bg-white">
      {/* Header with back button */}
      <View className="px-4 pt-2 relative top-10">
        <TouchableOpacity
          className="rounded-full bg-white p-2 w-10 h-10 items-center justify-center border border-green-700"
          onPress={() => navigate.goBack()}
        >
          <ArrowLeftIcon size={20} color="#006600" />
        </TouchableOpacity>
      </View>

      {/* Coffee Image */}
      <View className="w-full h-auto absolute top-24">
        <View className="w-full px-6 items-center justify-center py-4">
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: foodData.image }}
            className="w-full h-64 rounded-lg"
            resizeMode="cover"
          />
        </View>

        {/* Coffee Details */}
        <View className="px-6 py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl font-bold text-green-800">
              {foodData.itemName}
            </Text>
            <TouchableOpacity>
              <HeartIcon size={24} color="#036" />
            </TouchableOpacity>
          </View>

          {/* Ratings */}
          <View className="flex-row items-center mt-2">
            <StarIcon size={16} color="#FFD700" />
            <Text className="ml-1 text-gray-700">
              {coffeeData.rating} ({coffeeData.reviews}) · {coffeeData.prepTime}{" "}
              min
            </Text>
          </View>

          {/* Quantity Selector */}
          <View className="mt-6">
            <Text className="font-medium text-gray-800 mb-3">Quantity</Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={decreaseQuantity}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              >
                <MinusIcon size={16} color="#333" />
              </TouchableOpacity>

              <Text className="mx-6 text-lg font-semibold">{quantity}</Text>

              <TouchableOpacity
                onPress={increaseQuantity}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              >
                <PlusIcon size={16} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Size Selection */}
          <View className="mt-10">
            <Text className="font-medium text-gray-800 mb-3">Size *</Text>
            {coffeeData.sizes.map((size, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedSize(size.name)}
                className="flex-row items-center justify-between py-3 border-b border-gray-100"
              >
                <View className="flex-row items-center">
                  <View
                    className={`w-6 h-6 rounded-full mr-3 border border-gray-300 items-center justify-center ${
                      selectedSize === size.name ? "bg-green-800" : "bg-white"
                    }`}
                  >
                    {selectedSize === size.name && (
                      <View className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </View>
                  <Text className="text-base">{size.name}</Text>
                </View>
                <Text className="text-gray-500">+ ${size.price}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Total and Add to Cart Button */}
          <View className="mt-10 pb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-500">Total Price:</Text>
              <Text className="text-2xl font-bold text-green-800">
                ${calculateTotal()}
              </Text>
            </View>

            <TouchableOpacity className="bg-green-800 py-4 px-6 rounded-lg flex-row items-center justify-center">
              <ShoppingCartIcon size={20} color="white" />
              <Text className="text-white font-bold ml-2">Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default FoodDetails;
