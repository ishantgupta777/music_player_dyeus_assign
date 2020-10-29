import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import TrackPlayer from "react-native-track-player";

import Left_Img from "../../../assets/imgs/left.png";
import Right_Img from "../../../assets/imgs/right.png";
import Play_Img from "../../../assets/imgs/play.png";
import Pause_Img from "../../../assets/imgs/pause.png";
import index from "../pagination";

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add({
    id: index.toString(),
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    type: "default",
    title: "The empire strikes back",
    album: "My Album",
    artist: "Sheena Jain",
  });
  return true;
};

export default function (props) {
  const index = props.index;
  const setIndex = props.setIndex;
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, []);

  useEffect(() => {
    TrackPlayer.stop();
    setIsPlaying(false);
  }, [index]);

  const onButtonPressed = () => {
    if (!isPlaying) TrackPlayer.play();
    else TrackPlayer.pause();
    setIsPlaying(!isPlaying);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "65%",
        marginTop: 50,
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (index > 0) setIndex(index - 1);
        }}
      >
        <Image source={Left_Img} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onButtonPressed} disabled={!isTrackPlayerInit}>
        <Image
          source={isPlaying ? Pause_Img : Play_Img}
          style={{ width: 60, height: 60 }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (index < 2) setIndex(index + 1);
        }}
      >
        <Image source={Right_Img} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  );
}
