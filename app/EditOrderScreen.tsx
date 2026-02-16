import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateOrder } from "../reducer/OderSlice";
import Icon from "react-native-vector-icons/FontAwesome";

const EditOrderScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { orderData } = route.params as any;
    const dispatch = useDispatch();

    const [address, setAddress] = useState(orderData.address);
    const [phoneNumber, setPhoneNumber] = useState(orderData.phoneNumber);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!address || !phoneNumber) {
            Alert.alert("Error", "Please fill in all details.");
            return;
        }

        setLoading(true);
        try {
            const updatedData = {
                ...orderData,
                address,
                phoneNumber,
            };

            const resultAction = await dispatch(updateOrder({ id: orderData.id || orderData._id, orderData: updatedData }) as any);

            if (updateOrder.fulfilled.match(resultAction)) {
                Alert.alert("Success", "Order updated successfully!");
                navigation.goBack();
            } else {
                Alert.alert("Error", resultAction.payload || "Failed to update order");
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
                <Text className="text-2xl font-bold">Edit Order</Text>
            </View>

            <Text className="text-gray-500 mb-6">Order ID: {orderData.id || orderData._id}</Text>

            <View className="mb-4">
                <Text className="text-gray-600 mb-1">Delivery Address</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3"
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Enter address"
                    multiline
                />
            </View>

            <View className="mb-6">
                <Text className="text-gray-600 mb-1">Phone Number</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
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
                    <Text className="text-white font-bold text-lg">Update Order</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditOrderScreen;
