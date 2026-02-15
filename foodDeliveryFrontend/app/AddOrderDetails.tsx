import React, {useState} from "react";
import {View, TextInput, TouchableOpacity, Text, Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useCart} from "../provider/CartProvider";
import axios from "axios"; // Import Axios
import {RootStackParamList} from "../app/RootStackParamList";
import TextInputAdornment from "react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAdornment";

const AddOrderDetails: React.FC = () => {
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const {cart, clearCart} = useCart();
    const navigation = useNavigation();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Function to save order details
    const saveOrderToBackend = async () => {
        try {
            // Construct the order data
            const orderData = {
                address,
                phoneNumber,
                totalPrice,
                items: cart.map((item) => ({
                    name: item.name,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                })),
            };

            // Make an Axios request to your backend (replace with your API endpoint)
            const response = await axios.post('http://192.168.1.101:3000/api/order/AddOrder', orderData);

            if (response.status === 200) {
                console.log("Order Data: ", orderData);
                console.log("Order saved successfully!");
            } else {
                console.log("Error saving order:", response.status);
            }
        } catch (error) {
            console.error("Error saving order:", error);
            Alert.alert("Error", "Something went wrong while placing the order.");
        }
    };

    const handleConfirmOrder = async () => {
        if (!address || !phoneNumber) {
            Alert.alert("Error", "Please fill in all details.");
        } else {
            clearCart();
            Alert.alert("Success", "Your order has been placed successfully!");

            // Save order to backend
            await saveOrderToBackend();
            console.log("Order Saved");
            // navigation.navigate("Main");
        }
    };

    return (
        <>
            <View className="flex-1 bg-white p-4">
                <Text className="text-2xl font-bold mb-4">Add Contact Details</Text>
                <TextInput
                    placeholder="Enter Address"
                    value={address}
                    onChangeText={setAddress}
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <TextInput
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    className="mb-4 p-2 border border-gray-300 rounded"
                />

                <TouchableOpacity onPress={handleConfirmOrder} className="bg-green-700 p-4 rounded-lg mt-6">
                    <Text className="text-white text-center font-bold">Confirm Order</Text>
                </TouchableOpacity>
            </View>
        </>

    );
};

export default AddOrderDetails;
