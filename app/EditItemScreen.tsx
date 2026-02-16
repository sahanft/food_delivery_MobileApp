import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../reducer/ItemSlice";
import Icon from "react-native-vector-icons/FontAwesome";

const EditItemScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { itemData } = route.params as any;
    const dispatch = useDispatch();

    const [name, setName] = useState(itemData.itemName);
    const [category, setCategory] = useState(itemData.category);
    const [description, setDescription] = useState(itemData.description);
    const [shopName, setShopName] = useState(itemData.shopName);
    const [price, setPrice] = useState(itemData.price.toString());
    const [image, setImage] = useState(itemData.image);

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!name || !price) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const updatedData = {
                itemName: name,
                category,
                description,
                shopName,
                price: parseFloat(price),
                image
            };

            const resultAction = await dispatch(updateItem({ id: itemData.id || itemData._id, itemData: updatedData }) as any);

            if (updateItem.fulfilled.match(resultAction)) {
                Alert.alert("Success", "Item updated successfully!");
                navigation.goBack();
            } else {
                Alert.alert("Error", resultAction.payload || "Failed to update item");
            }
        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white p-5">
            <View className="flex-row items-center mb-6 mt-10">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                    <Icon name="arrow-left" size={20} color="#000" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">Edit Item</Text>
            </View>

            <View className="mb-4">
                <Text className="text-gray-600 mb-1">Item Name *</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3"
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter item name"
                />
            </View>

            <View className="mb-4">
                <Text className="text-gray-600 mb-1">Category</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3"
                    value={category}
                    onChangeText={setCategory}
                    placeholder="Enter category"
                />
            </View>

            <View className="mb-4">
                <Text className="text-gray-600 mb-1">Price *</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3"
                    value={price}
                    onChangeText={setPrice}
                    placeholder="Enter price"
                    keyboardType="numeric"
                />
            </View>

            <View className="mb-4">
                <Text className="text-gray-600 mb-1">Shop Name</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3"
                    value={shopName}
                    onChangeText={setShopName}
                    placeholder="Enter shop name"
                />
            </View>

            <View className="mb-4">
                <Text className="text-gray-600 mb-1">Description</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 h-24"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter description"
                    multiline
                />
            </View>

            <View className="mb-6">
                <Text className="text-gray-600 mb-1">Image URL</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3"
                    value={image}
                    onChangeText={setImage}
                    placeholder="Enter image URL"
                />
            </View>

            <TouchableOpacity
                className={`p-4 rounded-full items-center mb-10 ${loading ? 'bg-gray-400' : 'bg-green-700'}`}
                onPress={handleSave}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold text-lg">Save Changes</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditItemScreen;
