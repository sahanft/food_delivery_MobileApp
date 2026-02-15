import React from "react";
import { TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function SearchBar() {
  return (
    <View
      className="text-lg text-gray-700 text-left
    bg-white h-14 w-11/12 left-0 right-0 m-auto rounded-md -top-4 border-2 border-gray-200"
    >
      <TextInput
        placeholder="Search"
        className="text-sm text-gray-400 text-left
    bg-opacity-0 h-10 w-9/12 rounded-full absolute top-2 left-9 border-none outline-none focus:text-black z-10"
      />
      <Icon
        name="search"
        size={16}
        color={"#666666"}
        className="top-4 left-3"
      />
    </View>
  );
}

export default SearchBar;
