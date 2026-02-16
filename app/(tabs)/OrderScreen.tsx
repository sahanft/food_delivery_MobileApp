import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrder } from '../../reducer/OderSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../RootStackParamList';

function OrderScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { orders, loading, error } = useSelector((state: any) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  const handleDeleteOrder = (id: string) => {
    Alert.alert(
      "Delete Order",
      "Are you sure you want to delete this order?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => dispatch(deleteOrder(id) as any),
          style: "destructive"
        }
      ]
    );
  };

  const handleEditOrder = (order: any) => {
    navigation.navigate("EditOrderScreen", { orderData: order });
  };

  if (loading && orders.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-6 mt-10">Order History</Text>

      {error && (
        <View className="bg-red-100 p-3 rounded-lg mb-4">
          <Text className="text-red-700">{error}</Text>
        </View>
      )}

      {orders.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">No orders found.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {orders.map((order: any) => (
            <View
              key={order.id || order._id}
              className="bg-white p-4 rounded-xl mb-4 shadow-sm border border-gray-100"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="font-bold text-gray-800 text-lg">Order #{(order.id || order._id).substring(0, 8)}</Text>
                  <Text className="text-gray-500 text-sm">{order.address}</Text>
                </View>
                <Text className="font-bold text-green-700 text-lg">${order.totalPrice.toFixed(2)}</Text>
              </View>

              <View className="border-t border-gray-100 pt-3 mt-2 flex-row justify-between items-center">
                <Text className="text-gray-400 text-xs">Items: {order.items?.length || 0}</Text>

                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    className="bg-blue-100 p-2 rounded-lg mr-2"
                    onPress={() => handleEditOrder(order)}
                  >
                    <Icon name="pencil" size={16} color="#2563eb" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-red-100 p-2 rounded-lg"
                    onPress={() => handleDeleteOrder(order.id || order._id)}
                  >
                    <Icon name="trash" size={16} color="#dc2626" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default OrderScreen;
