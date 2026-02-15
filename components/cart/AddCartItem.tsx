// AddCartItem.tsx
import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { useCart } from "../../provider/CartProvider";
import PlaceOrder from "./PlaceOrder";

function AddCartItem() {
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    console.log("Place Order button clicked!");
    navigation.navigate("AddOrderDetails");
  };

  const handleClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure you want to remove all items?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        onPress: () => clearCart(), // Use the clearCart function from context
        style: "destructive",
      },
    ]);
  };

  const decreaseQuantity = (itemName, itemSize) => {
    // Find the item in the cart
    const item = cart.find((i) => i.name === itemName && i.size === itemSize);
    if (item && item.quantity > 1) {
      updateQuantity(itemName, itemSize, item.quantity - 1);
    } else {
      // If quantity would go below 1, remove the item
      removeFromCart(itemName, itemSize);
    }
  };

  const increaseQuantity = (itemName, itemSize) => {
    // Find the item in the cart
    const item = cart.find((i) => i.name === itemName && i.size === itemSize);
    if (item) {
      updateQuantity(itemName, itemSize, item.quantity + 1);
    }
  };

  return (
    <>
      <View className="w-11/12 h-28 absolute top-6 left-5 right-5">
        <TouchableOpacity
          className="absolute top-0 right-0 w-12 h-16"
          onPress={clearCart}
        >
          <Ionicons name="trash-bin" size={26} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text className="top-0 absolute left-12 font-bold text-2xl">Cart</Text>
      </View>

      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Ionicons name="cart-outline" size={80} color="#cccccc" />
          <Text className="text-xl text-gray-400 mt-4">Your cart is empty</Text>
          <TouchableOpacity
            className="mt-6 bg-emerald-800 px-6 py-3 rounded-md"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-bold">Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="w-full absolute top-20 h-2/3 bg-white">
          {cart.map((item) => (
            <View
              key={`${item.name}-${item.size}`}
              className="h-28 w-11/12 m-auto mt-4 mb-1 rounded-lg border border-gray-100 bg-gray-50 p-3"
            >
              <Text className="ml-28 font-bold">{item.name}</Text>
              <Text className="ml-28 text-gray-600 m-1">
                {item.description}
              </Text>
              <Image
                source={{ uri: item.image }}
                className="w-24 h-24 absolute top-2 left-3"
              />
              <Text className="ml-28 font-bold text-green-900">
                ${item.price}
              </Text>
              <TouchableOpacity
                className="absolute top-1 right-2"
                onPress={() => removeFromCart(item.name, item.size)}
              >
                <Icon name="remove" color={"#a6a6a6"} size={10} />
              </TouchableOpacity>
              <View className="absolute flex-row items-center bottom-2 right-2">
                <TouchableOpacity
                  className="bg-green-800 w-6 h-6 rounded-full items-center"
                  onPress={() => decreaseQuantity(item.name, item.size)}
                >
                  <Icon name="minus" size={12} color="#fff" />
                </TouchableOpacity>
                <Text className="mx-4 font-bold">{item.quantity}</Text>
                <TouchableOpacity
                  className="bg-green-800 w-6 h-6 rounded-full items-center"
                  onPress={() => increaseQuantity(item.name, item.size)}
                >
                  <Icon name="plus" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {cart.length > 0 && (
        <>
          <PlaceOrder totalPrice={totalPrice} />
        </>
      )}
    </>
  );
}

export default AddCartItem;
