import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

const Height = Dimensions.get("window").height;

export default function index(props) {
  const index = props.index;
  return (
    <View style={[styles.paginationContainer, props.containerStyle]}>
      {[...Array(3).keys()].map((ind) => (
        <View
          key={ind}
          style={ind == index ? styles.activeCircle : styles.inActiveCircle}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    marginTop: 0.07 * Height,
    justifyContent: "center",
    alignItems: "center",
  },
  inActiveCircle: {
    width: 12,
    height: 12,
    backgroundColor: "#5C5C6E",
    borderRadius: 12,
    opacity: 0.25,
    marginHorizontal: 10,
  },
  activeCircle: {
    width: 18,
    height: 18,
    backgroundColor: "#5C5C6E",
    borderRadius: 18,
    marginHorizontal: 10,
  },
});
