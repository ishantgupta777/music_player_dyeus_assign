import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";

import Carousel from "react-native-snap-carousel";
import Poster_IMG from "../../../assets/imgs/poster.png";

const { width, height } = Dimensions.get("window");

export default function index(props) {
  const setIndex = props.setIndex;
  const index = props.index;
  const carouselRef = useRef();
  const entries = [
    { poster: Poster_IMG, ind: 0 },
    { poster: Poster_IMG, ind: 1 },
    { poster: Poster_IMG, ind: 2 },
  ];

  useEffect(() => {
    carouselRef.current.snapToItem(index);
  }, [index]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.posterContainer}>
        <Image source={item.poster} style={styles.poster} />
      </View>
    );
  };
  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={entries}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.7}
        firstItem={1}
        contentContainerCustomStyle={{ alignItems: "center" }}
        onSnapToItem={(ind) => setIndex(ind)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    alignSelf: "center",
    height: width * 0.7,
    width: width * 0.7,
  },
  posterContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
});
