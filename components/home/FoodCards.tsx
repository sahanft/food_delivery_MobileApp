import { fetchItems, deleteItem } from "@/reducer/ItemSlice";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, Image, Text, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { useCart } from "../../provider/CartProvider"; // Import the cart context
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../app/RootStackParamList";

function FoodCards() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.items || []);
  const { addToCart } = useCart(); // Use the cart context instead of Redux for cart management

  useEffect(() => {
    dispatch(fetchItems() as any);
  }, [dispatch]);

  const handleAddToCart = (foodItem) => {
    // Create a properly formatted cart item
    const cartItem = {
      name: foodItem.itemName, // Match the structure expected by CartScreen
      price: foodItem.price,
      description: foodItem.description,
      image: foodItem.image,
      size: "Regular", // You can add size selection if needed
      quantity: 1,
    };

    // Add to cart using the context
    addToCart(cartItem);
  };

  const handleDeleteItem = (id, name) => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete ${name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => dispatch(deleteItem(id)),
          style: "destructive"
        }
      ]
    );
  };

  const handleEditItem = (item) => {
    navigation.navigate("EditItemScreen", { itemData: item });
  };

  return (
    <ScrollView className="absolute h-2/4 w-full top-2/4">
      <Text className="font-bold mt-3 ml-5 text-xl">Popular Foods</Text>
      <View className="w-full mt-4">
        {items.map((foods) => (
          <TouchableOpacity
            key={foods.id || foods._id}
            className="h-44 mb-6"
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
              marginVertical: 8,
              marginHorizontal: 16,
            }}
            onPress={() =>
              navigation.navigate("FoodDetails", { foodData: foods })
            }
          >
            <Text className="text-green-800 text-2xl font-bold mt-2 left-40">
              {foods.itemName}
            </Text>
            <Text className="top-2 left-40 mt-0 w-60 text-sm text-gray-600">
              {foods.description}
            </Text>
            <Text className="top-2 left-40 mt-2 text-sm text-gray-400">
              {foods.shopName}
            </Text>
            <Text className="top-4 left-40 text-green-800 text-2xl font-bold">
              $ {foods.price}
            </Text>
            <Image
              source={{ uri: foods.image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                position: "absolute",
                top: 26,
                left: 10,
              }}
            />

            {/* Action Buttons */}
            <View className="absolute bottom-5 right-5 flex-row space-x-3">
              <TouchableOpacity
                className="bg-blue-600 w-10 h-10 rounded-full items-center justify-center mr-2"
                onPress={() => handleEditItem(foods)}
              >
                <Icon size={18} name="pencil" color={"white"} />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-600 w-10 h-10 rounded-full items-center justify-center mr-2"
                onPress={() => handleDeleteItem(foods.id || foods._id, foods.itemName)}
              >
                <Icon size={18} name="trash" color={"white"} />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-emerald-800 w-10 h-10 rounded-full items-center justify-center"
                onPress={() => handleAddToCart(foods)}
              >
                <Icon size={18} name="plus" color={"white"} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default FoodCards;
