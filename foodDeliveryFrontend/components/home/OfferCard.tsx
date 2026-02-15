import React, { useRef, useEffect, useState } from "react";
import { ScrollView, View, Image, Text, Dimensions } from "react-native";

export default function OfferCard() {
  const imageData = [
    {
      id: "1",
      title: "Sunset",
      url: "https://i.pinimg.com/236x/ef/48/0b/ef480b638f32b8b7756b3066f70e8d53.jpg",
    },
    {
      id: "2",
      title: "Mountains",
      url: "https://i.pinimg.com/474x/11/f0/60/11f060820b70e774e32db5699a813b81.jpg",
    },
    {
      id: "3",
      title: "Ocean",
      url: "https://i.pinimg.com/236x/a4/43/62/a44362278ecff20040d06bec569f0294.jpg",
    },
    {
      id: "4",
      title: "City",
      url: "https://i.pinimg.com/236x/5c/e0/48/5ce048e18b958a1b37bdddb2a44079b5.jpg",
    },
  ];

  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 1;

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + imageWidth;
        if (newPosition >= imageWidth * imageData.length) {
          return 0;
        }
        return newPosition;
      });
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [imageWidth, imageData.length]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: scrollPosition, animated: true });
    }
  }, [scrollPosition]);

  return (
    <ScrollView
      className="absolute rounded-3xl top-72 w-11/12 left-5"
      ref={scrollViewRef}
      horizontal={true}
      style={{
        shadowColor: "#003300",
        shadowOffset: { width: 6, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 8,
        height: 160,
        elevation: 8,
      }}
    >
      {imageData.map((item) => (
        <View key={item.id}>
          <Image
            source={{ uri: item.url }}
            style={{ width: imageWidth, height: 160 }}
          />
          {/* <Text className="mt-2 text-lg font-bold">{item.title}</Text> */}
        </View>
      ))}
    </ScrollView>
  );
}
