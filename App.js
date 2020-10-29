import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, ScrollView } from "react-native";
import Pagination from "./src/components/pagination";
import Carousel from "./src/components/carasoul";
import TrackControls from "./src/components/TrackControls";
import Slider from "./src/components/slider";

const App = () => {
  const [index, setIndex] = useState(1);
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <Pagination index={index} styles={styles.pagination} />
        <Carousel index={index} setIndex={setIndex} />
        <Text style={styles.songName}>The empire strikes back</Text>
        <Text style={styles.singer}>Sheena Jain</Text>
        <TrackControls index={index} setIndex={setIndex} />
        <Slider index={index} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#EBF2F6",
  },
  pagination: {
    flexDirection: "row",
    flex: 1,
  },
  songName: {
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 24,
    lineHeight: 31.25,
    textAlign: "center",
    color: "#3A3A41",
  },
  singer: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    color: "#5C5C6E",
  },
});

export default App;
