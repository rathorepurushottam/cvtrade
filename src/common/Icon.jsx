import React from "react";
import { Image } from "react-native";

const Icon = ({
  size = 10,
  resizeMode = "contain",
  source,
  imageStyle,
  tintColor,
}) => {
  return (
    <Image
      tintColor={tintColor}
      source={source}
      style={{
        height: size,
        width: size,
        resizeMode: resizeMode,
        ...imageStyle,
      }}
    />
  );
};

export default Icon;