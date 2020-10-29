import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import TrackPlayer from "react-native-track-player";
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks";

export default function index(props) {
  const index = props.index;
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [positionOfTime, setPositionOfTime] = useState(0);

  const { position, duration } = useTrackPlayerProgress();

  const handleSlidingStart = () => {
    setIsSeeking(true);
  };

  function formatTime(seconds) {
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [m > 9 ? m : "0" + m || "0", s > 9 ? s : "0" + s]
      .filter(Boolean)
      .join(":");
  }

  useEffect(() => {
    setSliderPosition(0);
    setPositionOfTime(0);
  }, [index]);

  useEffect(() => {
    setPositionOfTime(position);
  }, [position]);

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderPosition(position / duration);
    }
  }, [position, duration]);

  const handleSlidingComplete = async (value) => {
    await TrackPlayer.seekTo(value * duration);
    setSliderPosition(value);
    setIsSeeking(false);
  };

  return (
    <View
      style={{
        width: "75%",
        alignSelf: "center",
        marginTop: 40,
      }}
    >
      <Slider
        style={{
          width: "100%",
          alignSelf: "center",
        }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#5C5C6E"
        maximumTrackTintColor="#5C5C6E"
        value={sliderPosition}
        onSlidingStart={handleSlidingStart}
        onSlidingComplete={handleSlidingComplete}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timePassed}>{formatTime(positionOfTime)}</Text>
        <Text style={styles.totalTime}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 13,
    marginBottom: 50,
  },
  totalTime: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "right",
    color: "#5C5C6E",
    marginTop: 10,
  },
  timePassed: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "left",
    color: "#5C5C6E",
    marginTop: 10,
  },
});
