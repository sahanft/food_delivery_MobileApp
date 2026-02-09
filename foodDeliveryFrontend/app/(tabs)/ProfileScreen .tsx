import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

const ProfileScreen = () => {
  // Menu items with icons and labels
  const menuItems = [
    {
      icon: <Feather name="edit-2" size={20} color="#2D6A4F" />,
      label: "Edit Profile Name",
      hasArrow: true,
    },
    {
      icon: <Feather name="lock" size={20} color="#2D6A4F" />,
      label: "Change Password",
      hasArrow: true,
    },
    {
      icon: <Feather name="mail" size={20} color="#2D6A4F" />,
      label: "Change Email Address",
      hasArrow: true,
    },
    {
      icon: <Feather name="settings" size={20} color="#2D6A4F" />,
      label: "Settings",
      hasArrow: true,
    },
    {
      icon: <Feather name="log-out" size={20} color="#E74C3C" />,
      label: "Logout",
      hasArrow: true,
      textColor: "#E74C3C",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-green-900">
      {/* Profile Header Section */}
      <View className="pt-16 pb-8 items-center">
        <View className="relative">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            }}
            className="w-24 h-24 top-36 rounded-full border-2 border-white"
          />
          <View className="absolute bottom-0 right-0 top-52 bg-white rounded-full w-8 h-8 justify-center items-center shadow">
            <Feather name="edit-2" size={16} color="#2D6A4F" />
          </View>
        </View>
        <Text className="text-white text-xl font-semibold mt-4 top-36">
          Gracia Tya
        </Text>
      </View>

      {/* Content Section */}
      <View className="flex-1 top-60 bg-white rounded-t-3xl px-5 pt-6">
        <ScrollView showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center py-4 ${
                index === menuItems.length - 1 ? "" : "border-b border-gray-100"
              }`}
            >
              {item.icon}
              <Text
                className={`flex-1 ml-4 text-base ${
                  item.textColor ? "text-red-500" : "text-gray-800"
                }`}
              >
                {item.label}
              </Text>
              {item.hasArrow && (
                <Feather name="chevron-right" size={20} color="#999" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;